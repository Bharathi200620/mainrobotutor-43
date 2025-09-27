import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useProgressTracking } from "@/hooks/useProgressTracking";
import { BookOpen, Brain, Target, Puzzle, Clock, Trophy, TrendingUp } from "lucide-react";

const ProgressDashboard = () => {
  const { progressData, activities, loading } = useProgressTracking();

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="text-center">Loading progress data...</div>
        </CardContent>
      </Card>
    );
  }

  if (!progressData) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            Start learning to see your progress here!
          </div>
        </CardContent>
      </Card>
    );
  }

  const recentActivities = activities
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 5);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lesson': return <BookOpen className="w-4 h-4" />;
      case 'quiz': return <Brain className="w-4 h-4" />;
      case 'mission': return <Target className="w-4 h-4" />;
      case 'problem': return <Puzzle className="w-4 h-4" />;
      default: return <TrendingUp className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-yellow-500';
      case 'started': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const formatTimeSpent = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="space-y-6">
      {/* Overall Stats */}
      <Card variant="neon">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-accent" />
            Overall Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {progressData.overall_stats.completion_rate}%
              </div>
              <div className="text-sm text-muted-foreground">Completion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {progressData.overall_stats.completed_activities}
              </div>
              <div className="text-sm text-muted-foreground">Completed Activities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {progressData.overall_stats.total_activities}
              </div>
              <div className="text-sm text-muted-foreground">Total Activities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary flex items-center justify-center gap-1">
                <Clock className="w-5 h-5" />
                {formatTimeSpent(progressData.overall_stats.total_time_spent)}
              </div>
              <div className="text-sm text-muted-foreground">Time Spent</div>
            </div>
          </div>
          <div className="mt-4">
            <Progress 
              value={progressData.overall_stats.completion_rate} 
              className="w-full h-3"
            />
          </div>
        </CardContent>
      </Card>

      {/* Activity Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Lessons */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <BookOpen className="w-4 h-4 text-blue-500" />
              Lessons
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Completed</span>
                <span className="font-semibold">
                  {progressData.lessons.completed}/{progressData.lessons.total}
                </span>
              </div>
              <Progress 
                value={progressData.lessons.total > 0 
                  ? (progressData.lessons.completed / progressData.lessons.total) * 100 
                  : 0
                } 
                className="h-2"
              />
              <div className="text-xs text-muted-foreground">
                {progressData.lessons.in_progress} in progress
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quizzes */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Brain className="w-4 h-4 text-purple-500" />
              Quizzes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Completed</span>
                <span className="font-semibold">
                  {progressData.quizzes.completed}/{progressData.quizzes.total}
                </span>
              </div>
              <Progress 
                value={progressData.quizzes.total > 0 
                  ? (progressData.quizzes.completed / progressData.quizzes.total) * 100 
                  : 0
                } 
                className="h-2"
              />
              <div className="text-xs text-muted-foreground">
                Avg Score: {Math.round(progressData.quizzes.average_score)}%
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Missions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Target className="w-4 h-4 text-green-500" />
              Missions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Completed</span>
                <span className="font-semibold">
                  {progressData.missions.completed}/{progressData.missions.total}
                </span>
              </div>
              <Progress 
                value={progressData.missions.total > 0 
                  ? (progressData.missions.completed / progressData.missions.total) * 100 
                  : 0
                } 
                className="h-2"
              />
              <div className="text-xs text-muted-foreground">
                {progressData.missions.in_progress} in progress
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Problems */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Puzzle className="w-4 h-4 text-orange-500" />
              Problems
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Completed</span>
                <span className="font-semibold">
                  {progressData.problems.completed}/{progressData.problems.total}
                </span>
              </div>
              <Progress 
                value={progressData.problems.total > 0 
                  ? (progressData.problems.completed / progressData.problems.total) * 100 
                  : 0
                } 
                className="h-2"
              />
              <div className="text-xs text-muted-foreground">
                Avg Score: {Math.round(progressData.problems.average_score)}%
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      {recentActivities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div 
                  key={activity.id} 
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {getActivityIcon(activity.activity_type)}
                      <span className="font-medium capitalize">
                        {activity.activity_type}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {activity.activity_id}
                      {activity.grade && ` (Grade ${activity.grade})`}
                      {activity.difficulty && ` - ${activity.difficulty}`}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="secondary" 
                      className={`${getStatusColor(activity.status)} text-white`}
                    >
                      {activity.status}
                    </Badge>
                    {activity.score > 0 && (
                      <Badge variant="outline">
                        {activity.score}/{activity.max_score}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProgressDashboard;