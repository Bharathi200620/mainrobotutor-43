import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Target, BookOpen, Trophy, Clock, Brain, Send, Lightbulb } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useProgressTracking } from "@/hooks/useProgressTracking";
import { useToast } from "@/hooks/use-toast";
import { AuthForm } from "@/components/AuthForm";

interface SDGProblem {
  id: string;
  title: string;
  description: string;
  grade: number;
  sdg_goal: number;
  sdg_title: string;
  difficulty: string;
  points: number;
  content: string;
  questions: any;
}

interface UserProgress {
  problem_id: string;
  completed: boolean;
  score: number;
  attempts: number;
}

const Problems = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { trackActivity } = useProgressTracking();
  const { toast } = useToast();
  const [problems, setProblems] = useState<SDGProblem[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<number>(6);
  const [loading, setLoading] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<SDGProblem | null>(null);
  const [userSolution, setUserSolution] = useState("");
  const [aiExplanation, setAiExplanation] = useState("");
  const [submittingAnswer, setSubmittingAnswer] = useState(false);

  useEffect(() => {
    if (user) {
      loadProblems();
      loadUserProgress();
    }
  }, [user, selectedGrade]);

  const loadProblems = async () => {
    try {
      const { data, error } = await supabase
        .from('sdg_problems')
        .select('*')
        .eq('grade', selectedGrade)
        .order('sdg_goal');

      if (error) throw error;
      setProblems(data || []);
    } catch (error) {
      console.error('Error loading problems:', error);
    }
  };

  const loadUserProgress = async () => {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('problem_id, completed, score, attempts')
        .eq('user_id', user?.id);

      if (error) throw error;
      setUserProgress(data || []);
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const getProblemProgress = (problemId: string) => {
    return userProgress.find(p => p.problem_id === problemId);
  };

  const startProblem = (problem: SDGProblem) => {
    setSelectedProblem(problem);
    setUserSolution("");
    setAiExplanation("");
  };

  const submitSolution = async () => {
    if (!selectedProblem || !userSolution.trim()) {
      toast({
        title: "Error",
        description: "Please enter your solution before submitting.",
        variant: "destructive",
      });
      return;
    }

    setSubmittingAnswer(true);
    try {
      // Prepare the message for AI
      const message = `Problem: ${selectedProblem.title}
      
Description: ${selectedProblem.description}

Content: ${selectedProblem.content}

Student's Solution: ${userSolution}

Please provide detailed feedback on the student's solution and explain the correct approach to solving this SDG problem. Include:
1. Assessment of their solution
2. Step-by-step explanation of the correct approach
3. Key concepts they should understand
4. Real-world applications`;

      const { data: functionData, error: functionError } = await supabase.functions.invoke('ai', {
        body: { message }
      });

      if (functionError) {
        throw new Error(functionError.message || "Failed to get AI response");
      }

      const explanation = functionData?.response;
      setAiExplanation(explanation);

      // Track problem completion with progress tracking
      trackActivity('problem', selectedProblem.id, {
        grade: selectedProblem.grade,
        difficulty: selectedProblem.difficulty || 'medium',
        status: 'completed',
        score: 85,
        maxScore: 100
      });

      // Update user progress
      const { error: progressError } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user?.id,
          problem_id: selectedProblem.id,
          completed: true,
          score: 85, // You can implement a more sophisticated scoring system
          attempts: 1
        });

      if (progressError) {
        console.error('Error updating progress:', progressError);
      } else {
        // Reload progress to update UI
        loadUserProgress();
      }

      toast({
        title: "Solution Submitted!",
        description: "Check the explanation below to learn more.",
      });

    } catch (error) {
      console.error('Error submitting solution:', error);
      toast({
        title: "Error",
        description: "Failed to submit solution. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmittingAnswer(false);
    }
  };

  const closeProblem = () => {
    setSelectedProblem(null);
    setUserSolution("");
    setAiExplanation("");
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'hard': return 'bg-red-500/20 text-red-400';
      default: return 'bg-primary/20 text-primary';
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
            onClick={selectedProblem ? closeProblem : () => navigate("/dashboard")} 
            variant="glass" 
            size="sm"
          >
            <ArrowLeft className="w-4 h-4" />
            {selectedProblem ? "Back to Problems" : "Back to Dashboard"}
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-electric bg-clip-text text-transparent">
            {selectedProblem ? `🎯 ${selectedProblem.title}` : "🧩 SDG Learning Problems"}
          </h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {selectedProblem ? (
          /* Problem Detail View */
          <div className="space-y-6">
            {/* Problem Details */}
            <Card variant="glass" className="animate-fade-in">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    SDG {selectedProblem.sdg_goal}
                  </Badge>
                  <Badge className={getDifficultyColor(selectedProblem.difficulty)}>
                    {selectedProblem.difficulty}
                  </Badge>
                  <Badge variant="outline">{selectedProblem.points} points</Badge>
                </div>
                <CardTitle className="text-xl">{selectedProblem.title}</CardTitle>
                <p className="text-muted-foreground">{selectedProblem.sdg_title}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">{selectedProblem.description}</p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Problem Details:</h4>
                  <p className="text-sm">{selectedProblem.content}</p>
                </div>
              </CardContent>
            </Card>

            {/* Solution Input */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-6 h-6 text-primary" />
                  Your Solution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Type your solution here... Explain your approach, reasoning, and proposed actions to address this SDG problem."
                  value={userSolution}
                  onChange={(e) => setUserSolution(e.target.value)}
                  className="min-h-[150px]"
                />
                <Button 
                  onClick={submitSolution}
                  disabled={submittingAnswer || !userSolution.trim()}
                  className="w-full"
                  variant="hero"
                >
                  {submittingAnswer ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Getting AI Feedback...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Solution
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* AI Explanation */}
            {aiExplanation && (
              <Card variant="neon" className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-6 h-6 text-accent" />
                    AI Feedback & Explanation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none text-foreground">
                    <pre className="whitespace-pre-wrap font-sans">{aiExplanation}</pre>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <>
            {/* Grade Selection */}
            <Card variant="neon" className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-primary" />
                  Select Your Grade Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[6, 7, 8, 9, 10].map((grade) => (
                    <Button
                      key={grade}
                      variant={selectedGrade === grade ? "neon" : "glass"}
                      onClick={() => setSelectedGrade(grade)}
                      className="min-w-[80px]"
                    >
                      Grade {grade}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Problems Grid */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Grade {selectedGrade} SDG Problems</h2>
              
              {problems.length === 0 ? (
                <Card variant="glass">
                  <CardContent className="p-8 text-center">
                    <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">
                      No problems available for Grade {selectedGrade} yet. Check back soon!
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {problems.map((problem) => {
                    const progress = getProblemProgress(problem.id);
                    return (
                      <Card key={problem.id} variant="glass" className="hover:shadow-glow transition-all">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="secondary" className="bg-primary/20 text-primary">
                                  SDG {problem.sdg_goal}
                                </Badge>
                                <Badge className={getDifficultyColor(problem.difficulty)}>
                                  {problem.difficulty}
                                </Badge>
                              </div>
                              <CardTitle className="text-lg">{problem.title}</CardTitle>
                              <p className="text-sm text-muted-foreground mt-1">
                                {problem.sdg_title}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-accent">{problem.points}</div>
                              <div className="text-xs text-muted-foreground">points</div>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <p className="text-sm text-muted-foreground">
                            {problem.description}
                          </p>

                          {progress && (
                            <div className="space-y-2">
                              <div className="flex justify-between items-center text-sm">
                                <span>Your Progress</span>
                                <span>
                                  {progress.completed ? "Completed" : `${progress.attempts} attempts`}
                                </span>
                              </div>
                              {progress.completed && (
                                <div className="flex items-center gap-2 text-sm text-accent">
                                  <Trophy className="w-4 h-4" />
                                  Score: {progress.score}%
                                </div>
                              )}
                            </div>
                          )}

                          <Button 
                            variant={progress?.completed ? "secondary" : "hero"} 
                            className="w-full"
                            onClick={() => startProblem(problem)}
                          >
                            {progress?.completed ? "Review Problem" : "Start Learning"}
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Overall Progress */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-6 h-6 text-primary" />
                  Grade {selectedGrade} Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Problems Completed</span>
                    <span className="text-sm text-muted-foreground">
                      {userProgress.filter(p => p.completed && problems.some(prob => prob.id === p.problem_id)).length}/{problems.length}
                    </span>
                  </div>
                  <Progress 
                    value={problems.length > 0 ? (userProgress.filter(p => p.completed && problems.some(prob => prob.id === p.problem_id)).length / problems.length) * 100 : 0}
                    className="h-3" 
                  />
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Problems;