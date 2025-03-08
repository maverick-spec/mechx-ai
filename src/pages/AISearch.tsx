
import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Bot, User, Send, RotateCw, ChevronRight, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const AISearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [query, setQuery] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialQuery, setInitialQuery] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Extract query from URL params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryParam = searchParams.get("query");
    
    if (queryParam) {
      setInitialQuery(queryParam);
      setQuery(queryParam);
      handleSubmit(queryParam);
    }
  }, [location.search]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Save search query to Supabase
  const saveSearchQuery = async (queryText: string) => {
    try {
      // Using RPC to call the function we created
      const { error } = await supabase.rpc('save_search_query', { 
        query_text: queryText 
      });
      
      if (error) {
        console.error("Error saving search query:", error);
      }
    } catch (error) {
      console.error("Error saving search query:", error);
    }
  };

  const handleSubmit = async (userQuery: string = query) => {
    if (!userQuery.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = {
      role: "user",
      content: userQuery,
      timestamp: new Date()
    };
    
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setLoading(true);
    setQuery("");
    
    // Save the search query to Supabase
    await saveSearchQuery(userQuery);
    
    try {
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('ai-search', {
        body: { query: userQuery }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      const aiResponse: Message = {
        role: "assistant",
        content: data.text,
        timestamp: new Date()
      };
      
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
      setLoading(false);
      
      // Focus the input after response is received
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      
    } catch (error) {
      console.error("Error getting AI response:", error);
      setLoading(false);
      
      // Fallback response in case of error
      const fallbackResponse: Message = {
        role: "assistant",
        content: "I'm sorry, I couldn't process your request at the moment. Please try again later.",
        timestamp: new Date()
      };
      
      setMessages((prevMessages) => [...prevMessages, fallbackResponse]);
      
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container px-4 max-w-5xl mx-auto py-8">
          <Button 
            variant="ghost" 
            onClick={goBack} 
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">AI Project Search</h1>
            <p className="text-muted-foreground">
              Ask about mechatronics projects and get personalized recommendations
            </p>
          </div>
          
          {/* Chat container */}
          <Card className="mb-6 rounded-lg border overflow-hidden">
            <div className="flex flex-col h-[60vh]">
              {/* Messages area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <Bot className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">How can I help you find projects?</h3>
                    <p className="text-muted-foreground max-w-md">
                      Describe your interests, components you have, or skills you want to learn.
                      I'll recommend suitable mechatronics projects.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6 w-full max-w-lg">
                      <Button 
                        variant="outline" 
                        className="justify-start text-left h-auto py-3"
                        onClick={() => handleSubmit("Arduino projects for beginners")}
                      >
                        <ChevronRight className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate">Arduino projects for beginners</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="justify-start text-left h-auto py-3"
                        onClick={() => handleSubmit("Projects using Raspberry Pi and sensors")}
                      >
                        <ChevronRight className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate">Projects using Raspberry Pi and sensors</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="justify-start text-left h-auto py-3"
                        onClick={() => handleSubmit("Robotics projects with computer vision")}
                      >
                        <ChevronRight className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate">Robotics projects with computer vision</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="justify-start text-left h-auto py-3"
                        onClick={() => handleSubmit("IoT projects for smart home")}
                      >
                        <ChevronRight className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate">IoT projects for smart home</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div 
                        className={`flex gap-3 max-w-[80%] ${
                          message.role === "user" ? "flex-row-reverse" : ""
                        }`}
                      >
                        <Avatar className={`h-8 w-8 ${
                          message.role === "assistant" 
                            ? "bg-mechatronix-600 ring-2 ring-mechatronix-400 ring-offset-2 ring-offset-background" 
                            : "bg-primary ring-2 ring-primary-foreground/30 ring-offset-2 ring-offset-background"
                        }`}>
                          {message.role === "assistant" ? (
                            <Bot className="h-4 w-4 text-white" />
                          ) : (
                            <User className="h-4 w-4 text-white" />
                          )}
                        </Avatar>
                        
                        <div 
                          className={`rounded-lg px-4 py-3 whitespace-pre-wrap ${
                            message.role === "assistant" 
                              ? "bg-muted" 
                              : "bg-primary text-primary-foreground"
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                
                {loading && (
                  <div className="flex justify-start">
                    <div className="flex gap-3 max-w-[80%]">
                      <Avatar className="h-8 w-8 bg-mechatronix-600 ring-2 ring-mechatronix-400 ring-offset-2 ring-offset-background">
                        <Bot className="h-4 w-4 text-white" />
                      </Avatar>
                      <div className="rounded-lg px-4 py-3 bg-muted flex items-center">
                        <RotateCw className="h-4 w-4 animate-spin mr-2" />
                        Searching for projects...
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              {/* Input area */}
              <div className="border-t p-4">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                  className="flex items-end gap-2"
                >
                  <Textarea
                    ref={inputRef}
                    placeholder="Describe the project you're looking for..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="resize-none min-h-[60px]"
                    disabled={loading}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    className="h-10 w-10 rounded-full"
                    disabled={!query.trim() || loading}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AISearch;
