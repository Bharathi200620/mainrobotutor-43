import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Shield, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Missions from "./pages/Missions";
import Problems from "./pages/Problems";
import Quiz from "./pages/Quiz";
import Lessons from "./pages/Lessons";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const { user, loading, isAdmin } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been signed out of your account.",
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-cosmic tech-grid flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-cosmic tech-grid">
      {/* Admin Button - Top Right */}
      {user && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
          {isAdmin && (
            <Button
              variant="glass"
              size="sm"
              onClick={() => window.location.href = '/admin'}
              className="bg-primary/20 border-primary/30 hover:bg-primary/30"
            >
              <Shield className="w-4 h-4 mr-2" />
              Admin
            </Button>
          )}
          <Button
            variant="glass"
            size="sm"
            onClick={handleLogout}
            className="bg-red-500/20 border-red-500/30 hover:bg-red-500/30"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
        <Route path="/missions" element={user ? <Missions /> : <Navigate to="/" />} />
        <Route path="/problems" element={user ? <Problems /> : <Navigate to="/" />} />
        <Route path="/lessons/:grade" element={user ? <Lessons /> : <Navigate to="/" />} />
        <Route path="/quiz/:grade/:difficulty" element={user ? <Quiz /> : <Navigate to="/" />} />
        <Route path="/admin" element={user && isAdmin ? <Admin /> : <Navigate to="/dashboard" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
