
import { useState, useRef, useEffect } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Bot, User, Send, RotateCw, ChevronRight, 
  ArrowLeft, AlertTriangle, Plus, MessageSquare, 
  Trash2, Clock, Search 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isError?: boolean;
};

type Conversation = {
  id: string;
  title: string;
  timestamp: Date;
  lastMessage?: string;
};

const AISearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [query, setQuery] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialQuery, setInitialQuery] = useState<string>("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Load conversations from local storage on component mount
  useEffect(() => {
    const loadConversations = async () => {
      try {
        const { data, error } = await supabase
          .from('conversations')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error("Error loading conversations:", error);
          return;
        }

        if (data) {
          setConversations(data.map(conv => ({
            id: conv.id,
            title: conv.title || 'New Conversation',
            timestamp: new Date(conv.created_at),
            lastMessage: conv.last_message
          })));
        }
      } catch (error) {
        console.error("Error loading conversations:", error);
      }
    };

    loadConversations();
  }, []);

  // Handle URL query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryParam = searchParams.get("query");
    const conversationId = searchParams.get("conversation");
    
    if (conversationId) {
      setCurrentConversationId(conversationId);
      loadConversationMessages(conversationId);
    } else if (queryParam) {
      setInitialQuery(queryParam);
      setQuery(queryParam);
      handleSubmit(queryParam);
    }
    
    window.scrollTo(0, 0);
  }, [location.search]);

  const loadConversationMessages = async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from('conversation_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('timestamp', { ascending: true });

      if (error) {
        console.error("Error loading conversation messages:", error);
        return;
      }

      if (data) {
        setMessages(data.map(msg => ({
          role: msg.role as "user" | "assistant",
          content: msg.content,
          timestamp: new Date(msg.timestamp),
          isError: false
        })));
      }
    } catch (error) {
      console.error("Error loading conversation messages:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const createNewConversation = async () => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .insert([{ 
          title: 'New Conversation',
          last_message: ''
        }])
        .select();

      if (error) {
        console.error("Error creating conversation:", error);
        return null;
      }

      if (data && data.length > 0) {
        const newConversation = {
          id: data[0].id,
          title: 'New Conversation',
          timestamp: new Date(),
          lastMessage: ''
        };
        
        setConversations(prev => [newConversation, ...prev]);
        setCurrentConversationId(newConversation.id);
        setMessages([]);
        return newConversation.id;
      }
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
    return null;
  };

  const updateConversationTitle = async (conversationId: string, userMessage: string) => {
    // Generate a title based on the first user message (truncate if too long)
    const title = userMessage.length > 30 
      ? userMessage.substring(0, 30) + '...' 
      : userMessage;
    
    try {
      await supabase
        .from('conversations')
        .update({ 
          title,
          last_message: userMessage
        })
        .eq('id', conversationId);

      // Update the local state
      setConversations(prev => 
        prev.map(conv => 
          conv.id === conversationId 
            ? { ...conv, title, lastMessage: userMessage }
            : conv
        )
      );
    } catch (error) {
      console.error("Error updating conversation title:", error);
    }
  };

  const handleSubmit = async (userQuery: string = query) => {
    if (!userQuery.trim()) return;
    
    // If we don't have a conversation yet, create one
    let conversationId = currentConversationId;
    if (!conversationId) {
      conversationId = await createNewConversation();
      if (!conversationId) {
        toast({
          title: "Error",
          description: "Failed to create a new conversation. Please try again.",
          variant: "destructive"
        });
        return;
      }
    }
    
    const userMessage: Message = {
      role: "user",
      content: userQuery,
      timestamp: new Date()
    };
    
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setLoading(true);
    setQuery("");
    
    // If this is the first message, update the conversation title
    if (messages.length === 0) {
      updateConversationTitle(conversationId, userQuery);
    } else {
      // Just update the last message
      try {
        await supabase
          .from('conversations')
          .update({ 
            last_message: userQuery
          })
          .eq('id', conversationId);
      } catch (error) {
        console.error("Error updating last message:", error);
      }
    }
    
    // Store the user message in the database
    try {
      await supabase
        .from('conversation_messages')
        .insert([{ 
          conversation_id: conversationId,
          role: 'user',
          content: userQuery,
          timestamp: new Date().toISOString()
        }]);
    } catch (error) {
      console.error("Error saving user message:", error);
    }
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-search', {
        body: { 
          query: userQuery,
          conversationId
        }
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
      
      // Store the AI response in the database
      try {
        await supabase
          .from('conversation_messages')
          .insert([{ 
            conversation_id: conversationId,
            role: 'assistant',
            content: data.text,
            timestamp: new Date().toISOString()
          }]);
      } catch (error) {
        console.error("Error saving AI response:", error);
      }
      
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

  const handleNewChat = async () => {
    const newId = await createNewConversation();
    if (newId) {
      navigate(`/ai-search?conversation=${newId}`);
    }
  };

  const handleSelectConversation = (id: string) => {
    navigate(`/ai-search?conversation=${id}`);
  };

  const handleDeleteConversation = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    try {
      // First delete all messages in the conversation
      await supabase
        .from('conversation_messages')
        .delete()
        .eq('conversation_id', id);
        
      // Then delete the conversation itself
      await supabase
        .from('conversations')
        .delete()
        .eq('id', id);
      
      // Update local state
      setConversations(prev => prev.filter(conv => conv.id !== id));
      
      // If we deleted the current conversation, create a new one
      if (id === currentConversationId) {
        handleNewChat();
      }
      
      toast({
        description: "Conversation deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting conversation:", error);
      toast({
        title: "Error",
        description: "Failed to delete conversation",
        variant: "destructive"
      });
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredConversations = conversations.filter(conv => 
    conv.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const goBack = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex">
        {/* Conversation Sidebar */}
        <div className={`border-r ${isSidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 flex flex-col bg-background h-[calc(100vh-4rem)] overflow-hidden`}>
          {isSidebarOpen && (
            <>
              <div className="p-4 border-b">
                <Button 
                  onClick={handleNewChat} 
                  className="w-full bg-mechatronix-600 hover:bg-mechatronix-700 flex items-center justify-center gap-2"
                >
                  <Plus size={16} />
                  New Chat
                </Button>
              </div>
              
              <div className="p-3 border-b">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              
              <ScrollArea className="flex-1 px-2 py-2">
                {filteredConversations.length === 0 ? (
                  <div className="text-center text-muted-foreground p-4">
                    No conversations yet
                  </div>
                ) : (
                  filteredConversations.map((conv) => (
                    <div 
                      key={conv.id}
                      onClick={() => handleSelectConversation(conv.id)}
                      className={`p-3 rounded-md mb-1 hover:bg-muted cursor-pointer flex items-start gap-3 group ${
                        currentConversationId === conv.id ? 'bg-muted' : ''
                      }`}
                    >
                      <MessageSquare size={18} className="mt-0.5 flex-shrink-0 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-1">
                          <p className="font-medium truncate">{conv.title}</p>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => handleDeleteConversation(conv.id, e)}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-xs text-muted-foreground truncate max-w-[70%]">
                            {conv.lastMessage || 'No messages yet'}
                          </p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock size={12} className="mr-1" />
                            {formatDate(conv.timestamp)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </ScrollArea>
            </>
          )}
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col h-[calc(100vh-4rem)]">
          <div className="p-4 border-b flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <svg 
                width="15" 
                height="15" 
                viewBox="0 0 15 15" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1.5 7C1.22386 7 1 7.22386 1 7.5C1 7.77614 1.22386 8 1.5 8H13.5C13.7761 8 14 7.77614 14 7.5C14 7.22386 13.7761 7 13.5 7H1.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
            </Button>
            
            <h1 className="text-lg font-medium flex-1 truncate">MechX AI Assistant</h1>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={goBack} 
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
          
          <div 
            ref={chatContainerRef} 
            className="flex-1 overflow-y-auto p-4 space-y-6"
          >
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <Bot className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">How can I help you today?</h3>
                <p className="text-muted-foreground max-w-md">
                  Ask me anything about MechX AI, engineering projects, robotics, electronics, or mechatronics!
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6 w-full max-w-lg">
                  <Button 
                    variant="outline" 
                    className="justify-start text-left h-auto py-3"
                    onClick={() => handleSubmit("Tell me about Arduino projects for beginners")}
                  >
                    <ChevronRight className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">Arduino projects for beginners</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start text-left h-auto py-3"
                    onClick={() => handleSubmit("What features does MechX AI offer?")}
                  >
                    <ChevronRight className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">MechX AI features</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start text-left h-auto py-3"
                    onClick={() => handleSubmit("How to get started with Raspberry Pi?")}
                  >
                    <ChevronRight className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">Getting started with Raspberry Pi</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start text-left h-auto py-3"
                    onClick={() => handleSubmit("Explain how ESP32 can be used in IoT projects")}
                  >
                    <ChevronRight className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">ESP32 in IoT projects</span>
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
                className="resize-none min-h-[60px] max-h-[200px]"
                disabled={loading}
              />
              <Button 
                type="submit" 
                size="icon" 
                className="h-10 w-10 rounded-full flex-shrink-0 bg-mechatronix-600 hover:bg-mechatronix-700"
                disabled={!query.trim() || loading}
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AISearch;
