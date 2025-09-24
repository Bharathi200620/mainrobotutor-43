import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Trophy, Star, Brain, Zap, Target, User, Phone, School, GraduationCap, Mail } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
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

  const [gradeProgress, setGradeProgress] = useState([
    { grade: 6, completed: 0, total: 0, percentage: 0 },
    { grade: 7, completed: 0, total: 0, percentage: 0 },
    { grade: 8, completed: 0, total: 0, percentage: 0 },
    { grade: 9, completed: 0, total: 0, percentage: 0 },
    { grade: 10, completed: 0, total: 0, percentage: 0 },
  ]);

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

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
              <Button variant="neon" className="px-8">
                Save Profile
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
              <Brain className="w-6 h-6 text-primary" />
              Learning Progress by Grade
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {gradeProgress.map((grade) => (
              <div key={grade.grade} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Grade {grade.grade}</span>
                  <span className="text-sm text-muted-foreground">
                    {grade.completed}/{grade.total} quizzes
                  </span>
                </div>
                <Progress value={grade.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-accent" />
              Achievements & Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userStats.badges.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userStats.badges.map((badge, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-primary/20">
                    <span className="text-2xl">{badge.icon}</span>
                    <div>
                      <div className="font-medium">{badge.name}</div>
                      <div className="text-sm text-muted-foreground">{badge.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Start completing quizzes to earn your first badges! 🌟</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;