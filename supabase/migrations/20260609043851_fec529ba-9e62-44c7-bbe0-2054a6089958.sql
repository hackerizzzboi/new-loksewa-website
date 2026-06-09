
-- Streak fields on profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS current_streak INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS longest_streak INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_attempt_date DATE;

-- Badges
CREATE TABLE IF NOT EXISTS public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_code TEXT NOT NULL,
  awarded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, badge_code)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_badges TO authenticated;
GRANT SELECT ON public.user_badges TO anon;
GRANT ALL ON public.user_badges TO service_role;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "badges readable by all" ON public.user_badges FOR SELECT USING (true);
CREATE POLICY "users insert own badges" ON public.user_badges FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "users delete own badges" ON public.user_badges FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Daily MCQs (admin posts)
CREATE TABLE IF NOT EXISTS public.daily_mcqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  for_date DATE NOT NULL DEFAULT CURRENT_DATE,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_index INTEGER NOT NULL,
  explanation TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.daily_mcqs TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.daily_mcqs TO authenticated;
GRANT ALL ON public.daily_mcqs TO service_role;
ALTER TABLE public.daily_mcqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "daily mcqs readable" ON public.daily_mcqs FOR SELECT USING (true);
CREATE POLICY "admins manage daily mcqs (insert)" ON public.daily_mcqs FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins manage daily mcqs (update)" ON public.daily_mcqs FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins manage daily mcqs (delete)" ON public.daily_mcqs FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- Responses
CREATE TABLE IF NOT EXISTS public.daily_mcq_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  daily_mcq_id UUID NOT NULL REFERENCES public.daily_mcqs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  selected_index INTEGER NOT NULL,
  is_correct BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(daily_mcq_id, user_id)
);
GRANT SELECT, INSERT ON public.daily_mcq_responses TO authenticated;
GRANT SELECT ON public.daily_mcq_responses TO anon;
GRANT ALL ON public.daily_mcq_responses TO service_role;
ALTER TABLE public.daily_mcq_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "responses readable" ON public.daily_mcq_responses FOR SELECT USING (true);
CREATE POLICY "users insert own response" ON public.daily_mcq_responses FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Streak update function called from client after exam submission
CREATE OR REPLACE FUNCTION public.update_streak()
RETURNS TABLE(current_streak INTEGER, longest_streak INTEGER)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  uid UUID := auth.uid();
  today DATE := CURRENT_DATE;
  last_date DATE;
  cur INTEGER;
  longest INTEGER;
BEGIN
  IF uid IS NULL THEN RETURN; END IF;
  SELECT last_attempt_date, profiles.current_streak, profiles.longest_streak
    INTO last_date, cur, longest FROM public.profiles WHERE id = uid;
  IF last_date = today THEN
    -- already counted today
    NULL;
  ELSIF last_date = today - INTERVAL '1 day' THEN
    cur := COALESCE(cur,0) + 1;
  ELSE
    cur := 1;
  END IF;
  longest := GREATEST(COALESCE(longest,0), cur);
  UPDATE public.profiles
    SET current_streak = cur, longest_streak = longest, last_attempt_date = today
    WHERE id = uid;
  RETURN QUERY SELECT cur, longest;
END;
$$;

-- Get today's daily MCQ with stats
CREATE OR REPLACE FUNCTION public.get_today_daily_mcq()
RETURNS TABLE(
  id UUID, question TEXT, options JSONB, correct_index INTEGER, explanation TEXT,
  total_responses BIGINT, correct_responses BIGINT,
  my_selected INTEGER, my_correct BOOLEAN
)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT d.id, d.question, d.options, d.correct_index, d.explanation,
    COALESCE((SELECT COUNT(*) FROM public.daily_mcq_responses r WHERE r.daily_mcq_id=d.id),0),
    COALESCE((SELECT COUNT(*) FROM public.daily_mcq_responses r WHERE r.daily_mcq_id=d.id AND r.is_correct),0),
    (SELECT selected_index FROM public.daily_mcq_responses r WHERE r.daily_mcq_id=d.id AND r.user_id=auth.uid()),
    (SELECT is_correct FROM public.daily_mcq_responses r WHERE r.daily_mcq_id=d.id AND r.user_id=auth.uid())
  FROM public.daily_mcqs d
  WHERE d.for_date = CURRENT_DATE
  ORDER BY d.created_at DESC
  LIMIT 1
$$;

-- Get correct responders for a daily mcq
CREATE OR REPLACE FUNCTION public.get_daily_mcq_responders(_mcq_id UUID)
RETURNS TABLE(user_id UUID, full_name TEXT, is_correct BOOLEAN, selected_index INTEGER, created_at TIMESTAMPTZ)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT r.user_id, COALESCE(p.full_name,'Anonymous'), r.is_correct, r.selected_index, r.created_at
  FROM public.daily_mcq_responses r
  LEFT JOIN public.profiles p ON p.id = r.user_id
  WHERE r.daily_mcq_id = _mcq_id
  ORDER BY r.is_correct DESC, r.created_at ASC
$$;
