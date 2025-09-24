import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RobotTeacher from "@/components/RobotTeacher";
import Chatbot from "@/components/Chatbot";
import { User, Target, LogOut, Trophy, Brain, Zap, BookOpen, Puzzle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { AuthForm } from "@/components/AuthForm";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);

  const grades = [
    {
      grade: 6,
      title: "Grade 6 - AI Basics",
      description: "What is AI? Meet your first robot friends!",
      topics: ["What is AI?", "Robots in Daily Life", "Smart Devices"],
      color: "bg-gradient-to-r from-blue-500 to-purple-500",
    },
    {
      grade: 7,
      title: "Grade 7 - Smart Machines",
      description: "How machines learn and make decisions",
      topics: ["Machine Learning Basics", "Pattern Recognition", "AI in Games"],
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
    {
      grade: 8,
      title: "Grade 8 - Neural Networks",
      description: "Brain-inspired computing systems",
      topics: ["Neural Networks", "Deep Learning", "Computer Vision"],
      color: "bg-gradient-to-r from-pink-500 to-red-500",
    },
    {
      grade: 9,
      title: "Grade 9 - Advanced AI",
      description: "Natural language and advanced algorithms",
      topics: ["NLP Basics", "Chatbots", "AI Ethics"],
      color: "bg-gradient-to-r from-red-500 to-orange-500",
    },
    {
      grade: 10,
      title: "Grade 10 - Future AI",
      description: "Cutting-edge AI and career paths",
      topics: ["Reinforcement Learning", "AI Careers", "Future of AI"],
      color: "bg-gradient-to-r from-orange-500 to-yellow-500",
    },
  ];

  const difficultyLevels = [
    { name: "Easy", icon: "🟢", description: "Basic concepts and fun facts" },
    { name: "Medium", icon: "🟡", description: "Practical applications" },
    { name: "Hard", icon: "🔴", description: "Advanced challenges" },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate("/");
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
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-electric bg-clip-text text-transparent">
              AI BUDDY Dashboard
            </h1>
            <span className="text-2xl animate-bounce">🤖</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="glass" size="sm" className="gap-2" onClick={() => navigate("/profile")}>
              <User className="w-4 h-4" />
              👤 Your Profile
            </Button>
            <Button variant="glass" size="sm" className="gap-2" onClick={() => navigate("/missions")}>
              <Target className="w-4 h-4" />
              🎯 SDG Missions
            </Button>
            <Button variant="glass" size="sm" className="gap-2" onClick={() => navigate("/problems")}>
              <Puzzle className="w-4 h-4" />
              🧩 Problems
            </Button>
            <Button onClick={handleLogout} variant="ghost" size="sm" className="gap-2">
              <LogOut className="w-4 h-4" />
              🚪 Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Robot Teacher Section */}
        <div className="text-center mb-12">
          <RobotTeacher 
            lesson="Welcome to your AI learning journey! Choose your grade level and start exploring the fascinating world of Artificial Intelligence. Each grade offers unique challenges designed just for you!"
            isTeaching={false}
          />
        </div>

        {/* App Description */}
        <Card variant="neon" className="mb-12 animate-fade-in">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center justify-center gap-3">
              <Brain className="w-8 h-8 text-primary" />
              About AI BUDDY
              <Zap className="w-8 h-8 text-accent" />
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              AI BUDDY is your personal AI teacher, guiding you through the exciting world of Artificial Intelligence with interactive lessons, quizzes, and fun challenges. Get ready to explore AI concepts tailored to your grade level, and ace your AI knowledge with quizzes designed for every level of expertise!
            </p>
          </CardContent>
        </Card>

        {/* Grades Grid */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-center text-foreground flex items-center justify-center gap-3">
            <Trophy className="w-8 h-8 text-accent" />
            Choose Your Grade Level
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grades.map((gradeData) => (
              <Card 
                key={gradeData.grade}
                variant="grade"
                className={`cursor-pointer transition-all duration-300 ${
                  selectedGrade === gradeData.grade ? 'ring-2 ring-primary shadow-glow' : ''
                }`}
                onClick={() => setSelectedGrade(selectedGrade === gradeData.grade ? null : gradeData.grade)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-xl font-bold">{gradeData.title}</span>
                    <Badge variant="secondary" className="bg-primary/20 text-primary">
                      Grade {gradeData.grade}
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {gradeData.description}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Grade-specific Robot Teacher */}
                  <div className="flex justify-center mb-4">
                    <div className="scale-75">
                      <RobotTeacher 
                        grade={gradeData.grade}
                        lesson={`Hi! I'm your Grade ${gradeData.grade} AI teacher. Ready to explore ${gradeData.topics.join(', ')}? Click on me to learn more!`}
                        isTeaching={false}
                      />
                    </div>
                  </div>
                  
                  {/* Topics */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Topics:</h4>
                    <div className="flex flex-wrap gap-2">
                      {gradeData.topics.map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                   {/* Grade Actions */}
                   {selectedGrade === gradeData.grade && (
                     <div className="space-y-3 animate-fade-in">
                       <Button
                         variant="neon"
                         className="w-full gap-2"
                         onClick={() => navigate(`/lessons/${gradeData.grade}`)}
                       >
                         <BookOpen className="w-4 h-4" />
                         Start Lessons 📚
                       </Button>
                       
                       <h4 className="text-sm font-semibold">Or Take Quiz:</h4>
                       <div className="space-y-2">
                         {difficultyLevels.map((level) => (
                           <Button
                             key={level.name}
                             variant="glass"
                             className="w-full justify-start gap-3"
                             onClick={() => navigate(`/quiz/${gradeData.grade}/${level.name}`)}
                           >
                             <span className="text-lg">{level.icon}</span>
                             <div className="text-left">
                               <div className="font-medium">{level.name}</div>
                               <div className="text-xs text-muted-foreground">
                                 {level.description}
                               </div>
                             </div>
                           </Button>
                         ))}
                       </div>
                     </div>
                   )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Dashboard;