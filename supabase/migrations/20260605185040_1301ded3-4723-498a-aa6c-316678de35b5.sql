
-- Custom MCQs table
CREATE TABLE public.custom_mcqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  options JSONB NOT NULL DEFAULT '[]'::jsonb,
  correct_index INTEGER NOT NULL DEFAULT 0,
  explanation TEXT,
  category TEXT,
  subject TEXT,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.custom_mcqs TO authenticated;
GRANT ALL ON public.custom_mcqs TO service_role;
ALTER TABLE public.custom_mcqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "View published mcqs or admin"
  ON public.custom_mcqs FOR SELECT
  TO authenticated
  USING (is_published = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins insert mcqs"
  ON public.custom_mcqs FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update mcqs"
  ON public.custom_mcqs FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete mcqs"
  ON public.custom_mcqs FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Custom Exams table
CREATE TABLE public.custom_exams (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  time_limit_minutes INTEGER DEFAULT 45,
  question_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.custom_exams TO authenticated;
GRANT ALL ON public.custom_exams TO service_role;
ALTER TABLE public.custom_exams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "View published exams or admin"
  ON public.custom_exams FOR SELECT
  TO authenticated
  USING (is_published = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins insert exams"
  ON public.custom_exams FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update exams"
  ON public.custom_exams FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete exams"
  ON public.custom_exams FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Reusable updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_custom_mcqs_updated_at
  BEFORE UPDATE ON public.custom_mcqs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_custom_exams_updated_at
  BEFORE UPDATE ON public.custom_exams
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
