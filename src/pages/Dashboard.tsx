import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { LogOut, Mail, Phone, Calendar, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { format } from "date-fns";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
  is_read: boolean;
}

const Dashboard = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      await fetchMessages();
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch messages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleMessageRead = async (id: string, currentReadStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ is_read: !currentReadStatus })
        .eq('id', id);

      if (error) throw error;
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === id ? { ...msg, is_read: !currentReadStatus } : msg
        )
      );
      
      toast({
        title: "Message updated",
        description: `Message marked as ${!currentReadStatus ? 'read' : 'unread'}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update message",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    } else {
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading messages...</p>
        </div>
      </div>
    );
  }

  const unreadCount = messages.filter(msg => !msg.is_read).length;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Contact Messages Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back, {user?.email}
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut size={16} className="mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <GlassCard variant="contact">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-primary">{messages.length}</h3>
              <p className="text-muted-foreground">Total Messages</p>
            </div>
          </GlassCard>
          <GlassCard variant="contact">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-secondary">{unreadCount}</h3>
              <p className="text-muted-foreground">Unread Messages</p>
            </div>
          </GlassCard>
          <GlassCard variant="contact">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-accent">{messages.length - unreadCount}</h3>
              <p className="text-muted-foreground">Read Messages</p>
            </div>
          </GlassCard>
        </div>

        {/* Messages */}
        <div className="space-y-4">
          {messages.length === 0 ? (
            <GlassCard variant="contact" className="text-center py-12">
              <Mail size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No messages yet</h3>
              <p className="text-muted-foreground">
                When users submit the contact form, their messages will appear here.
              </p>
            </GlassCard>
          ) : (
            messages.map((message) => (
              <GlassCard key={message.id} variant="contact" className="animate-fade-in">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-foreground">
                          {message.name}
                        </h3>
                        <Badge variant={message.is_read ? "secondary" : "default"}>
                          {message.is_read ? "Read" : "Unread"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail size={14} />
                          {message.email}
                        </div>
                        {message.phone && (
                          <div className="flex items-center gap-1">
                            <Phone size={14} />
                            {message.phone}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {format(new Date(message.created_at), "MMM dd, yyyy 'at' hh:mm a")}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleMessageRead(message.id, message.is_read)}
                    >
                      {message.is_read ? (
                        <>
                          <EyeOff size={14} className="mr-1" />
                          Mark Unread
                        </>
                      ) : (
                        <>
                          <Eye size={14} className="mr-1" />
                          Mark Read
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-foreground/80 whitespace-pre-wrap">
                      {message.message}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;