-- Create user_progress_tracking table for comprehensive progress across all activities
CREATE TABLE public.user_progress_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  activity_type TEXT NOT NULL, -- 'lesson', 'quiz', 'mission', 'problem'
  activity_id TEXT NOT NULL, -- Could be lesson_id, quiz_id, mission_id, problem_id
  grade INTEGER,
  topic_id TEXT,
  difficulty TEXT,
  status TEXT NOT NULL DEFAULT 'started', -- 'started', 'in_progress', 'completed'
  score INTEGER DEFAULT 0,
  max_score INTEGER DEFAULT 100,
  time_spent INTEGER DEFAULT 0, -- in minutes
  attempts INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.user_progress_tracking ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own progress tracking" 
ON public.user_progress_tracking 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress tracking" 
ON public.user_progress_tracking 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress tracking" 
ON public.user_progress_tracking 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_user_progress_tracking_updated_at
BEFORE UPDATE ON public.user_progress_tracking
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_user_progress_tracking_user_id ON public.user_progress_tracking(user_id);
CREATE INDEX idx_user_progress_tracking_activity ON public.user_progress_tracking(activity_type, activity_id);
CREATE INDEX idx_user_progress_tracking_grade ON public.user_progress_tracking(grade);

-- Create a function to get overall progress for a user
CREATE OR REPLACE FUNCTION public.get_user_overall_progress(user_uuid UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'lessons', (
      SELECT json_build_object(
        'total', COUNT(*),
        'completed', COUNT(*) FILTER (WHERE status = 'completed'),
        'in_progress', COUNT(*) FILTER (WHERE status = 'in_progress')
      )
      FROM user_progress_tracking 
      WHERE user_id = user_uuid AND activity_type = 'lesson'
    ),
    'quizzes', (
      SELECT json_build_object(
        'total', COUNT(*),
        'completed', COUNT(*) FILTER (WHERE status = 'completed'),
        'average_score', COALESCE(AVG(score) FILTER (WHERE status = 'completed'), 0)
      )
      FROM user_progress_tracking 
      WHERE user_id = user_uuid AND activity_type = 'quiz'
    ),
    'missions', (
      SELECT json_build_object(
        'total', COUNT(*),
        'completed', COUNT(*) FILTER (WHERE status = 'completed'),
        'in_progress', COUNT(*) FILTER (WHERE status = 'in_progress')
      )
      FROM user_progress_tracking 
      WHERE user_id = user_uuid AND activity_type = 'mission'
    ),
    'problems', (
      SELECT json_build_object(
        'total', COUNT(*),
        'completed', COUNT(*) FILTER (WHERE status = 'completed'),
        'average_score', COALESCE(AVG(score) FILTER (WHERE status = 'completed'), 0)
      )
      FROM user_progress_tracking 
      WHERE user_id = user_uuid AND activity_type = 'problem'
    ),
    'overall_stats', (
      SELECT json_build_object(
        'total_activities', COUNT(*),
        'completed_activities', COUNT(*) FILTER (WHERE status = 'completed'),
        'total_time_spent', COALESCE(SUM(time_spent), 0),
        'completion_rate', 
          CASE 
            WHEN COUNT(*) > 0 THEN 
              ROUND((COUNT(*) FILTER (WHERE status = 'completed')::DECIMAL / COUNT(*)) * 100, 2)
            ELSE 0 
          END
      )
      FROM user_progress_tracking 
      WHERE user_id = user_uuid
    )
  ) INTO result;
  
  RETURN result;
END;
$$;