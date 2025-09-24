-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  name TEXT,
  email TEXT,
  phone TEXT,
  school TEXT,
  grade TEXT,
  points INTEGER DEFAULT 0,
  level TEXT DEFAULT 'Getting Started',
  streak INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create SDG problems table
CREATE TABLE public.sdg_problems (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  grade INTEGER NOT NULL CHECK (grade >= 6 AND grade <= 10),
  sdg_goal INTEGER NOT NULL CHECK (sdg_goal >= 1 AND sdg_goal <= 17),
  sdg_title TEXT NOT NULL,
  difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  points INTEGER DEFAULT 100,
  content TEXT NOT NULL,
  questions JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user progress table
CREATE TABLE public.user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  problem_id UUID REFERENCES public.sdg_problems(id) ON DELETE CASCADE NOT NULL,
  completed BOOLEAN DEFAULT false,
  score INTEGER DEFAULT 0,
  attempts INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, problem_id)
);

-- Create badges table
CREATE TABLE public.user_badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  badge_name TEXT NOT NULL,
  badge_description TEXT NOT NULL,
  badge_icon TEXT NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, badge_name)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sdg_problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view and edit their own profile" 
ON public.profiles 
FOR ALL 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for SDG problems (public read access)
CREATE POLICY "Everyone can view SDG problems" 
ON public.sdg_problems 
FOR SELECT 
USING (true);

-- Create RLS policies for user progress
CREATE POLICY "Users can view and edit their own progress" 
ON public.user_progress 
FOR ALL 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for user badges
CREATE POLICY "Users can view and edit their own badges" 
ON public.user_badges 
FOR ALL 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON public.user_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample SDG problems for each grade
INSERT INTO public.sdg_problems (title, description, grade, sdg_goal, sdg_title, difficulty, points, content, questions) VALUES
-- Grade 6 Problems
('AI for Quality Education', 'Learn how AI can help make education better for everyone around the world.', 6, 4, 'Quality Education', 'easy', 100, 'Artificial Intelligence can help teachers create personalized learning experiences for students. AI tutors can provide 24/7 support, and smart systems can identify when students need extra help.', '[{"question": "How can AI help students learn better?", "options": ["By replacing teachers completely", "By providing personalized learning experiences", "By making school harder", "By removing books"], "correct": 1}, {"question": "What is one benefit of AI tutors?", "options": ["They are always angry", "They are available 24/7", "They only work on weekends", "They are very expensive"], "correct": 1}]'),

('AI for Good Health', 'Discover how artificial intelligence helps doctors and hospitals save lives.', 6, 3, 'Good Health and Well-being', 'easy', 100, 'AI helps doctors diagnose diseases faster and more accurately. Smart medical devices can monitor patients and alert doctors when something is wrong. AI also helps develop new medicines.', '[{"question": "How does AI help doctors?", "options": ["By making them work slower", "By diagnosing diseases faster", "By replacing all doctors", "By making hospitals more expensive"], "correct": 1}, {"question": "What can smart medical devices do?", "options": ["Cook food", "Monitor patients", "Play games", "Clean hospitals"], "correct": 1}]'),

-- Grade 7 Problems  
('Climate Action with AI', 'Explore how AI technology fights climate change and protects our environment.', 7, 13, 'Climate Action', 'medium', 150, 'AI systems can predict weather patterns, optimize energy use in buildings, and help develop renewable energy sources. Machine learning algorithms analyze environmental data to find solutions for reducing pollution.', '[{"question": "How can AI help with climate change?", "options": ["By creating more pollution", "By predicting weather patterns and optimizing energy", "By destroying forests", "By using more fossil fuels"], "correct": 1}, {"question": "What do machine learning algorithms analyze for environmental solutions?", "options": ["Video games", "Environmental data", "Social media", "Shopping lists"], "correct": 1}]'),

('Innovation and AI Infrastructure', 'Learn about the technology that powers AI systems and drives innovation.', 7, 9, 'Industry, Innovation and Infrastructure', 'medium', 150, 'AI infrastructure includes powerful computers, networks, and databases that make artificial intelligence possible. This technology drives innovation in many industries and creates new opportunities for economic growth.', '[{"question": "What is AI infrastructure?", "options": ["Only mobile phones", "Powerful computers, networks, and databases for AI", "Just video games", "Only social media apps"], "correct": 1}, {"question": "How does AI drive innovation?", "options": ["By stopping all progress", "By creating new opportunities in industries", "By making everything more expensive", "By removing all jobs"], "correct": 1}]'),

-- Grade 8 Problems
('Responsible AI and Ethics', 'Understand the importance of creating fair and ethical AI systems for everyone.', 8, 10, 'Reduced Inequalities', 'medium', 200, 'As AI becomes more powerful, we must ensure it treats everyone fairly. This means removing bias from AI systems, protecting privacy, and making sure AI benefits all people regardless of their background.', '[{"question": "Why is it important to remove bias from AI systems?", "options": ["To make AI more expensive", "To ensure AI treats everyone fairly", "To make AI work slower", "To limit AI capabilities"], "correct": 1}, {"question": "What should responsible AI protect?", "options": ["Only wealthy people", "Privacy and fairness for all", "Corporate profits only", "Government secrets"], "correct": 1}]'),

('AI for Sustainable Cities', 'Discover how AI makes cities smarter, cleaner, and more livable for everyone.', 8, 11, 'Sustainable Cities and Communities', 'medium', 200, 'Smart city AI systems optimize traffic flow, manage energy consumption, improve waste management, and enhance public safety. These technologies help create more sustainable urban environments.', '[{"question": "How does AI help make cities sustainable?", "options": ["By increasing pollution", "By optimizing traffic, energy, and waste management", "By removing all public transport", "By making cities more expensive"], "correct": 1}, {"question": "What aspects of city life can AI improve?", "options": ["Only entertainment", "Traffic, energy, waste, and safety", "Only shopping malls", "Only sports stadiums"], "correct": 1}]'),

-- Grade 9 Problems
('AI for Clean Water and Sanitation', 'Learn how AI helps provide clean water and sanitation to communities worldwide.', 9, 6, 'Clean Water and Sanitation', 'hard', 250, 'AI systems monitor water quality in real-time, predict contamination issues, optimize water treatment processes, and help distribute clean water efficiently to communities that need it most.', '[{"question": "How does AI help with water quality?", "options": ["By polluting water sources", "By monitoring quality and predicting contamination", "By making water more expensive", "By reducing water supply"], "correct": 1}, {"question": "What can AI optimize in water management?", "options": ["Only water color", "Treatment processes and distribution", "Only water temperature", "Only water storage"], "correct": 1}]'),

('AI for Economic Growth', 'Explore how artificial intelligence creates jobs and drives economic development.', 9, 8, 'Decent Work and Economic Growth', 'hard', 250, 'AI creates new industries, improves productivity, and generates new types of jobs. While some traditional jobs may change, AI opens up opportunities in data science, AI development, and human-AI collaboration.', '[{"question": "How does AI affect employment?", "options": ["It only eliminates jobs", "It creates new industries and job types", "It makes work impossible", "It only benefits robots"], "correct": 1}, {"question": "What new job opportunities does AI create?", "options": ["Only factory work", "Data science and AI development roles", "Only farming jobs", "Only retail positions"], "correct": 1}]'),

-- Grade 10 Problems
('AI for Global Partnerships', 'Understand how AI facilitates international cooperation and global problem-solving.', 10, 17, 'Partnerships for the Goals', 'hard', 300, 'AI enables global collaboration by breaking down language barriers, facilitating knowledge sharing, coordinating international research efforts, and helping organizations work together on global challenges.', '[{"question": "How does AI facilitate global partnerships?", "options": ["By creating more barriers", "By breaking down language barriers and enabling collaboration", "By isolating countries", "By making communication harder"], "correct": 1}, {"question": "What global efforts can AI help coordinate?", "options": ["Only local projects", "International research and global challenges", "Only national politics", "Only individual hobbies"], "correct": 1}]'),

('Advanced AI for Peace and Justice', 'Learn how AI systems support justice, transparency, and peaceful societies.', 10, 16, 'Peace, Justice and Strong Institutions', 'hard', 300, 'AI helps create transparent governance systems, supports fair legal processes, assists in conflict resolution, and helps build accountable institutions that serve all people equally.', '[{"question": "How can AI support justice systems?", "options": ["By hiding information", "By creating transparent and fair processes", "By making justice more expensive", "By eliminating all laws"], "correct": 1}, {"question": "What role does AI play in governance?", "options": ["Only creating confusion", "Supporting transparency and accountability", "Only helping politicians", "Only collecting taxes"], "correct": 1}]');