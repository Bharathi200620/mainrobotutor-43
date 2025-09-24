import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, Mic, MicOff, X } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm your AI assistant. Ask me anything about Artificial Intelligence! 🤖",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  // Smart AI response generator
  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! I'm excited to help you learn about AI! What would you like to know about artificial intelligence today?";
    }
    
    // What is AI
    if (message.includes('what is ai') || message.includes('define ai') || message.includes('what is artificial intelligence')) {
      return "AI (Artificial Intelligence) is like teaching computers to think and learn like humans! It's when we make machines that can solve problems, recognize patterns, and make decisions. Think of it as giving computers a brain to understand and help us!";
    }
    
    // Machine Learning
    if (message.includes('machine learning') || message.includes('ml') || message.includes('learning')) {
      return "Machine Learning is a way for computers to learn from examples, just like how you learn to recognize your friends' faces! The more examples we show the computer, the better it gets at making predictions and decisions.";
    }
    
    // Neural Networks
    if (message.includes('neural network') || message.includes('brain') || message.includes('neuron')) {
      return "Neural networks are computer systems inspired by how our brains work! Just like our brain has neurons that connect and send messages, neural networks have artificial neurons that work together to process information and learn patterns.";
    }
    
    // Robots
    if (message.includes('robot') || message.includes('robotics')) {
      return "Robots are machines that can move and do tasks automatically! With AI, robots can be smart - they can see with cameras, hear with microphones, and make decisions about what to do next. Cool, right?";
    }
    
    // Future of AI
    if (message.includes('future') || message.includes('career') || message.includes('job')) {
      return "The future of AI is super exciting! AI will help doctors find cures, help us explore space, make cars safer, and solve climate change. There are amazing careers in AI like AI engineer, data scientist, and robotics designer!";
    }
    
    // AI Ethics
    if (message.includes('ethics') || message.includes('safe') || message.includes('dangerous')) {
      return "AI ethics is about making sure AI is fair, safe, and helpful for everyone! We need to teach AI to be kind, honest, and respectful, just like we teach these values to people. It's important that AI helps make the world better!";
    }
    
    // Help with studies
    if (message.includes('study') || message.includes('learn') || message.includes('grade') || message.includes('quiz')) {
      return "I'm here to help you learn! Pick a grade level from 6-10 on the dashboard to start with quizzes and lessons. Each grade has topics perfect for your level - from basic AI concepts to advanced topics like deep learning!";
    }
    
    // Games and AI
    if (message.includes('game') || message.includes('play') || message.includes('fun')) {
      return "AI is used in games to make characters smart and challenging! Game AI can control enemies, create realistic behavior, and even generate new game content. Many games use AI to adapt to how you play!";
    }
    
    // Default responses for other questions
    const responses = [
      "That's a great question about AI! AI is all around us - in phones, cars, games, and more. What specific part of AI interests you most?",
      "Interesting topic! AI can help solve many real-world problems. Would you like to know more about how AI works or how it's used in different fields?",
      "AI is fascinating! It combines computer science, mathematics, and creativity. What grade level are you studying? I can give you examples perfect for your level!",
      "Great thinking! AI is always evolving and there's so much to discover. Are you interested in learning about specific AI topics like computer vision, natural language processing, or robotics?",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Generate smart AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: generateAIResponse(inputText),
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      
      // Speak the response
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(botResponse.text);
        utterance.rate = 0.9;
        utterance.pitch = 1.2;
        window.speechSynthesis.speak(utterance);
      }
    }, 1000);
    
    setInputText("");
  };

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="neon"
        size="lg"
        className="fixed bottom-6 left-6 rounded-full w-16 h-16 shadow-glow hover:shadow-green-glow z-50"
      >
        <MessageCircle className="w-8 h-8" />
      </Button>
    );
  }

  return (
    <Card variant="glass" className="fixed bottom-6 left-6 w-80 h-96 z-50 shadow-deep">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            🤖 AI Assistant
          </CardTitle>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="sm"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex flex-col h-full p-4 pt-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  message.isBot
                    ? 'bg-muted text-muted-foreground'
                    : 'bg-primary text-primary-foreground'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about AI..."
            className="flex-1 glass border-primary/30 focus:border-primary"
          />
          
          <Button
            onClick={isListening ? stopListening : startListening}
            variant={isListening ? "destructive" : "glass"}
            size="icon"
            className={isListening ? "animate-pulse" : ""}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          
          <Button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            variant="neon"
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Chatbot;