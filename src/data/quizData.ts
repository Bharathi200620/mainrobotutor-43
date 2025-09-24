export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  grade: number;
  difficulty: "Easy" | "Medium" | "Hard";
  title: string;
  questions: Question[];
}

export const quizData: Quiz[] = [
  // Grade 6 Quizzes
  {
    grade: 6,
    difficulty: "Easy",
    title: "AI Basics - Easy",
    questions: [
      {
        id: 1,
        question: "What does AI stand for?",
        options: ["Artificial Intelligence", "Advanced Internet", "Automatic Information", "Amazing Ideas"],
        correctAnswer: 0,
        explanation: "AI stands for Artificial Intelligence, which is technology that can think and learn like humans!"
      },
      {
        id: 2,
        question: "Which of these is an example of AI that you might use at home?",
        options: ["A calculator", "A voice assistant like Siri", "A regular TV", "A pencil"],
        correctAnswer: 1,
        explanation: "Voice assistants like Siri, Alexa, or Google Assistant use AI to understand and respond to your voice!"
      },
      {
        id: 3,
        question: "What can AI robots do?",
        options: ["Only play games", "Help with tasks and learn new things", "Only watch TV", "Nothing useful"],
        correctAnswer: 1,
        explanation: "AI robots can help with many tasks and even learn new things over time, making them very useful!"
      },
      {
        id: 4,
        question: "AI learns by looking at lots of what?",
        options: ["Colors", "Examples and data", "Pictures of cats only", "Nothing"],
        correctAnswer: 1,
        explanation: "AI learns by studying lots of examples and data, just like how you learn by practicing!"
      },
      {
        id: 5,
        question: "Which device uses AI to recommend videos you might like?",
        options: ["A toaster", "YouTube", "A regular clock", "A paper book"],
        correctAnswer: 1,
        explanation: "YouTube uses AI to look at what videos you've watched before and suggest new ones you might enjoy!"
      }
    ]
  },
  {
    grade: 6,
    difficulty: "Medium",
    title: "AI Basics - Medium",
    questions: [
      {
        id: 1,
        question: "How does AI recognize your face in photos?",
        options: ["Magic", "By comparing patterns and features", "It can't do that", "By guessing randomly"],
        correctAnswer: 1,
        explanation: "AI recognizes faces by learning patterns and features like the distance between your eyes and nose shape!"
      },
      {
        id: 2,
        question: "What is machine learning?",
        options: ["Teaching robots to walk", "AI's ability to learn from data", "Building machines", "Playing video games"],
        correctAnswer: 1,
        explanation: "Machine learning is how AI gets better at tasks by studying lots of examples and data!"
      },
      {
        id: 3,
        question: "Which profession might use AI to help patients?",
        options: ["Doctors", "Only teachers", "Only artists", "Only chefs"],
        correctAnswer: 0,
        explanation: "Doctors use AI to help diagnose diseases, analyze medical images, and find the best treatments!"
      },
      {
        id: 4,
        question: "What makes AI different from regular computer programs?",
        options: ["AI can learn and adapt", "AI is always bigger", "AI is more colorful", "There's no difference"],
        correctAnswer: 0,
        explanation: "Unlike regular programs that follow fixed rules, AI can learn from experience and adapt to new situations!"
      },
      {
        id: 5,
        question: "How might AI help protect the environment?",
        options: ["It can't help at all", "By monitoring pollution and optimizing energy use", "Only by playing games", "By making more trash"],
        correctAnswer: 1,
        explanation: "AI helps the environment by monitoring pollution levels, optimizing energy use, and predicting climate patterns!"
      }
    ]
  },
  {
    grade: 6,
    difficulty: "Hard",
    title: "AI Basics - Hard",
    questions: [
      {
        id: 1,
        question: "What is the main goal of creating ethical AI?",
        options: ["To make AI faster", "To ensure AI is fair, safe, and helpful for everyone", "To make AI more expensive", "To make AI look cooler"],
        correctAnswer: 1,
        explanation: "Ethical AI ensures that artificial intelligence is developed and used in ways that are fair, safe, and beneficial for all people!"
      },
      {
        id: 2,
        question: "How might bias in AI affect people?",
        options: ["It has no effect", "It could lead to unfair treatment of different groups", "It makes AI work better", "It only affects computers"],
        correctAnswer: 1,
        explanation: "Bias in AI can lead to unfair treatment of different groups of people, which is why we need to be careful about the data we use to train AI!"
      },
      {
        id: 3,
        question: "What should we consider when AI makes decisions that affect people?",
        options: ["Nothing special", "Speed only", "Fairness, transparency, and human oversight", "Cost only"],
        correctAnswer: 2,
        explanation: "When AI makes important decisions, we must ensure they are fair, transparent, and that humans can understand and oversee these decisions!"
      },
      {
        id: 4,
        question: "Why is it important for diverse people to work on AI development?",
        options: ["It's not important", "Different perspectives help create fairer AI for everyone", "To make it more complicated", "Only for fun"],
        correctAnswer: 1,
        explanation: "Having diverse teams helps ensure AI works well for all people and doesn't accidentally discriminate against certain groups!"
      },
      {
        id: 5,
        question: "What role should humans play as AI becomes more advanced?",
        options: ["Humans should step back completely", "Humans should guide AI development and ensure it helps society", "Humans should compete with AI", "Humans don't matter"],
        correctAnswer: 1,
        explanation: "Humans should always guide AI development to ensure it serves humanity's best interests and helps create a better world!"
      }
    ]
  },
  
  // Grade 7 Quizzes
  {
    grade: 7,
    difficulty: "Easy",
    title: "Smart Machines - Easy",
    questions: [
      {
        id: 1,
        question: "What is machine learning?",
        options: ["Teaching machines to walk", "Computers learning from data without being explicitly programmed", "Building physical machines", "Playing games with computers"],
        correctAnswer: 1,
        explanation: "Machine learning allows computers to learn patterns from data and improve their performance without being explicitly programmed for every task!"
      },
      {
        id: 2,
        question: "How does AI recognize patterns in data?",
        options: ["By guessing randomly", "By finding similarities and differences in examples", "By using magic", "It can't recognize patterns"],
        correctAnswer: 1,
        explanation: "AI recognizes patterns by analyzing lots of examples and finding similarities, differences, and relationships in the data!"
      },
      {
        id: 3,
        question: "What type of AI is used in video games to control characters?",
        options: ["Game AI or NPC AI", "Medical AI", "Weather AI", "No AI is used"],
        correctAnswer: 0,
        explanation: "Game AI controls non-player characters (NPCs), making them behave intelligently and respond to player actions!"
      },
      {
        id: 4,
        question: "Which of these uses pattern recognition?",
        options: ["Email spam filters", "Regular calculators", "Paper notebooks", "Wooden chairs"],
        correctAnswer: 0,
        explanation: "Email spam filters use pattern recognition to identify characteristics of spam emails and filter them out!"
      },
      {
        id: 5,
        question: "How do recommendation systems work?",
        options: ["They guess randomly", "They analyze your preferences and find similar patterns", "They don't work", "They ask your friends"],
        correctAnswer: 1,
        explanation: "Recommendation systems analyze your past choices and find patterns to suggest things you might like based on similar users!"
      }
    ]
  },
  {
    grade: 7,
    difficulty: "Medium",
    title: "Smart Machines - Medium",
    questions: [
      {
        id: 1,
        question: "What are the three main types of machine learning?",
        options: ["Fast, slow, medium", "Supervised, unsupervised, and reinforcement learning", "Red, blue, green", "Easy, medium, hard"],
        correctAnswer: 1,
        explanation: "The three main types are: supervised (learning with examples), unsupervised (finding patterns without labels), and reinforcement (learning through trial and error)!"
      },
      {
        id: 2,
        question: "In supervised learning, what does 'labeled data' mean?",
        options: ["Data with stickers on it", "Data where we know the correct answers", "Data that's colorful", "Data that's organized alphabetically"],
        correctAnswer: 1,
        explanation: "Labeled data means we have examples where we already know the correct answers, so the AI can learn from them!"
      },
      {
        id: 3,
        question: "How does reinforcement learning work?",
        options: ["By memorizing everything", "By learning through rewards and punishments", "By copying other AIs", "By reading books"],
        correctAnswer: 1,
        explanation: "Reinforcement learning works like training a pet - the AI gets rewards for good actions and learns to repeat them!"
      },
      {
        id: 4,
        question: "What makes AI good at playing strategic games like chess?",
        options: ["Luck", "Ability to analyze millions of possible moves quickly", "Cheating", "Having human emotions"],
        correctAnswer: 1,
        explanation: "AI excels at chess because it can quickly analyze millions of possible moves and their consequences to choose the best strategy!"
      },
      {
        id: 5,
        question: "How does computer vision help autonomous vehicles?",
        options: ["It doesn't help", "It helps cars 'see' and understand their surroundings", "It makes cars prettier", "It plays music"],
        correctAnswer: 1,
        explanation: "Computer vision allows self-driving cars to 'see' roads, pedestrians, other cars, and traffic signs to navigate safely!"
      }
    ]
  },
  {
    grade: 7,
    difficulty: "Hard",
    title: "Smart Machines - Hard",
    questions: [
      {
        id: 1,
        question: "What is overfitting in machine learning?",
        options: ["When AI gets too tired", "When AI memorizes training data but can't handle new situations", "When AI becomes too smart", "When AI breaks down"],
        correctAnswer: 1,
        explanation: "Overfitting happens when AI memorizes training examples too well and can't generalize to new, unseen data!"
      },
      {
        id: 2,
        question: "What is the difference between narrow AI and general AI?",
        options: ["Size", "Narrow AI is specialized, general AI would be human-like intelligence", "Color", "Speed"],
        correctAnswer: 1,
        explanation: "Narrow AI is designed for specific tasks (like playing chess), while general AI would have human-like intelligence across all domains!"
      },
      {
        id: 3,
        question: "How do ensemble methods improve AI performance?",
        options: ["By making AI louder", "By combining multiple AI models to make better predictions", "By using more electricity", "By working faster"],
        correctAnswer: 1,
        explanation: "Ensemble methods combine multiple AI models, like having several experts vote on the answer, which often gives better results!"
      },
      {
        id: 4,
        question: "What is the exploration vs exploitation dilemma in reinforcement learning?",
        options: ["A video game problem", "Balancing trying new actions vs using known good actions", "A math equation", "A computer virus"],
        correctAnswer: 1,
        explanation: "It's about balancing exploration (trying new things to learn) with exploitation (using what you already know works well)!"
      },
      {
        id: 5,
        question: "How might adversarial examples affect AI systems?",
        options: ["They make AI friendlier", "They can trick AI into making wrong decisions", "They improve AI speed", "They have no effect"],
        correctAnswer: 1,
        explanation: "Adversarial examples are specially crafted inputs that can fool AI systems into making incorrect predictions, highlighting security concerns!"
      }
    ]
  },

  // Grade 8 Quizzes
  {
    grade: 8,
    difficulty: "Easy",
    title: "Neural Networks - Easy",
    questions: [
      {
        id: 1,
        question: "What are neural networks inspired by?",
        options: ["Computer circuits", "The human brain", "Spider webs", "Road networks"],
        correctAnswer: 1,
        explanation: "Neural networks are inspired by how neurons in the human brain connect and communicate with each other!"
      },
      {
        id: 2,
        question: "What is a neuron in a neural network?",
        options: ["A type of computer", "A processing unit that receives and sends information", "A programming language", "A website"],
        correctAnswer: 1,
        explanation: "An artificial neuron is a processing unit that receives inputs, processes them, and sends outputs to other neurons!"
      },
      {
        id: 3,
        question: "What does 'deep learning' mean?",
        options: ["Learning underwater", "Using neural networks with many layers", "Learning very slowly", "Learning in caves"],
        correctAnswer: 1,
        explanation: "Deep learning uses neural networks with many layers (deep networks) to learn complex patterns in data!"
      },
      {
        id: 4,
        question: "What can computer vision AI do?",
        options: ["Only see in black and white", "Recognize and understand images and videos", "Fix broken computers", "Print documents"],
        correctAnswer: 1,
        explanation: "Computer vision AI can identify objects, faces, text, and understand what's happening in images and videos!"
      },
      {
        id: 5,
        question: "How do neural networks learn?",
        options: ["By reading books", "By adjusting connections between neurons based on examples", "By watching TV", "By sleeping"],
        correctAnswer: 1,
        explanation: "Neural networks learn by adjusting the strength of connections between neurons based on training examples!"
      }
    ]
  },
  {
    grade: 8,
    difficulty: "Medium",
    title: "Neural Networks - Medium",
    questions: [
      {
        id: 1,
        question: "What are the main components of a neural network?",
        options: ["Input layer, hidden layers, and output layer", "Beginning, middle, and end", "Red, green, and blue parts", "Fast and slow sections"],
        correctAnswer: 0,
        explanation: "Neural networks consist of an input layer (receives data), hidden layers (process data), and an output layer (produces results)!"
      },
      {
        id: 2,
        question: "What is backpropagation in neural networks?",
        options: ["Going backwards in time", "A method for training neural networks by adjusting weights", "A type of error", "A programming bug"],
        correctAnswer: 1,
        explanation: "Backpropagation is the process of adjusting the weights in a neural network by working backwards from the output to reduce errors!"
      },
      {
        id: 3,
        question: "What makes convolutional neural networks (CNNs) good for image recognition?",
        options: ["They're faster", "They can detect local features and patterns in images", "They use less memory", "They're more colorful"],
        correctAnswer: 1,
        explanation: "CNNs are designed to detect local features like edges, corners, and patterns, making them excellent for image recognition!"
      },
      {
        id: 4,
        question: "What is transfer learning in deep learning?",
        options: ["Moving files between computers", "Using a pre-trained model as starting point for new tasks", "Learning to drive", "Transferring money"],
        correctAnswer: 1,
        explanation: "Transfer learning uses knowledge from a model trained on one task as a starting point for learning a new, related task!"
      },
      {
        id: 5,
        question: "How do neural networks handle complex problems?",
        options: ["They give up", "By breaking them into smaller, learnable patterns", "They ask for help", "They work slower"],
        correctAnswer: 1,
        explanation: "Neural networks break complex problems into smaller patterns that can be learned layer by layer!"
      }
    ]
  },
  {
    grade: 8,
    difficulty: "Hard",
    title: "Neural Networks - Hard",
    questions: [
      {
        id: 1,
        question: "What is the vanishing gradient problem in deep networks?",
        options: ["Networks becoming invisible", "Gradients becoming too small to effectively train early layers", "Running out of data", "Networks becoming too slow"],
        correctAnswer: 1,
        explanation: "The vanishing gradient problem occurs when gradients become very small in early layers, making them hard to train effectively!"
      },
      {
        id: 2,
        question: "What are activation functions and why are they important?",
        options: ["They turn on computers", "They introduce non-linearity and help networks learn complex patterns", "They make networks faster", "They save energy"],
        correctAnswer: 1,
        explanation: "Activation functions introduce non-linearity, allowing neural networks to learn complex, non-linear relationships in data!"
      },
      {
        id: 3,
        question: "How do recurrent neural networks (RNNs) differ from feedforward networks?",
        options: ["They're circular", "They can process sequences and have memory of previous inputs", "They're faster", "They use less power"],
        correctAnswer: 1,
        explanation: "RNNs have connections that create loops, allowing them to maintain memory and process sequential data like text or time series!"
      },
      {
        id: 4,
        question: "What is the role of regularization in neural networks?",
        options: ["Making networks regular", "Preventing overfitting by adding constraints during training", "Making networks smaller", "Speeding up training"],
        correctAnswer: 1,
        explanation: "Regularization techniques help prevent overfitting by adding constraints that encourage simpler, more generalizable models!"
      },
      {
        id: 5,
        question: "How do generative adversarial networks (GANs) work?",
        options: ["They argue with users", "Two networks compete: one generates fake data, another tries to detect fakes", "They generate electricity", "They create games"],
        correctAnswer: 1,
        explanation: "GANs use two competing networks: a generator creates fake data while a discriminator tries to identify fakes, improving both networks!"
      }
    ]
  },

  // Grade 9 Quizzes
  {
    grade: 9,
    difficulty: "Easy",
    title: "Advanced AI - Easy",
    questions: [
      {
        id: 1,
        question: "What does NLP stand for in AI?",
        options: ["New Learning Program", "Natural Language Processing", "Network Learning Protocol", "Number Learning Process"],
        correctAnswer: 1,
        explanation: "NLP stands for Natural Language Processing - the ability for computers to understand and work with human language!"
      },
      {
        id: 2,
        question: "What can chatbots do?",
        options: ["Only send messages", "Understand and respond to human language", "Only play music", "Only show pictures"],
        correctAnswer: 1,
        explanation: "Modern chatbots can understand human language, answer questions, and have conversations using AI!"
      },
      {
        id: 3,
        question: "Why is AI ethics important?",
        options: ["It's not important", "To ensure AI is used responsibly and fairly", "To make AI more expensive", "To slow down AI development"],
        correctAnswer: 1,
        explanation: "AI ethics ensures that AI technology is developed and used in ways that are fair, safe, and beneficial for everyone!"
      },
      {
        id: 4,
        question: "What is sentiment analysis in AI?",
        options: ["Analyzing feelings and emotions in text", "Counting words", "Translating languages", "Creating poetry"],
        correctAnswer: 0,
        explanation: "Sentiment analysis uses AI to determine the emotional tone or attitude expressed in text - whether it's positive, negative, or neutral!"
      },
      {
        id: 5,
        question: "How might AI help in language translation?",
        options: ["It can't help", "By learning patterns between different languages", "By using dictionaries only", "By asking human translators"],
        correctAnswer: 1,
        explanation: "AI learns patterns and relationships between languages to provide automatic translation, getting better with more data!"
      }
    ]
  },
  {
    grade: 9,
    difficulty: "Medium",
    title: "Advanced AI - Medium",
    questions: [
      {
        id: 1,
        question: "What are transformer models in NLP?",
        options: ["Robots in disguise", "Advanced neural networks that use attention mechanisms for language tasks", "Simple word processors", "Translation devices"],
        correctAnswer: 1,
        explanation: "Transformers are powerful neural network architectures that use attention mechanisms to understand relationships between words in text!"
      },
      {
        id: 2,
        question: "What is the attention mechanism in AI?",
        options: ["Making AI pay attention to users", "A way for AI to focus on relevant parts of input data", "A type of computer memory", "A programming error"],
        correctAnswer: 1,
        explanation: "The attention mechanism allows AI models to focus on the most relevant parts of input data when making predictions!"
      },
      {
        id: 3,
        question: "How do large language models like GPT work?",
        options: ["Magic", "By predicting the next word based on patterns learned from vast text data", "By copying from the internet", "By asking humans"],
        correctAnswer: 1,
        explanation: "Large language models learn patterns from enormous amounts of text and predict what word should come next in a sequence!"
      },
      {
        id: 4,
        question: "What are some ethical concerns with AI?",
        options: ["None at all", "Bias, privacy, job displacement, and fairness", "Only cost", "Only speed"],
        correctAnswer: 1,
        explanation: "Key ethical concerns include algorithmic bias, privacy issues, potential job displacement, and ensuring fair treatment for all groups!"
      },
      {
        id: 5,
        question: "What is explainable AI (XAI)?",
        options: ["AI that talks loudly", "AI systems that can explain their decision-making process", "AI that only works during the day", "AI that's easy to build"],
        correctAnswer: 1,
        explanation: "Explainable AI refers to AI systems that can provide clear explanations for their decisions and reasoning processes!"
      }
    ]
  },
  {
    grade: 9,
    difficulty: "Hard",
    title: "Advanced AI - Hard",
    questions: [
      {
        id: 1,
        question: "What is the alignment problem in AI?",
        options: ["Lining up computers properly", "Ensuring AI systems pursue goals aligned with human values", "Organizing code better", "Fixing computer screens"],
        correctAnswer: 1,
        explanation: "The alignment problem is about ensuring AI systems understand and pursue goals that are truly aligned with human values and intentions!"
      },
      {
        id: 2,
        question: "How do few-shot learning techniques work?",
        options: ["By taking pictures", "By learning new tasks from just a few examples", "By working quickly", "By using small computers"],
        correctAnswer: 1,
        explanation: "Few-shot learning allows AI models to learn new tasks or recognize new categories from just a few examples, mimicking human learning!"
      },
      {
        id: 3,
        question: "What are the challenges of AI bias and how can they be addressed?",
        options: ["There are no challenges", "Biased data leads to unfair outcomes; address through diverse data and careful testing", "Only technical problems", "Only cost issues"],
        correctAnswer: 1,
        explanation: "AI bias occurs when training data reflects societal biases, leading to unfair outcomes. Solutions include diverse datasets, bias testing, and inclusive development teams!"
      },
      {
        id: 4,
        question: "What is federated learning and why is it important?",
        options: ["Learning about governments", "Training AI across multiple devices while keeping data private", "Federal regulations", "Learning in schools"],
        correctAnswer: 1,
        explanation: "Federated learning allows AI models to be trained across many devices without centralizing sensitive data, improving privacy!"
      },
      {
        id: 5,
        question: "How might artificial general intelligence (AGI) differ from current AI?",
        options: ["It would be bigger", "It would have human-level intelligence across all domains", "It would be more colorful", "It would be cheaper"],
        correctAnswer: 1,
        explanation: "AGI would possess human-level cognitive abilities across all domains, unlike current narrow AI that excels at specific tasks!"
      }
    ]
  },

  // Grade 10 Quizzes
  {
    grade: 10,
    difficulty: "Easy",
    title: "Future AI - Easy",
    questions: [
      {
        id: 1,
        question: "What is reinforcement learning?",
        options: ["Learning with rewards and punishments", "Learning only positive things", "Learning very slowly", "Learning from books only"],
        correctAnswer: 0,
        explanation: "Reinforcement learning is when AI learns by trying actions and getting rewards for good choices and penalties for bad ones!"
      },
      {
        id: 2,
        question: "What kinds of careers involve working with AI?",
        options: ["Only programming jobs", "Data science, AI research, robotics, ethics, and many others", "Only teaching jobs", "No real careers exist"],
        correctAnswer: 1,
        explanation: "AI creates many career opportunities including data scientists, AI researchers, robotics engineers, AI ethicists, and AI product managers!"
      },
      {
        id: 3,
        question: "How might AI change in the future?",
        options: ["It will stay the same", "It may become more powerful, helpful, and integrated into daily life", "It will disappear", "It will only get worse"],
        correctAnswer: 1,
        explanation: "Future AI is expected to become more capable, helpful, and seamlessly integrated into many aspects of our daily lives!"
      },
      {
        id: 4,
        question: "What should students do to prepare for an AI-powered future?",
        options: ["Ignore AI completely", "Learn critical thinking, creativity, and basic AI literacy", "Only study old technologies", "Avoid all technology"],
        correctAnswer: 1,
        explanation: "Students should develop critical thinking, creativity, problem-solving skills, and understand how AI works to thrive in the future!"
      },
      {
        id: 5,
        question: "How might AI help solve global challenges?",
        options: ["It can't help at all", "By addressing climate change, healthcare, education, and poverty", "Only by playing games", "By making things more expensive"],
        correctAnswer: 1,
        explanation: "AI has potential to help with major challenges like climate change, improving healthcare, personalizing education, and reducing poverty!"
      }
    ]
  },
  {
    grade: 10,
    difficulty: "Medium",
    title: "Future AI - Medium",
    questions: [
      {
        id: 1,
        question: "How does reinforcement learning apply to game AI?",
        options: ["It doesn't", "AI agents learn strategies by playing games and receiving rewards for winning", "Only for puzzle games", "By cheating"],
        correctAnswer: 1,
        explanation: "RL game AI learns by playing many games, getting rewards for good moves and learning optimal strategies through experience!"
      },
      {
        id: 2,
        question: "What skills will be most important in AI-related careers?",
        options: ["Only memorization", "Critical thinking, creativity, communication, and technical skills", "Only math skills", "Only artistic skills"],
        correctAnswer: 1,
        explanation: "AI careers require a mix of technical skills, critical thinking, creativity, and strong communication to work with AI effectively!"
      },
      {
        id: 3,
        question: "What is quantum computing's potential impact on AI?",
        options: ["No impact", "Could dramatically speed up certain AI computations", "Will make AI slower", "Only affects graphics"],
        correctAnswer: 1,
        explanation: "Quantum computing could exponentially speed up certain AI algorithms, potentially solving problems currently impossible for classical computers!"
      },
      {
        id: 4,
        question: "How might AI transform healthcare in the future?",
        options: ["It won't change anything", "Personalized medicine, early disease detection, and drug discovery", "Only administrative tasks", "Replace all doctors"],
        correctAnswer: 1,
        explanation: "AI could enable personalized treatments, detect diseases earlier through pattern recognition, and accelerate drug discovery!"
      },
      {
        id: 5,
        question: "What is the concept of AI democratization?",
        options: ["AI voting in elections", "Making AI tools accessible to everyone, not just tech experts", "AI becoming political", "AI running governments"],
        correctAnswer: 1,
        explanation: "AI democratization means making AI tools and benefits accessible to everyone, not just technical experts or large companies!"
      }
    ]
  },
  {
    grade: 10,
    difficulty: "Hard",
    title: "Future AI - Hard",
    questions: [
      {
        id: 1,
        question: "What are the key challenges in multi-agent reinforcement learning?",
        options: ["None exist", "Coordination, communication, and non-stationary environments", "Only computational cost", "Only memory requirements"],
        correctAnswer: 1,
        explanation: "Multi-agent RL faces challenges in agent coordination, communication protocols, and dealing with constantly changing environments as agents learn!"
      },
      {
        id: 2,
        question: "How might neuromorphic computing change AI development?",
        options: ["It won't change anything", "Could enable more efficient, brain-like AI processing", "Only makes computers smaller", "Only improves graphics"],
        correctAnswer: 1,
        explanation: "Neuromorphic computing mimics brain structure and could enable more efficient, adaptive AI that processes information more like biological neural networks!"
      },
      {
        id: 3,
        question: "What is the potential impact of AI on scientific discovery?",
        options: ["No impact on science", "Could accelerate hypothesis generation, experiment design, and pattern discovery", "Only helps with calculations", "Replaces all scientists"],
        correctAnswer: 1,
        explanation: "AI could revolutionize science by generating novel hypotheses, designing experiments, discovering patterns in complex data, and accelerating research!"
      },
      {
        id: 4,
        question: "What are the implications of AI consciousness and sentience debates?",
        options: ["Purely philosophical with no practical impact", "Could affect AI rights, responsibilities, and how we interact with AI systems", "Only matters for science fiction", "Has no real meaning"],
        correctAnswer: 1,
        explanation: "Questions of AI consciousness raise important issues about AI rights, moral responsibilities, and how society should treat advanced AI systems!"
      },
      {
        id: 5,
        question: "How might AI governance and regulation evolve globally?",
        options: ["No regulation needed", "Likely coordinated international frameworks balancing innovation with safety", "Only local laws", "Complete ban on AI"],
        correctAnswer: 1,
        explanation: "AI governance will likely involve international cooperation to create frameworks that ensure AI safety while promoting beneficial innovation across borders!"
      }
    ]
  }
];