
CREATE OR REPLACE FUNCTION public.get_leaderboard()
RETURNS TABLE(
  user_id uuid,
  full_name text,
  attempts bigint,
  best_pct numeric,
  avg_pct numeric,
  total_score bigint
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    a.user_id,
    COALESCE(p.full_name, 'Anonymous') AS full_name,
    COUNT(*)::bigint AS attempts,
    MAX(CASE WHEN a.total_questions > 0
        THEN (a.score::numeric / (a.total_questions * 2)) * 100 ELSE 0 END) AS best_pct,
    AVG(CASE WHEN a.total_questions > 0
        THEN (a.score::numeric / (a.total_questions * 2)) * 100 ELSE 0 END) AS avg_pct,
    SUM(a.score)::bigint AS total_score
  FROM public.exam_attempts a
  LEFT JOIN public.profiles p ON p.id = a.user_id
  GROUP BY a.user_id, p.full_name
  ORDER BY SUM(a.score) DESC
$$;

REVOKE EXECUTE ON FUNCTION public.get_leaderboard() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_leaderboard() TO authenticated;

CREATE OR REPLACE FUNCTION public.get_set_ranking(_set_id text)
RETURNS TABLE(
  user_id uuid,
  full_name text,
  best_score integer,
  best_pct numeric,
  attempts bigint
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    a.user_id,
    COALESCE(p.full_name, 'Anonymous') AS full_name,
    MAX(a.score) AS best_score,
    MAX(CASE WHEN a.total_questions > 0
        THEN (a.score::numeric / (a.total_questions * 2)) * 100 ELSE 0 END) AS best_pct,
    COUNT(*)::bigint AS attempts
  FROM public.exam_attempts a
  LEFT JOIN public.profiles p ON p.id = a.user_id
  WHERE a.set_id = _set_id
  GROUP BY a.user_id, p.full_name
  ORDER BY MAX(a.score) DESC
$$;

REVOKE EXECUTE ON FUNCTION public.get_set_ranking(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_set_ranking(text) TO authenticated;
