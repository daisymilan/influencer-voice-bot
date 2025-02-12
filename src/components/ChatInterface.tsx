
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AffiliateLink {
  product_name: string;
  affiliate_link: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [affiliateLinks, setAffiliateLinks] = useState<AffiliateLink[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch affiliate links when component mounts
    const fetchAffiliateLinks = async () => {
      const { data, error } = await supabase
        .from('affiliate_links')
        .select('product_name, affiliate_link');

      if (error) {
        console.error('Error fetching affiliate links:', error);
        return;
      }

      setAffiliateLinks(data || []);
    };

    fetchAffiliateLinks();
  }, []);

  const findRelevantAffiliateLinks = (message: string): AffiliateLink[] => {
    return affiliateLinks.filter(link => 
      message.toLowerCase().includes(link.product_name.toLowerCase())
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://n8n.servenorobot.com/webhook/chat-influencer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: input,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      const botResponse = data.response;
      
      // Check for relevant affiliate links
      const relevantLinks = findRelevantAffiliateLinks(botResponse);
      
      let finalResponse = botResponse;
      if (relevantLinks.length > 0) {
        finalResponse += "\n\nRelevant product links:\n" + 
          relevantLinks.map(link => `- ${link.product_name}: ${link.affiliate_link}`).join('\n');
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: finalResponse },
      ]);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-lg ${
                  message.role === "user"
                    ? "bg-accent text-white"
                    : "bg-muted text-primary"
                }`}
              >
                {message.content.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] px-4 py-2 rounded-lg bg-muted text-primary">
                Thinking...
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-accent hover:bg-accent-light transition-colors duration-200"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
