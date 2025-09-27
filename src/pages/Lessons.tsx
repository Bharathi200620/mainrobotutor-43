import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RobotTeacher from "@/components/RobotTeacher";
import { getLessonsForGrade, Topic, Lesson } from "@/data/lessonsData";
import { useProgressTracking } from "@/hooks/useProgressTracking";
import { ArrowLeft, ArrowRight, BookOpen, Home, CheckCircle } from "lucide-react";

const Lessons = () => {
  const { grade } = useParams();
  const navigate = useNavigate();
  const { trackActivity, getActivityProgress } = useProgressTracking();
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const gradeNumber = parseInt(grade || "6");
  const gradeLessons = getLessonsForGrade(gradeNumber);

  useEffect(() => {
    if (!gradeLessons) {
      navigate("/dashboard");
    }
  }, [gradeLessons, navigate]);

  if (!gradeLessons) {
    return <div>Loading...</div>;
  }

  const currentTopic: Topic = gradeLessons.topics[currentTopicIndex];
  const currentLesson: Lesson = currentTopic.lessons[currentLessonIndex];
  const isLastLessonInTopic = currentLessonIndex === currentTopic.lessons.length - 1;
  const isLastTopic = currentTopicIndex === gradeLessons.topics.length - 1;

  const getLessonText = () => {
    return `${currentLesson.title}\n\n${currentLesson.explanation}\n\nExample: ${currentLesson.example}`;
  };

  const markLessonComplete = () => {
    const lessonKey = `${currentTopicIndex}-${currentLessonIndex}`;
    setCompletedLessons(prev => new Set([...prev, lessonKey]));
    
    // Track lesson completion
    trackActivity('lesson', `${currentTopic.title}-${currentLesson.title}`, {
      grade: gradeNumber,
      topicId: currentTopic.id.toString(),
      status: 'completed',
      score: 100,
      maxScore: 100
    });
  };

  const goToNextLesson = () => {
    markLessonComplete();
    
    if (!isLastLessonInTopic) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    } else if (!isLastTopic) {
      setCurrentTopicIndex(currentTopicIndex + 1);
      setCurrentLessonIndex(0);
    }
  };

  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    } else if (currentTopicIndex > 0) {
      setCurrentTopicIndex(currentTopicIndex - 1);
      setCurrentLessonIndex(gradeLessons.topics[currentTopicIndex - 1].lessons.length - 1);
    }
  };

  const isLessonCompleted = (topicIndex: number, lessonIndex: number) => {
    return completedLessons.has(`${topicIndex}-${lessonIndex}`);
  };

  const canGoNext = !isLastTopic || !isLastLessonInTopic;
  const canGoPrevious = currentTopicIndex > 0 || currentLessonIndex > 0;

  return (
    <div className="min-h-screen bg-gradient-cosmic tech-grid">
      {/* Header */}
      <header className="border-b border-primary/20 glass">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/dashboard")}
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              Dashboard
            </Button>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-electric bg-clip-text text-transparent">
              Grade {gradeNumber} Lessons
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-2">
              <BookOpen className="w-3 h-3" />
              Topic {currentTopicIndex + 1}/{gradeLessons.topics.length}
            </Badge>
            <Badge variant="outline" className="gap-2">
              Lesson {currentLessonIndex + 1}/{currentTopic.lessons.length}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {gradeLessons.topics.map((topic, topicIdx) => (
                <div key={topic.id} className="flex items-center gap-1">
                  <div className="flex gap-1">
                    {topic.lessons.map((_, lessonIdx) => (
                      <div
                        key={lessonIdx}
                        className={`w-3 h-3 rounded-full transition-all ${
                          topicIdx === currentTopicIndex && lessonIdx === currentLessonIndex
                            ? 'bg-primary ring-2 ring-primary/50'
                            : isLessonCompleted(topicIdx, lessonIdx)
                            ? 'bg-accent'
                            : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                  {topicIdx < gradeLessons.topics.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-muted-foreground mx-1" />
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <h2 className="text-center text-lg font-semibold text-foreground">
            {currentTopic.title}
          </h2>
        </div>

        {/* Robot Teacher */}
        <div className="text-center mb-8">
          <RobotTeacher 
            grade={gradeNumber}
            lesson={getLessonText()}
            isTeaching={true}
          />
        </div>

        {/* Lesson Content */}
        <Card variant="neon" className="max-w-4xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                {currentLesson.title}
              </span>
              {isLessonCompleted(currentTopicIndex, currentLessonIndex) && (
                <CheckCircle className="w-5 h-5 text-accent" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-primary mb-2">Explanation:</h4>
              <p className="text-foreground leading-relaxed">{currentLesson.explanation}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-accent mb-2">Example:</h4>
              <p className="text-muted-foreground leading-relaxed">{currentLesson.example}</p>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-center gap-4">
          <Button
            variant="ghost"
            onClick={goToPreviousLesson}
            disabled={!canGoPrevious}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          <Button
            variant="neon"
            onClick={goToNextLesson}
            disabled={!canGoNext}
            className="gap-2"
          >
            {isLastTopic && isLastLessonInTopic ? 'Complete Course' : 'Continue'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Course Complete Message */}
        {isLastTopic && isLastLessonInTopic && (
          <Card variant="glass" className="max-w-md mx-auto mt-8 text-center">
            <CardContent className="p-6">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-primary mb-2">Congratulations!</h3>
              <p className="text-muted-foreground mb-4">
                You've completed all Grade {gradeNumber} AI lessons!
              </p>
              <Button 
                variant="neon" 
                onClick={() => navigate(`/quiz/${gradeNumber}/Easy`)}
                className="w-full"
              >
                Take the Quiz! 🧠
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Lessons;