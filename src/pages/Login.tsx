import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import robotTeacher from "@/assets/robot-teacher.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-cosmic tech-grid flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent/30 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Robot Teacher - Top Right */}
      <div className="absolute top-8 right-8 z-20">
        <div className="relative">
          <img 
            src={robotTeacher} 
            alt="AI Buddy Robot Teacher"
            className="w-24 h-24 md:w-32 md:h-32 float pulse-glow rounded-full"
          />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center animate-bounce">
            <span className="text-xs font-bold text-background">AI</span>
          </div>
        </div>
      </div>

      {/* Main Login Card */}
      <Card variant="glass" className="w-full max-w-md relative z-10 animate-fade-in">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <CardTitle className="text-4xl md:text-5xl font-bold bg-gradient-electric bg-clip-text text-transparent">
              Welcome to AI BUDDY
            </CardTitle>
            <span className="text-4xl animate-bounce">🤖</span>
          </div>
          <p className="text-muted-foreground text-lg">
            Your personal AI learning companion awaits
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground font-medium">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="glass border-primary/30 focus:border-primary focus:shadow-glow transition-all"
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass border-primary/30 focus:border-primary focus:shadow-glow transition-all"
                placeholder="Enter your password"
                required
              />
            </div>

            <Button 
              type="submit" 
              variant="hero" 
              size="lg" 
              className="w-full mt-6 font-semibold text-lg"
            >
              Enter AI World 🚀
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            Ready to explore the future of learning?
          </div>
        </CardContent>
      </Card>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-primary rounded-full animate-ping"></div>
        <div className="absolute top-3/4 left-2/3 w-1 h-1 bg-accent rounded-full animate-ping delay-700"></div>
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-secondary rounded-full animate-ping delay-300"></div>
      </div>
    </div>
  );
};

export default Login;