import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Users, Activity, Shield, Clock, Mail, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { AuthForm } from "@/components/AuthForm";

interface UserActivity {
  id: string;
  user_id: string;
  activity_type: string;
  user_email: string;
  user_name: string;
  created_at: string;
}

interface UserRole {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, isAdmin } = useAuth();
  const { toast } = useToast();
  const [userActivity, setUserActivity] = useState<UserActivity[]>([]);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && isAdmin) {
      loadUserActivity();
      loadUserRoles();
    }
  }, [user, isAdmin]);

  const loadUserActivity = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_activity')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setUserActivity(data || []);
    } catch (error) {
      console.error('Error loading user activity:', error);
      toast({
        title: "Error",
        description: "Failed to load user activity.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadUserRoles = async () => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUserRoles(data || []);
    } catch (error) {
      console.error('Error loading user roles:', error);
    }
  };

  const makeAdmin = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .upsert({
          user_id: userId,
          role: 'admin'
        });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "User has been granted admin privileges.",
      });
      
      loadUserRoles();
    } catch (error) {
      console.error('Error making user admin:', error);
      toast({
        title: "Error",
        description: "Failed to grant admin privileges.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getActivityBadgeColor = (activityType: string) => {
    switch (activityType) {
      case 'login': return 'bg-green-500/20 text-green-400';
      case 'signup': return 'bg-blue-500/20 text-blue-400';
      case 'logout': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-gray-500/20 text-gray-400';
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

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-cosmic tech-grid flex items-center justify-center">
        <Card variant="glass" className="p-8">
          <div className="text-center">
            <Shield className="w-16 h-16 mx-auto mb-4 text-red-400" />
            <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
            <p className="text-muted-foreground mb-4">
              You need administrator privileges to access this page.
            </p>
            <Button onClick={() => navigate("/dashboard")} variant="glass">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-cosmic tech-grid">
      {/* Header */}
      <header className="border-b border-primary/20 glass">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button 
            onClick={() => navigate("/dashboard")} 
            variant="glass" 
            size="sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-electric bg-clip-text text-transparent">
            <Shield className="w-8 h-8 inline mr-2" />
            Admin Dashboard
          </h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userRoles.length}</div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userActivity.length}</div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Admins</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userRoles.filter(role => role.role === 'admin').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Activity Table */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-6 h-6 text-primary" />
              User Activity Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-muted-foreground">Loading activity...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <User className="w-4 h-4 inline mr-2" />
                        User
                      </TableHead>
                      <TableHead>
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email
                      </TableHead>
                      <TableHead>Activity</TableHead>
                      <TableHead>
                        <Clock className="w-4 h-4 inline mr-2" />
                        Time
                      </TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userActivity.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell className="font-medium">
                          {activity.user_name || 'Unknown'}
                        </TableCell>
                        <TableCell>{activity.user_email}</TableCell>
                        <TableCell>
                          <Badge className={getActivityBadgeColor(activity.activity_type)}>
                            {activity.activity_type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(activity.created_at)}
                        </TableCell>
                        <TableCell>
                          {!userRoles.find(role => role.user_id === activity.user_id && role.role === 'admin') && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => makeAdmin(activity.user_id)}
                            >
                              Make Admin
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {userActivity.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          No user activity recorded yet.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;