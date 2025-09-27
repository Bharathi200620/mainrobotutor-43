import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useProgressTracking } from "@/hooks/useProgressTracking";
import { ArrowLeft, Target, Globe, Leaf, Heart, GraduationCap, Zap, Trophy } from "lucide-react";

const Missions = () => {
  const navigate = useNavigate();
  const { trackActivity } = useProgressTracking();

  const [sdgMissions, setSdgMissions] = useState([
    {
      id: 1,
      title: "Quality Education with AI",
      icon: <GraduationCap className="w-6 h-6" />,
      description: "Learn how AI can improve education worldwide and complete related quizzes",
      progress: 0,
      tasks: [
        { task: "Complete Grade 6 AI Basics", completed: false },
        { task: "Study AI in Education", completed: false },
        { task: "Take Educational AI Quiz", completed: false },
        { task: "Complete Advanced Learning Topics", completed: false },
      ],
      points: 300,
      color: "from-blue-500 to-purple-500",
    },
    {
      id: 2,
      title: "Good Health & AI Medicine",
      icon: <Heart className="w-6 h-6" />,
      description: "Explore how AI is revolutionizing healthcare and medical diagnosis",
      progress: 0,
      tasks: [
        { task: "Learn about AI in Healthcare", completed: false },
        { task: "Study Medical AI Applications", completed: false },
        { task: "Complete Health AI Quiz", completed: false },
        { task: "Explore AI Ethics in Medicine", completed: false },
      ],
      points: 250,
      color: "from-red-500 to-pink-500",
    },
    {
      id: 3,
      title: "Climate Action with AI",
      icon: <Leaf className="w-6 h-6" />,
      description: "Discover how AI helps fight climate change and environmental challenges",
      progress: 0,
      tasks: [
        { task: "Study AI for Climate", completed: false },
        { task: "Learn Environmental AI", completed: false },
        { task: "Complete Climate Quiz", completed: false },
        { task: "AI Sustainability Project", completed: false },
      ],
      points: 400,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 4,
      title: "Innovation & AI Infrastructure",
      icon: <Zap className="w-6 h-6" />,
      description: "Build knowledge about AI infrastructure and technological innovation",
      progress: 0,
      tasks: [
        { task: "Complete Neural Networks", completed: false },
        { task: "Study AI Infrastructure", completed: false },
        { task: "Learn about AI Hardware", completed: false },
        { task: "Advanced AI Systems Quiz", completed: false },
      ],
      points: 350,
      color: "from-orange-500 to-yellow-500",
    },
    {
      id: 5,
      title: "Responsible AI for All",
      icon: <Globe className="w-6 h-6" />,
      description: "Understand AI ethics, bias, and creating inclusive AI systems",
      progress: 0,
      tasks: [
        { task: "AI Ethics Introduction", completed: false },
        { task: "Study AI Bias", completed: false },
        { task: "Fairness in AI Quiz", completed: false },
        { task: "Build Inclusive AI", completed: false },
      ],
      points: 500,
      color: "from-purple-500 to-indigo-500",
    },
  ]);

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
            🎯 SDG AI Missions
          </h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Introduction Card */}
        <Card variant="neon" className="animate-fade-in">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center justify-center gap-3">
              <Target className="w-8 h-8 text-primary" />
              Sustainable Development Goals & AI
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join our special missions to learn how Artificial Intelligence can help achieve the UN Sustainable Development Goals! 
              Complete quizzes, earn points, and discover how AI technology can make the world a better place.
            </p>
          </CardContent>
        </Card>

        {/* Missions Grid */}
        <div className="space-y-6">
          {sdgMissions.map((mission) => (
            <Card key={mission.id} variant="glass" className="hover:shadow-glow transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${mission.color} rounded-full flex items-center justify-center text-white`}>
                      {mission.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{mission.title}</CardTitle>
                      <p className="text-muted-foreground mt-1">{mission.description}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    {mission.points} points
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Mission Progress</span>
                    <span className="text-sm text-muted-foreground">{mission.progress}% complete</span>
                  </div>
                  <Progress value={mission.progress} className="h-2" />
                </div>

                {/* Tasks */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Mission Tasks:</h4>
                  <div className="space-y-2">
                    {mission.tasks.map((task, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                          task.completed 
                            ? 'bg-accent text-background' 
                            : 'border-2 border-muted-foreground'
                        }`}>
                          {task.completed && '✓'}
                        </div>
                        <span className={task.completed ? 'text-muted-foreground line-through' : 'text-foreground'}>
                          {task.task}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  <Button 
                    variant={mission.progress > 0 ? "neon" : "hero"} 
                    className="w-full"
                    onClick={() => {
                      // Track mission start
                      trackActivity('mission', mission.id.toString(), {
                        status: mission.progress === 0 ? 'started' : 'in_progress',
                        score: mission.progress,
                        maxScore: 100
                      });
                      navigate("/dashboard");
                    }}
                  >
                    {mission.progress === 100 ? "Mission Complete! 🏆" : 
                     mission.progress > 0 ? "Continue Mission" : "Start Mission"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Total Progress */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-accent" />
              Overall Mission Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Total SDG Progress</span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(sdgMissions.reduce((sum, mission) => sum + mission.progress, 0) / sdgMissions.length)}% complete
                </span>
              </div>
              <Progress 
                value={sdgMissions.reduce((sum, mission) => sum + mission.progress, 0) / sdgMissions.length} 
                className="h-3" 
              />
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Complete all missions to become an AI for Good Champion! 🌟
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Missions;