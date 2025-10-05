import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import RobotTeacher from "@/components/RobotTeacher";
import { useProgressTracking } from "@/hooks/useProgressTracking";
import { useTimeTracking } from "@/hooks/useTimeTracking";
import { ArrowLeft, CheckCircle, XCircle, Trophy, Brain } from "lucide-react";
import { quizData, Question } from "@/data/quizData";

const Quiz = () => {
  const navigate = useNavigate();
  const { grade, difficulty } = useParams();
  const { trackActivity } = useProgressTracking();
  const quiz = quizData.find(
    q => q.grade === parseInt(grade || "6") && q.difficulty === difficulty
  );
  const { timeSpent } = useTimeTracking('quiz', `${grade}-${difficulty}`, true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!quiz) {
      navigate("/dashboard");
    }
  }, [quiz, navigate]);

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);

      if (currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        // Quiz complete
        const finalScore = newAnswers.reduce((score, answer, index) => {
          return score + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
        }, 0);
        setScore(finalScore);
        setQuizComplete(true);
        
        // Track quiz completion
        trackActivity('quiz', `${quiz.grade}-${quiz.difficulty}`, {
          grade: quiz.grade,
          difficulty: quiz.difficulty,
          status: 'completed',
          score: Math.round((finalScore / quiz.questions.length) * 100),
          maxScore: 100,
          timeSpent
        });
      }
    }
  };

  const showAnswer = () => {
    setShowResult(true);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setQuizComplete(false);
    setScore(0);
  };

  const getScoreMessage = () => {
    const percentage = (score / quiz.questions.length) * 100;
    if (percentage >= 90) return { message: "Outstanding! You're an AI expert!", emoji: "🏆", color: "text-accent" };
    if (percentage >= 70) return { message: "Great job! You really understand AI!", emoji: "🌟", color: "text-primary" };
    if (percentage >= 50) return { message: "Good work! Keep learning!", emoji: "👍", color: "text-secondary" };
    return { message: "Keep studying! You'll get better!", emoji: "💪", color: "text-muted-foreground" };
  };

  if (quizComplete) {
    const scoreMsg = getScoreMessage();
    return (
      <div className="min-h-screen bg-gradient-cosmic tech-grid">
        <header className="border-b border-primary/20 glass">
          <div className="container mx-auto px-4 py-4 flex items-center gap-4">
            <Button onClick={() => navigate("/dashboard")} variant="glass" size="sm">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-electric bg-clip-text text-transparent">
              Quiz Complete!
            </h1>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 flex justify-center">
          <Card variant="neon" className="w-full max-w-2xl animate-fade-in">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Trophy className="w-16 h-16 text-accent" />
              </div>
              <CardTitle className="text-3xl mb-2">
                {scoreMsg.message}
              </CardTitle>
              <div className="text-6xl mb-4">{scoreMsg.emoji}</div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2 text-primary">
                  {score}/{quiz.questions.length}
                </div>
                <div className="text-lg text-muted-foreground">
                  {Math.round((score / quiz.questions.length) * 100)}% Score
                </div>
                <Progress value={(score / quiz.questions.length) * 100} className="mt-4 h-3" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 glass rounded-lg">
                  <div className="text-2xl font-bold text-accent">{score}</div>
                  <div className="text-sm text-muted-foreground">Correct</div>
                </div>
                <div className="p-4 glass rounded-lg">
                  <div className="text-2xl font-bold text-destructive">
                    {quiz.questions.length - score}
                  </div>
                  <div className="text-sm text-muted-foreground">Incorrect</div>
                </div>
                <div className="p-4 glass rounded-lg">
                  <div className="text-2xl font-bold text-primary">{quiz.questions.length}</div>
                  <div className="text-sm text-muted-foreground">Total Questions</div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={restartQuiz} variant="hero" className="flex-1">
                  Try Again
                </Button>
                <Button onClick={() => navigate("/dashboard")} variant="glass" className="flex-1">
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQ = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-cosmic tech-grid">
      <header className="border-b border-primary/20 glass">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button onClick={() => navigate("/dashboard")} variant="glass" size="sm">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-electric bg-clip-text text-transparent">
              {quiz.title}
            </h1>
          </div>
          <Badge variant="secondary" className="bg-primary/20 text-primary">
            Grade {quiz.grade} - {quiz.difficulty}
          </Badge>
        </div>
      </header>

      {/* Robot Teacher Section */}
      <div className="container mx-auto px-4 py-4">
        <div className="max-w-md mx-auto">
          <RobotTeacher 
            lesson={`Ready for your Grade ${quiz.grade} ${quiz.difficulty} quiz? I'm here to guide you through these ${quiz.questions.length} questions about AI. Take your time and think carefully about each answer!`}
            isTeaching={true}
            grade={quiz.grade}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress */}
        <Card variant="glass" className="mb-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card variant="neon" className="mb-6 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl flex items-center gap-3">
              <Brain className="w-6 h-6 text-primary" />
              {currentQ.question}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Answer Options */}
            <div className="grid gap-3">
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  variant={
                    selectedAnswer === index 
                      ? showResult
                        ? index === currentQ.correctAnswer
                          ? "neon"
                          : "destructive"
                        : "hero"
                      : showResult && index === currentQ.correctAnswer
                        ? "neon"
                        : "glass"
                  }
                  className={`p-4 text-left justify-start h-auto whitespace-normal ${
                    showResult && selectedAnswer === index && index !== currentQ.correctAnswer
                      ? "opacity-60"
                      : ""
                  }`}
                  disabled={showResult}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div className="flex-1 text-sm md:text-base">{option}</div>
                    {showResult && (
                      <div className="flex-shrink-0">
                        {index === currentQ.correctAnswer ? (
                          <CheckCircle className="w-5 h-5 text-accent" />
                        ) : selectedAnswer === index ? (
                          <XCircle className="w-5 h-5 text-destructive" />
                        ) : null}
                      </div>
                    )}
                  </div>
                </Button>
              ))}
            </div>

            {/* Explanation */}
            {showResult && (
              <Card variant="glass" className="animate-fade-in">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      💡
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Explanation:</h4>
                      <p className="text-muted-foreground">{currentQ.explanation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              {!showResult ? (
                <>
                  <Button
                    onClick={showAnswer}
                    disabled={selectedAnswer === null}
                    variant="glass"
                    className="flex-1"
                  >
                    Show Answer
                  </Button>
                  <Button
                    onClick={handleNextQuestion}
                    disabled={selectedAnswer === null}
                    variant="hero"
                    className="flex-1"
                  >
                    {currentQuestion === quiz.questions.length - 1 ? "Finish Quiz" : "Next Question"}
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleNextQuestion}
                  variant="hero"
                  className="w-full"
                >
                  {currentQuestion === quiz.questions.length - 1 ? "Complete Quiz" : "Next Question"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;