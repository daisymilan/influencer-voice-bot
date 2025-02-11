
import { DashboardLayout } from "@/components/DashboardLayout";
import { InfluencerForm } from "@/components/InfluencerForm";
import { ChatInterface } from "@/components/ChatInterface";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary animate-fadeIn">
            AI Assistant Training Platform
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fadeIn">
            Train your personal AI assistant with your content from YouTube,
            Twitter, and Spotify. Let your followers interact with an AI that
            speaks in your voice.
          </p>
        </div>
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
            Chat Demo
          </Button>
        </div>
        <div className="animate-fadeIn">
          {showChat ? <ChatInterface /> : <InfluencerForm />}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
