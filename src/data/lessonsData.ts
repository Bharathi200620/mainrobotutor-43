export interface Lesson {
  id: number;
  title: string;
  explanation: string;
  example: string;
}

export interface Topic {
  id: number;
  title: string;
  lessons: Lesson[];
}

export interface GradeLessons {
  grade: number;
  topics: Topic[];
}

export const lessonsData: GradeLessons[] = [
  {
    grade: 6,
    topics: [
      {
        id: 1,
        title: "What is AI?",
        lessons: [
          {
            id: 1,
            title: "Introduction to Intelligence",
            explanation: "Humans show intelligence by thinking, learning, and solving problems. Machines usually follow rules, but AI allows them to 'think' in a limited way.",
            example: "Humans learn to ride a bicycle; AI learns to play chess."
          },
          {
            id: 2,
            title: "What is AI?",
            explanation: "AI is when machines can do tasks that normally need human intelligence (like recognizing speech, images, or solving problems).",
            example: "Siri, Google Maps, YouTube recommendations."
          },
          {
            id: 3,
            title: "History of AI",
            explanation: "Early AI started in the 1950s. First, simple calculators, then computers, now AI in self-driving cars.",
            example: "Alan Turing → first ideas about machines thinking."
          },
          {
            id: 4,
            title: "AI vs. Normal Programs",
            explanation: "Normal programs follow fixed instructions. AI learns from examples.",
            example: "Calculator always follows rules → AI photo app learns to recognize cats from pictures."
          }
        ]
      },
      {
        id: 2,
        title: "Robots in Daily Life",
        lessons: [
          {
            id: 1,
            title: "What is a Robot?",
            explanation: "Robots are machines that can sense, think, and act.",
            example: "Toy robots, vacuum robots."
          },
          {
            id: 2,
            title: "Robots at Home",
            explanation: "Robots help in cleaning, cooking, and voice control.",
            example: "Roomba vacuum cleaner, Alexa."
          },
          {
            id: 3,
            title: "Robots at Work",
            explanation: "Robots help doctors, farmers, and factory workers.",
            example: "Surgical robots, milking machines, car assembly robots."
          },
          {
            id: 4,
            title: "Robots in Space",
            explanation: "Robots explore dangerous places like Mars.",
            example: "NASA's Curiosity rover."
          }
        ]
      },
      {
        id: 3,
        title: "Smart Devices",
        lessons: [
          {
            id: 1,
            title: "What Makes a Device Smart?",
            explanation: "Smart devices use sensors, internet, and sometimes AI.",
            example: "Smart speakers 'listen' and 'respond.'"
          },
          {
            id: 2,
            title: "Smartphones & Smart TVs",
            explanation: "Phones can do much more than calls. Smart TVs connect to internet.",
            example: "Smartphones can recognize your face, Smart TVs recommend shows you might like."
          },
          {
            id: 3,
            title: "Wearables",
            explanation: "Devices you wear that track health, time, or communication.",
            example: "Smartwatch counts steps."
          },
          {
            id: 4,
            title: "Smart Homes",
            explanation: "Lights, fans, and ACs that can be controlled by apps.",
            example: "You can turn on your home lights using your phone before you arrive."
          }
        ]
      }
    ]
  },
  {
    grade: 7,
    topics: [
      {
        id: 1,
        title: "Machine Learning Basics",
        lessons: [
          {
            id: 1,
            title: "What is Machine Learning?",
            explanation: "Machine Learning (ML) is when computers are trained with data instead of being given fixed instructions.",
            example: "Teaching a computer to recognize fruits by showing many apple and orange pictures."
          },
          {
            id: 2,
            title: "How Machines Learn from Data",
            explanation: "Computers look at examples (data), find patterns, and improve over time.",
            example: "Email spam filter — trained by thousands of spam emails."
          },
          {
            id: 3,
            title: "Types of Learning",
            explanation: "Supervised Learning → teacher gives answers. Unsupervised Learning → machine groups items without answers.",
            example: "Supervised: Teacher shows 'cat' pictures with labels. Unsupervised: Machine groups cats/dogs without labels."
          },
          {
            id: 4,
            title: "Real-World Examples",
            explanation: "ML is everywhere: YouTube recommendations, Google Maps traffic, Netflix suggestions.",
            example: "Netflix suggests shows based on your watch history."
          }
        ]
      },
      {
        id: 2,
        title: "Pattern Recognition",
        lessons: [
          {
            id: 1,
            title: "What is a Pattern?",
            explanation: "A pattern is something that repeats (shapes, numbers, events).",
            example: "2, 4, 6, 8… (number pattern)."
          },
          {
            id: 2,
            title: "AI & Patterns",
            explanation: "AI finds patterns in large data.",
            example: "Face ID uses unique facial patterns."
          },
          {
            id: 3,
            title: "Everyday Uses",
            explanation: "AI recognizes voice, handwriting, and daily habits.",
            example: "Google predicts your search."
          },
          {
            id: 4,
            title: "Game – Find the Pattern",
            explanation: "Students practice recognizing patterns like AI.",
            example: "Interactive pattern recognition exercises."
          }
        ]
      },
      {
        id: 3,
        title: "AI in Games",
        lessons: [
          {
            id: 1,
            title: "AI in Video Games",
            explanation: "AI makes characters act smart.",
            example: "Racing games where computer cars compete."
          },
          {
            id: 2,
            title: "NPCs (Non-Player Characters)",
            explanation: "NPCs are controlled by AI, not humans.",
            example: "Villagers in Minecraft, Pokémon trainers."
          },
          {
            id: 3,
            title: "Difficulty Levels",
            explanation: "AI adjusts difficulty to challenge players.",
            example: "Mario enemies move faster on higher levels."
          },
          {
            id: 4,
            title: "Famous Examples",
            explanation: "AI beats humans at chess, Go, and even video games.",
            example: "AlphaGo beat the world champion."
          }
        ]
      }
    ]
  },
  {
    grade: 8,
    topics: [
      {
        id: 1,
        title: "Neural Networks",
        lessons: [
          {
            id: 1,
            title: "What is a Neural Network?",
            explanation: "Inspired by the human brain, neural networks are AI systems that process information.",
            example: "Recognizing handwritten numbers."
          },
          {
            id: 2,
            title: "Neurons",
            explanation: "Brain cells pass signals; artificial neurons pass numbers.",
            example: "Each neuron checks if input is 'strong enough' to pass."
          },
          {
            id: 3,
            title: "How Networks Learn",
            explanation: "Input → hidden layers → output. Mistakes corrected by feedback.",
            example: "Cat vs. dog classifier improves with practice."
          },
          {
            id: 4,
            title: "Applications",
            explanation: "Used in Face ID, Siri, Google Translate.",
            example: "Snapchat filters track face features."
          }
        ]
      },
      {
        id: 2,
        title: "Deep Learning",
        lessons: [
          {
            id: 1,
            title: "What is Deep Learning?",
            explanation: "Deep learning = many layers of neural networks.",
            example: "Self-driving cars identifying road signs."
          },
          {
            id: 2,
            title: "ML vs. DL",
            explanation: "ML solves simple tasks, DL solves complex ones.",
            example: "ML sorts fruit, DL drives a car."
          },
          {
            id: 3,
            title: "Layers of Networks",
            explanation: "Input → Hidden Layers → Output. Each hidden layer extracts more detail.",
            example: "First layer sees edges, next layer sees shapes, final layer recognizes objects."
          },
          {
            id: 4,
            title: "Applications",
            explanation: "DL is used in translation, healthcare, robotics.",
            example: "Google Translate uses DL for sentences."
          }
        ]
      },
      {
        id: 3,
        title: "Computer Vision",
        lessons: [
          {
            id: 1,
            title: "What is Computer Vision?",
            explanation: "Teaching computers to see and understand images.",
            example: "Face unlock in phones."
          },
          {
            id: 2,
            title: "How Computers See",
            explanation: "Images are made of pixels (tiny dots of color).",
            example: "Zoom into a photo to see pixels."
          },
          {
            id: 3,
            title: "Applications",
            explanation: "Used in Face ID, traffic cameras, medical scans.",
            example: "AI analyzing medical X-rays to detect diseases."
          },
          {
            id: 4,
            title: "Challenges",
            explanation: "AI struggles with blurry, dark, or tricky images.",
            example: "AI mistaking dog for wolf due to snow in background."
          }
        ]
      }
    ]
  },
  {
    grade: 9,
    topics: [
      {
        id: 1,
        title: "NLP (Natural Language Processing) Basics",
        lessons: [
          {
            id: 1,
            title: "What is NLP?",
            explanation: "NLP helps computers understand human language (spoken or written).",
            example: "Google Translate or chatbots."
          },
          {
            id: 2,
            title: "How Computers Understand Text",
            explanation: "Computers break text into tokens (words or parts of words).",
            example: "\"I love cats\" → tokens: [I], [love], [cats]."
          },
          {
            id: 3,
            title: "Simple Uses",
            explanation: "Spell check, autocomplete, translation, text prediction.",
            example: "Phone keyboard suggests words."
          },
          {
            id: 4,
            title: "Speech & Text",
            explanation: "AI converts speech to text and text to speech.",
            example: "Siri answers questions aloud."
          }
        ]
      },
      {
        id: 2,
        title: "Chatbots",
        lessons: [
          {
            id: 1,
            title: "What is a Chatbot?",
            explanation: "A chatbot is a computer program that talks with people.",
            example: "Customer service bots."
          },
          {
            id: 2,
            title: "Rule-Based vs AI-Based",
            explanation: "Rule-based → fixed answers. AI-based → learns and adapts.",
            example: "Rule-based = \"Press 1 for help\"; AI-based = Alexa."
          },
          {
            id: 3,
            title: "Chatbots in Real Life",
            explanation: "Used in banks, e-commerce, learning apps.",
            example: "Swiggy/Zomato delivery chatbot."
          },
          {
            id: 4,
            title: "Demo",
            explanation: "Show how chatbots respond.",
            example: "Interactive chatbot demonstration."
          }
        ]
      },
      {
        id: 3,
        title: "AI Ethics",
        lessons: [
          {
            id: 1,
            title: "What are Ethics?",
            explanation: "Ethics = knowing right vs wrong.",
            example: "Sharing secrets is wrong → same for data in AI."
          },
          {
            id: 2,
            title: "Why AI Needs Ethics",
            explanation: "AI affects people → must be fair and safe.",
            example: "Biased hiring software rejecting good candidates."
          },
          {
            id: 3,
            title: "Examples of Ethical Issues",
            explanation: "Deepfakes, fake news, misuse of personal data.",
            example: "Fake videos of celebrities saying things they never said."
          },
          {
            id: 4,
            title: "Responsible AI",
            explanation: "AI should respect privacy, safety, fairness.",
            example: "Health AI must protect patient data."
          }
        ]
      }
    ]
  },
  {
    grade: 10,
    topics: [
      {
        id: 1,
        title: "Reinforcement Learning (RL)",
        lessons: [
          {
            id: 1,
            title: "What is RL?",
            explanation: "RL is training AI through rewards and punishments.",
            example: "Dog learns tricks with treats → robot learns tasks with points."
          },
          {
            id: 2,
            title: "Example – Training a Pet vs Robot",
            explanation: "Both pets and robots improve through practice and feedback.",
            example: "AI game bot improves by playing many times."
          },
          {
            id: 3,
            title: "RL in Games",
            explanation: "RL helps AI learn strategy in games.",
            example: "Pac-Man bot learns to collect points, avoid ghosts."
          },
          {
            id: 4,
            title: "Q-Learning (Simplified)",
            explanation: "Q-learning stores \"best moves\" for future.",
            example: "Robot remembers \"turn left = reward.\""
          }
        ]
      },
      {
        id: 2,
        title: "AI Careers",
        lessons: [
          {
            id: 1,
            title: "AI Jobs",
            explanation: "Careers in AI include engineer, researcher, ethicist, designer.",
            example: "AI doctor assistant developer."
          },
          {
            id: 2,
            title: "Skills Needed",
            explanation: "Coding, math, creativity, teamwork.",
            example: "AI artists use coding + art."
          },
          {
            id: 3,
            title: "AI in Industries",
            explanation: "AI is in healthcare, education, transport, entertainment.",
            example: "AI diagnosing X-rays."
          },
          {
            id: 4,
            title: "Preparing for Careers",
            explanation: "Students can start with coding clubs, competitions, online courses.",
            example: "Kids learning Python."
          }
        ]
      },
      {
        id: 3,
        title: "Future of AI",
        lessons: [
          {
            id: 1,
            title: "AI Today",
            explanation: "Current AI achievements: self-driving, chatbots, face recognition.",
            example: "Tesla's autopilot, ChatGPT, iPhone Face ID."
          },
          {
            id: 2,
            title: "Future Possibilities",
            explanation: "AI doctors, Mars robots, smart cities.",
            example: "Robots helping elderly."
          },
          {
            id: 3,
            title: "Benefits",
            explanation: "AI can improve healthcare, education, safety.",
            example: "AI detecting diseases early from scans."
          },
          {
            id: 4,
            title: "Risks",
            explanation: "AI may cause job loss, privacy issues, misuse.",
            example: "Automated systems replacing human workers."
          }
        ]
      }
    ]
  }
];

export const getLessonsForGrade = (grade: number): GradeLessons | undefined => {
  return lessonsData.find(data => data.grade === grade);
};