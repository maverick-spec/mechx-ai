import { useState, useRef, useEffect } from "react";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Bot, User, Send, RotateCw, ChevronRight, ArrowLeft, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isError?: boolean;
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
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryParam = searchParams.get("query");
    
    if (queryParam) {
      setInitialQuery(queryParam);
      setQuery(queryParam);
      handleSubmit(queryParam);
    }
    
    window.scrollTo(0, 0);
  }, [location.search]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const saveSearchQuery = async (queryText: string) => {
    try {
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
    
    const userMessage: Message = {
      role: "user",
      content: userQuery,
      timestamp: new Date()
    };
    
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setLoading(true);
    setQuery("");
    
    await saveSearchQuery(userQuery);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-search', {
        body: { query: userQuery }
      });
      
      if (error) {
        console.error("Edge function error:", error);
        throw new Error(error.message);
      }
      
      if (!data || !data.text) {
        console.error("Invalid response from edge function:", data);
        throw new Error("Invalid response from AI service");
      }
      
      const aiResponse: Message = {
        role: "assistant",
        content: data.text,
        timestamp: new Date(),
        isError: data.text.includes("quota has been exceeded") || data.text.includes("technical difficulties")
      };
      
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
      setLoading(false);
      
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      
    } catch (error) {
      console.error("Error getting AI response:", error);
      setLoading(false);
      
      const fallbackResponse: Message = {
        role: "assistant",
        content: "I'm sorry, I couldn't process your request at the moment. Please try again later.",
        timestamp: new Date(),
        isError: true
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
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="container px-4 max-w-5xl mx-auto py-8">
          <div className="text-center mb-10 mt-8">
            <div className="inline-flex items-center justify-center">
              <h1 className="font-syne font-bold text-3xl">
                <span className="text-mechatronix-600 mr-1">M</span>echX AI
              </h1>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            onClick={goBack} 
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">AI Chat</h1>
            <p className="text-muted-foreground">
              Ask me any question and I'll do my best to help you
            </p>
          </div>
          
          <Card className="mb-6 rounded-lg border overflow-hidden">
            <div className="flex flex-col h-[60vh]">
              <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <Bot className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">How can I help you today?</h3>
                    <p className="text-muted-foreground max-w-md">
                      Ask me anything! I'm an AI assistant that can answer questions on any topic.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6 w-full max-w-lg">
                      <Button 
                        variant="outline" 
                        className="justify-start text-left h-auto py-3"
                        onClick={() => handleSubmit("What is artificial intelligence?")}
                      >
                        <ChevronRight className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate">What is artificial intelligence?</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="justify-start text-left h-auto py-3"
                        onClick={() => handleSubmit("Tell me about mechanical engineering")}
                      >
                        <ChevronRight className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate">Tell me about mechanical engineering</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="justify-start text-left h-auto py-3"
                        onClick={() => handleSubmit("What are the latest trends in robotics?")}
                      >
                        <ChevronRight className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate">What are the latest trends in robotics?</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="justify-start text-left h-auto py-3"
                        onClick={() => handleSubmit("Explain how electric motors work")}
                      >
                        <ChevronRight className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate">Explain how electric motors work</span>
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
                        className={`flex items-start gap-3 max-w-[80%] ${
                          message.role === "user" ? "flex-row-reverse" : ""
                        }`}
                      >
                        <Avatar className={`h-8 w-8 flex-shrink-0 ${
                          message.role === "assistant" 
                            ? "bg-mechatronix-600 ring-2 ring-mechatronix-400 ring-offset-2 ring-offset-background" 
                            : "bg-primary ring-2 ring-primary-foreground/30 ring-offset-2 ring-offset-background"
                        }`}>
                          <div className="flex items-center justify-center w-full h-full">
                            {message.role === "assistant" ? (
                              message.isError ? (
                                <AlertTriangle className="h-4 w-4 text-white" />
                              ) : (
                                <Bot className="h-4 w-4 text-white" />
                              )
                            ) : (
                              <User className="h-4 w-4 text-white" />
                            )}
                          </div>
                        </Avatar>
                        
                        <div 
                          className={`rounded-lg px-4 py-3 whitespace-pre-wrap ${
                            message.role === "assistant" 
                              ? message.isError
                                ? "bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-300"
                                : "bg-muted" 
                              : "bg-primary text-primary-foreground"
                          }`}
                        >
                          {message.content}
                          
                          {message.isError && message.content.includes("quota has been exceeded") && (
                            <div className="mt-2 text-sm">
                              <a 
                                href="https://platform.openai.com/signup" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center"
                              >
                                Get a new OpenAI API key
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                </svg>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                
                {loading && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-3 max-w-[80%]">
                      <Avatar className="h-8 w-8 flex-shrink-0 bg-mechatronix-600 ring-2 ring-mechatronix-400 ring-offset-2 ring-offset-background">
                        <div className="flex items-center justify-center w-full h-full">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                      </Avatar>
                      <div className="rounded-lg px-4 py-3 bg-muted flex items-center">
                        <RotateCw className="h-4 w-4 animate-spin mr-2" />
                        Thinking...
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
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
                    placeholder="Ask me anything..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="resize-none min-h-[60px]"
                    disabled={loading}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    className="h-10 w-10 rounded-full flex-shrink-0"
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
