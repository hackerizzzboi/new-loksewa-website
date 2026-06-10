
-- Limit 5 daily MCQs per date
CREATE OR REPLACE FUNCTION public.enforce_daily_mcq_limit()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE cnt int;
BEGIN
  SELECT COUNT(*) INTO cnt FROM public.daily_mcqs WHERE for_date = NEW.for_date;
  IF cnt >= 5 THEN
    RAISE EXCEPTION 'Maximum 5 daily MCQs per day reached for %', NEW.for_date;
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS trg_daily_mcq_limit ON public.daily_mcqs;
CREATE TRIGGER trg_daily_mcq_limit BEFORE INSERT ON public.daily_mcqs
  FOR EACH ROW EXECUTE FUNCTION public.enforce_daily_mcq_limit();

-- Return ALL today's MCQs (up to 5), not just one
CREATE OR REPLACE FUNCTION public.get_today_daily_mcqs()
RETURNS TABLE(id uuid, question text, options jsonb, correct_index int, explanation text,
              total_responses bigint, correct_responses bigint, my_selected int, my_correct boolean,
              created_at timestamptz)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT d.id, d.question, d.options, d.correct_index, d.explanation,
    COALESCE((SELECT COUNT(*) FROM public.daily_mcq_responses r WHERE r.daily_mcq_id=d.id),0),
    COALESCE((SELECT COUNT(*) FROM public.daily_mcq_responses r WHERE r.daily_mcq_id=d.id AND r.is_correct),0),
    (SELECT selected_index FROM public.daily_mcq_responses r WHERE r.daily_mcq_id=d.id AND r.user_id=auth.uid()),
    (SELECT is_correct FROM public.daily_mcq_responses r WHERE r.daily_mcq_id=d.id AND r.user_id=auth.uid()),
    d.created_at
  FROM public.daily_mcqs d
  WHERE d.for_date = CURRENT_DATE
  ORDER BY d.created_at ASC
$$;

-- Today's daily MCQ leaderboard: who got how many correct fastest
CREATE OR REPLACE FUNCTION public.get_daily_mcq_leaderboard()
RETURNS TABLE(user_id uuid, full_name text, correct_count bigint, total_answered bigint, first_correct_at timestamptz)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  WITH today AS (SELECT id FROM public.daily_mcqs WHERE for_date = CURRENT_DATE)
  SELECT r.user_id, COALESCE(p.full_name,'Anonymous'),
    COUNT(*) FILTER (WHERE r.is_correct)::bigint,
    COUNT(*)::bigint,
    MIN(r.created_at) FILTER (WHERE r.is_correct)
  FROM public.daily_mcq_responses r
  JOIN today t ON t.id = r.daily_mcq_id
  LEFT JOIN public.profiles p ON p.id = r.user_id
  GROUP BY r.user_id, p.full_name
  ORDER BY COUNT(*) FILTER (WHERE r.is_correct) DESC, MIN(r.created_at) FILTER (WHERE r.is_correct) ASC
$$;
