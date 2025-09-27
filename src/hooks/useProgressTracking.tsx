import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface ProgressData {
  lessons: {
    total: number;
    completed: number;
    in_progress: number;
  };
  quizzes: {
    total: number;
    completed: number;
    average_score: number;
  };
  missions: {
    total: number;
    completed: number;
    in_progress: number;
  };
  problems: {
    total: number;
    completed: number;
    average_score: number;
  };
  overall_stats: {
    total_activities: number;
    completed_activities: number;
    total_time_spent: number;
    completion_rate: number;
  };
}

export interface ActivityProgress {
  id: string;
  activity_type: string;
  activity_id: string;
  grade?: number;
  topic_id?: string;
  difficulty?: string;
  status: string;
  score: number;
  max_score: number;
  time_spent: number;
  attempts: number;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

export const useProgressTracking = () => {
  const { user } = useAuth();
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<ActivityProgress[]>([]);

  const fetchProgress = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Fetch overall progress
      const { data: functionData, error: functionError } = await supabase.rpc(
        'get_user_overall_progress',
        { user_uuid: user.id }
      );

      if (functionError) {
        console.error('Error fetching overall progress:', functionError);
      } else if (functionData && typeof functionData === 'object') {
        setProgressData(functionData as unknown as ProgressData);
      }

      // Fetch detailed activities
      const { data: activitiesData, error: activitiesError } = await supabase
        .from('user_progress_tracking')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (activitiesError) {
        console.error('Error fetching activities:', activitiesError);
      } else {
        setActivities(activitiesData || []);
      }
    } catch (error) {
      console.error('Error in fetchProgress:', error);
    } finally {
      setLoading(false);
    }
  };

  const trackActivity = async (
    activityType: string,
    activityId: string,
    options: {
      grade?: number;
      topicId?: string;
      difficulty?: string;
      status?: string;
      score?: number;
      maxScore?: number;
      timeSpent?: number;
    } = {}
  ) => {
    if (!user) return;

    const {
      grade,
      topicId,
      difficulty,
      status = 'started',
      score = 0,
      maxScore = 100,
      timeSpent = 0
    } = options;

    try {
      // Check if activity already exists
      const { data: existingData, error: existingError } = await supabase
        .from('user_progress_tracking')
        .select('*')
        .eq('user_id', user.id)
        .eq('activity_type', activityType)
        .eq('activity_id', activityId)
        .maybeSingle();

      if (existingError && existingError.code !== 'PGRST116') {
        throw existingError;
      }

      if (existingData) {
        // Update existing activity
        const { error: updateError } = await supabase
          .from('user_progress_tracking')
          .update({
            status,
            score,
            max_score: maxScore,
            time_spent: timeSpent,
            attempts: existingData.attempts + (status === 'completed' ? 1 : 0),
            completed_at: status === 'completed' ? new Date().toISOString() : existingData.completed_at
          })
          .eq('id', existingData.id);

        if (updateError) throw updateError;
      } else {
        // Create new activity
        const { error: insertError } = await supabase
          .from('user_progress_tracking')
          .insert({
            user_id: user.id,
            activity_type: activityType,
            activity_id: activityId,
            grade,
            topic_id: topicId,
            difficulty,
            status,
            score,
            max_score: maxScore,
            time_spent: timeSpent,
            attempts: 1,
            completed_at: status === 'completed' ? new Date().toISOString() : null
          });

        if (insertError) throw insertError;
      }

      // Refresh progress data
      fetchProgress();
    } catch (error) {
      console.error('Error tracking activity:', error);
    }
  };

  const getActivityProgress = (activityType: string, activityId: string) => {
    return activities.find(
      activity => activity.activity_type === activityType && activity.activity_id === activityId
    );
  };

  const getGradeProgress = (grade: number) => {
    const gradeActivities = activities.filter(activity => activity.grade === grade);
    const completed = gradeActivities.filter(activity => activity.status === 'completed').length;
    const total = gradeActivities.length;
    
    return {
      total,
      completed,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  };

  const getActivityTypeProgress = (activityType: string) => {
    const typeActivities = activities.filter(activity => activity.activity_type === activityType);
    const completed = typeActivities.filter(activity => activity.status === 'completed').length;
    const total = typeActivities.length;
    
    return {
      total,
      completed,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
      averageScore: total > 0 
        ? Math.round(typeActivities.reduce((sum, activity) => sum + activity.score, 0) / total)
        : 0
    };
  };

  useEffect(() => {
    if (user) {
      fetchProgress();
    }
  }, [user]);

  return {
    progressData,
    activities,
    loading,
    trackActivity,
    getActivityProgress,
    getGradeProgress,
    getActivityTypeProgress,
    refreshProgress: fetchProgress
  };
};