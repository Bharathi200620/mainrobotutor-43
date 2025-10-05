import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Trophy, Star, Brain, Zap, Target, User, Phone, School, GraduationCap, Mail, BookOpen, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useProgressTracking } from "@/hooks/useProgressTracking";
import { useToast } from "@/hooks/use-toast";
import { AuthForm } from "@/components/AuthForm";

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const { activities, getGradeProgress, getActivityTypeProgress } = useProgressTracking();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    school: "",
    grade: "",
  });
  
  const [userStats, setUserStats] = useState({
    totalQuizzes: 0,
    correctAnswers: 0,
    totalQuestions: 0,
    streak: 0,
    level: "",
    points: 0,
    badges: [],
  });

  const [gradeProgress, setGradeProgress] = useState<{
    grade: number;
    lessons: { completed: number; total: number; percentage: number };
    quizzes: { completed: number; total: number; percentage: number };
    problems: { completed: number; total: number; percentage: number };
  }[]>([]);

  useEffect(() => {
    if (user) {
      loadUserProfile();
      loadUserProgress();
      loadUserBadges();
      calculateGradeProgress();
      checkAndAwardBadges();
    }
  }, [user, activities]);

  const loadUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setProfileData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          school: data.school || "",
          grade: data.grade || "",
        });
        setUserStats(prev => ({
          ...prev,
          level: data.level || "Getting Started",
          points: data.points || 0,
          streak: data.streak || 0,
        }));
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const calculateGradeProgress = () => {
    const grades = [6, 7, 8, 9, 10];
    const progressByGrade = grades.map(grade => {
      const gradeActivities = activities.filter(a => a.grade === grade);
      
      const lessons = gradeActivities.filter(a => a.activity_type === 'lesson');
      const lessonsCompleted = lessons.filter(a => a.status === 'completed').length;
      
      const quizzes = gradeActivities.filter(a => a.activity_type === 'quiz');
      const quizzesCompleted = quizzes.filter(a => a.status === 'completed').length;
      
      const problems = gradeActivities.filter(a => a.activity_type === 'problem');
      const problemsCompleted = problems.filter(a => a.status === 'completed').length;
      
      return {
        grade,
        lessons: {
          completed: lessonsCompleted,
          total: lessons.length,
          percentage: lessons.length > 0 ? Math.round((lessonsCompleted / lessons.length) * 100) : 0
        },
        quizzes: {
          completed: quizzesCompleted,
          total: quizzes.length,
          percentage: quizzes.length > 0 ? Math.round((quizzesCompleted / quizzes.length) * 100) : 0
        },
        problems: {
          completed: problemsCompleted,
          total: problems.length,
          percentage: problems.length > 0 ? Math.round((problemsCompleted / problems.length) * 100) : 0
        }
      };
    });
    
    setGradeProgress(progressByGrade);
  };

  const loadUserProgress = () => {
    const quizProgress = getActivityTypeProgress('quiz');
    const lessonProgress = getActivityTypeProgress('lesson');
    
    setUserStats(prev => ({
      ...prev,
      totalQuizzes: quizProgress.completed,
      correctAnswers: quizProgress.averageScore,
      totalQuestions: quizProgress.total * 10, // Estimate
    }));
  };

  const checkAndAwardBadges = async () => {
    if (!user) return;
    
    const lessonProgress = getActivityTypeProgress('lesson');
    const quizProgress = getActivityTypeProgress('quiz');
    const problemProgress = getActivityTypeProgress('problem');
    const missionProgress = getActivityTypeProgress('mission');
    
    const badgesToAward = [];
    
    // Lesson badges
    if (lessonProgress.completed >= 1 && lessonProgress.completed < 5) {
      badgesToAward.push({ name: "First Steps", icon: "🎯", description: "Completed your first lesson!" });
    }
    if (lessonProgress.completed >= 5) {
      badgesToAward.push({ name: "Knowledge Seeker", icon: "📚", description: "Completed 5 lessons!" });
    }
    if (lessonProgress.completed >= 10) {
      badgesToAward.push({ name: "Learning Master", icon: "🎓", description: "Completed 10 lessons!" });
    }
    
    // Quiz badges
    if (quizProgress.completed >= 1 && quizProgress.completed < 5) {
      badgesToAward.push({ name: "Quiz Taker", icon: "🧠", description: "Completed your first quiz!" });
    }
    if (quizProgress.completed >= 5) {
      badgesToAward.push({ name: "Brain Power", icon: "💡", description: "Completed 5 quizzes!" });
    }
    if (quizProgress.averageScore >= 80 && quizProgress.completed >= 3) {
      badgesToAward.push({ name: "High Achiever", icon: "⭐", description: "Scored 80%+ average!" });
    }
    
    // Problem badges
    if (problemProgress.completed >= 1) {
      badgesToAward.push({ name: "Problem Solver", icon: "🔧", description: "Solved your first problem!" });
    }
    if (problemProgress.completed >= 5) {
      badgesToAward.push({ name: "SDG Champion", icon: "🌍", description: "Solved 5 SDG problems!" });
    }
    
    // Mission badges
    if (missionProgress.completed >= 1) {
      badgesToAward.push({ name: "Mission Starter", icon: "🚀", description: "Completed your first mission!" });
    }
    if (missionProgress.completed >= 3) {
      badgesToAward.push({ name: "Mission Expert", icon: "🏆", description: "Completed 3 missions!" });
    }
    
    // Award badges that don't exist yet
    try {
      const { data: existingBadges } = await supabase
        .from('user_badges')
        .select('badge_name')
        .eq('user_id', user.id);
      
      const existingBadgeNames = existingBadges?.map(b => b.badge_name) || [];
      
      for (const badge of badgesToAward) {
        if (!existingBadgeNames.includes(badge.name)) {
          await supabase.from('user_badges').insert({
            user_id: user.id,
            badge_name: badge.name,
            badge_icon: badge.icon,
            badge_description: badge.description
          });
        }
      }
    } catch (error) {
      console.error('Error awarding badges:', error);
    }
  };

  const loadUserBadges = async () => {
    try {
      const { data, error } = await supabase
        .from('user_badges')
        .select('*')
        .eq('user_id', user?.id)
        .order('earned_at', { ascending: false });

      if (error) throw error;

      const badges = data?.map(badge => ({
        icon: badge.badge_icon,
        name: badge.badge_name,
        description: badge.badge_description
      })) || [];

      setUserStats(prev => ({
        ...prev,
        badges
      }));
    } catch (error) {
      console.error('Error loading badges:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
          school: profileData.school,
          grade: profileData.grade,
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Profile saved!",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error saving profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-cosmic tech-grid flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-cosmic tech-grid flex items-center justify-center p-4">
        <AuthForm onAuthSuccess={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-cosmic tech-grid">
      {/* Header */}
      <header className="border-b border-primary/20 glass">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button 
            onClick={() => navigate("/dashboard")} 
            variant="glass" 
            size="sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-electric bg-clip-text text-transparent">
            👤 Your Profile
          </h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Profile Information Card */}
        <Card variant="neon" className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-6 h-6 text-primary" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Name
                </Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="school" className="flex items-center gap-2">
                  <School className="w-4 h-4" />
                  School
                </Label>
                <Input
                  id="school"
                  value={profileData.school}
                  onChange={(e) => handleInputChange("school", e.target.value)}
                  placeholder="Enter your school name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="grade" className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Grade
                </Label>
                <Input
                  id="grade"
                  value={profileData.grade}
                  onChange={(e) => handleInputChange("grade", e.target.value)}
                  placeholder="Enter your grade level"
                />
              </div>
            </div>
            
            <div className="flex justify-center pt-4">
              <Button 
                variant="neon" 
                className="px-8" 
                onClick={handleSaveProfile}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Profile"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* User Stats Card */}
        <Card variant="glass" className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-electric rounded-full flex items-center justify-center text-2xl font-bold">
                  🤖
                </div>
                <div>
                  <CardTitle className="text-2xl">{profileData.name || "AI Learner"}</CardTitle>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <Star className="w-4 h-4 text-accent" />
                    {userStats.level || "Getting Started"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">{userStats.points}</div>
                <div className="text-sm text-muted-foreground">AI Points</div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Stats Cards */}
          <Card variant="glass">
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold">{userStats.totalQuizzes}</div>
              <div className="text-sm text-muted-foreground">Quizzes Completed</div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {userStats.totalQuestions > 0 ? Math.round((userStats.correctAnswers / userStats.totalQuestions) * 100) : 0}%
              </div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardContent className="p-6 text-center">
              <Zap className="w-8 h-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold">{userStats.streak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardContent className="p-6 text-center">
              <Brain className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold">{userStats.correctAnswers}</div>
              <div className="text-sm text-muted-foreground">Correct Answers</div>
            </CardContent>
          </Card>
        </div>

        {/* Progress by Grade */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-primary" />
              Learning Progress by Grade
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {gradeProgress.map((grade) => (
              <div key={grade.grade} className="space-y-3 p-4 rounded-lg bg-muted/20 border border-primary/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-lg">Grade {grade.grade}</span>
                  <Badge variant="outline" className="gap-1">
                    <Trophy className="w-3 h-3" />
                    {grade.lessons.completed + grade.quizzes.completed + grade.problems.completed} completed
                  </Badge>
                </div>
                
                {/* Lessons Progress */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-500" />
                      Lessons
                    </span>
                    <span className="text-muted-foreground">
                      {grade.lessons.completed}/{grade.lessons.total}
                    </span>
                  </div>
                  <Progress value={grade.lessons.percentage} className="h-2" />
                </div>

                {/* Quizzes Progress */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-purple-500" />
                      Quizzes
                    </span>
                    <span className="text-muted-foreground">
                      {grade.quizzes.completed}/{grade.quizzes.total}
                    </span>
                  </div>
                  <Progress value={grade.quizzes.percentage} className="h-2" />
                </div>

                {/* Problems Progress */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-green-500" />
                      Problems
                    </span>
                    <span className="text-muted-foreground">
                      {grade.problems.completed}/{grade.problems.total}
                    </span>
                  </div>
                  <Progress value={grade.problems.percentage} className="h-2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card variant="neon">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-6 h-6 text-accent" />
              Achievements & Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userStats.badges.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userStats.badges.map((badge, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 hover:border-accent/40 transition-all hover:shadow-glow"
                  >
                    <span className="text-3xl">{badge.icon}</span>
                    <div>
                      <div className="font-bold text-base">{badge.name}</div>
                      <div className="text-xs text-muted-foreground">{badge.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Award className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-semibold mb-2">No badges yet!</p>
                <p className="text-sm">Complete lessons, quizzes, and problems to earn amazing badges! 🌟</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;