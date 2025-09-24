import { useState } from "react";
import robotTeacher from "@/assets/robot-teacher.png";
import robotGrade6 from "@/assets/robot-grade-6.png";
import robotGrade7 from "@/assets/robot-grade-7.png";
import robotGrade8 from "@/assets/robot-grade-8.png";
import robotGrade9 from "@/assets/robot-grade-9.png";
import robotGrade10 from "@/assets/robot-grade-10.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Volume2, VolumeX } from "lucide-react";

interface RobotTeacherProps {
  lesson?: string;
  isTeaching?: boolean;
  grade?: number;
}

const RobotTeacher = ({ lesson, isTeaching = false, grade }: RobotTeacherProps) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Grade-specific robot images and lessons
  const getRobotData = () => {
    switch (grade) {
      case 6:
        return {
          image: robotGrade6,
          name: "Buddy Basic",
          defaultLesson: "Hi there! I'm Buddy Basic, your Grade 6 AI teacher! Let's explore what AI is and how robots help us in daily life. Did you know that your smartphone uses AI to recognize your voice?",
          topics: ["What is AI?", "Robots in Daily Life", "Smart Devices"]
        };
      case 7:
        return {
          image: robotGrade7,
          name: "Smart Sam",
          defaultLesson: "Hello! I'm Smart Sam, your Grade 7 guide to smart machines! Today we'll discover how machines learn patterns and make decisions, just like when you learn to recognize your favorite songs!",
          topics: ["Machine Learning Basics", "Pattern Recognition", "AI in Games"]
        };
      case 8:
        return {
          image: robotGrade8,
          name: "Neural Nora",
          defaultLesson: "Greetings! I'm Neural Nora, your Grade 8 neural network expert! Let's dive into brain-inspired computing and see how computers can 'see' and understand images just like humans do!",
          topics: ["Neural Networks", "Deep Learning", "Computer Vision"]
        };
      case 9:
        return {
          image: robotGrade9,
          name: "Advanced Alex",
          defaultLesson: "Welcome! I'm Advanced Alex, your Grade 9 AI specialist! We'll explore natural language processing and AI ethics. Ever wondered how chatbots understand what you're saying?",
          topics: ["NLP Basics", "Chatbots", "AI Ethics"]
        };
      case 10:
        return {
          image: robotGrade10,
          name: "Future Felix",
          defaultLesson: "Hey there! I'm Future Felix, your Grade 10 cutting-edge AI mentor! Ready to explore reinforcement learning and discover exciting AI career paths? The future of AI awaits!",
          topics: ["Reinforcement Learning", "AI Careers", "Future of AI"]
        };
      default:
        return {
          image: robotTeacher,
          name: "AI Buddy",
          defaultLesson: "Welcome to AI BUDDY! Ready to explore the amazing world of Artificial Intelligence?",
          topics: []
        };
    }
  };

  const robotData = getRobotData();
  const currentLesson = lesson || robotData.defaultLesson;

  const speakLesson = () => {
    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();
      
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(currentLesson);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
      };
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="space-y-4">
      {/* Robot Character */}
      <div className="flex items-center justify-center">
        <div className={`relative ${isTeaching || isSpeaking ? 'animate-bounce' : 'float'}`}>
          <img 
            src={robotData.image} 
            alt={`${robotData.name} - Grade ${grade || ''} AI Teacher`}
            className={`w-32 h-32 md:w-40 md:h-40 rounded-full ${isSpeaking ? 'shadow-green-glow' : 'shadow-glow'} transition-all duration-500`}
          />
          
          {/* Speaking indicator */}
          {isSpeaking && (
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center animate-pulse">
              <Volume2 className="w-4 h-4 text-background" />
            </div>
          )}
          
          {/* AI Badge */}
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-glow">
            <span className="text-sm font-bold text-background">AI</span>
          </div>
        </div>
      </div>

      {/* Robot Name */}
      {grade && (
        <div className="text-center">
          <h3 className="text-lg font-bold text-primary">{robotData.name}</h3>
          <p className="text-sm text-muted-foreground">Grade {grade} AI Teacher</p>
        </div>
      )}

      {/* Lesson Display */}
      <Card variant="glass" className="max-w-md mx-auto">
        <CardContent className="p-4 text-center">
          <p className="text-foreground text-sm md:text-base leading-relaxed mb-4">
            {currentLesson}
          </p>
          
          <div className="flex gap-2 justify-center">
            <Button
              onClick={speakLesson}
              disabled={isSpeaking}
              variant="neon"
              size="sm"
              className="flex-1"
            >
              <Volume2 className="w-4 h-4" />
              {isSpeaking ? "Teaching..." : "Speak Lesson"}
            </Button>
            
            {isSpeaking && (
              <Button
                onClick={stopSpeaking}
                variant="glass"
                size="sm"
              >
                <VolumeX className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RobotTeacher;