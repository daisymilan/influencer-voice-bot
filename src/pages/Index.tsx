
import { DashboardLayout } from "@/components/DashboardLayout";
import { InfluencerForm } from "@/components/InfluencerForm";
import { ChatInterface } from "@/components/ChatInterface";
import { AuthForm } from "@/components/AuthForm";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

const Index = () => {
  const [showChat, setShowChat] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary animate-fadeIn">
            AI Assistant Training Platform
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fadeIn">
            {showChat 
              ? "Chat with the AI assistant trained with your content. Experience how your followers will interact with your personalized chatbot."
              : "Train your personal AI assistant with your content from YouTube, Twitter, and Spotify. Let your followers interact with an AI that speaks in your voice."}
          </p>
          {user && (
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="text-sm"
              >
                Sign Out
              </Button>
            </div>
          )}
        </div>
        
        {user ? (
          <>
            <div className="flex justify-center space-x-4">
              <Button
                onClick={() => setShowChat(false)}
                variant={showChat ? "outline" : "default"}
                className="bg-accent hover:bg-accent-light transition-colors duration-200"
              >
                Train Bot
              </Button>
              <Button
                onClick={() => setShowChat(true)}
                variant={showChat ? "default" : "outline"}
                className="bg-accent hover:bg-accent-light transition-colors duration-200"
              >
                Try Chat Demo
              </Button>
            </div>
            <div className="animate-fadeIn">
              {showChat ? <ChatInterface /> : <InfluencerForm />}
            </div>
          </>
        ) : (
          <AuthForm />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Index;
