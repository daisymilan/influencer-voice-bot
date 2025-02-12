
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { proxyRequest } from "@/services/proxyService";

export function InfluencerForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    youtube_channel_id: "",
    twitter_handle: "",
    spotify_podcast_id: "",
    chatbot_tone: "",
    google_sheets_url: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await proxyRequest(formData);

      if (response.status !== 200) throw new Error('Failed to submit');

      toast({
        title: "Success!",
        description: "Your bot is being trained. We'll notify you when it's ready.",
      });

      // Trigger the main workflow with the same proxy
      await proxyRequest({ influencer_id: formData.name }); // Using name as ID for now
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to submit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">
          Train Your AI Assistant
        </CardTitle>
        <CardDescription>
          Enter your details below to create your personalized AI chatbot.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Your full name"
              onChange={handleChange}
              required
              className="transition-all duration-200 focus:ring-accent"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="youtube_channel_id">YouTube Channel ID</Label>
            <Input
              id="youtube_channel_id"
              name="youtube_channel_id"
              placeholder="Your YouTube channel ID"
              onChange={handleChange}
              className="transition-all duration-200 focus:ring-accent"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="twitter_handle">Twitter Handle</Label>
            <Input
              id="twitter_handle"
              name="twitter_handle"
              placeholder="@yourhandle"
              onChange={handleChange}
              className="transition-all duration-200 focus:ring-accent"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="spotify_podcast_id">Spotify Podcast ID</Label>
            <Input
              id="spotify_podcast_id"
              name="spotify_podcast_id"
              placeholder="Your Spotify podcast ID"
              onChange={handleChange}
              className="transition-all duration-200 focus:ring-accent"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="google_sheets_url">Google Sheets URL for Affiliate Links</Label>
            <Input
              id="google_sheets_url"
              name="google_sheets_url"
              placeholder="https://docs.google.com/spreadsheets/d/..."
              onChange={handleChange}
              className="transition-all duration-200 focus:ring-accent"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="chatbot_tone">Chatbot Tone</Label>
            <Input
              id="chatbot_tone"
              name="chatbot_tone"
              placeholder="e.g., Professional, Friendly, Casual"
              onChange={handleChange}
              required
              className="transition-all duration-200 focus:ring-accent"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-accent hover:bg-accent-light transition-colors duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Training..." : "Train AI Assistant"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
