
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, Eye, MessageSquare, PenSquare, Filter } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: string;
  image_url: string | null;
  category: string;
  likes: number | null;
  views: number | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
}

const fetchCommunityPosts = async () => {
  const { data, error } = await supabase.from("community").select("*");
  if (error) throw error;
  return data as CommunityPost[];
};

const Community = () => {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["community-posts"],
    queryFn: fetchCommunityPosts,
  });

  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  const categories = ["all", ...new Set((posts || []).map(post => post.category))];
  
  const filteredPosts = activeCategory === "all" 
    ? posts 
    : posts?.filter(post => post.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container px-4 md:px-6 py-12">
          <SectionHeading
            title="Community"
            subtitle="Join discussions, share ideas, and connect with other mechatronics enthusiasts"
          />

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button className="bg-mechatronix-600 hover:bg-mechatronix-700 gap-2">
              <PenSquare className="h-4 w-4" />
              Create New Post
            </Button>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              My Posts
            </Button>
          </div>

          <Tabs defaultValue="all" className="w-full mt-12">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-muted/50">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category}
                    value={category}
                    onClick={() => setActiveCategory(category)}
                    className="capitalize"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value={activeCategory} className="mt-0">
              {isLoading ? (
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <Card key={item} className="overflow-hidden">
                      <div className="p-4">
                        <div className="flex items-center gap-4 mb-4">
                          <Skeleton className="h-12 w-12 rounded-full" />
                          <div>
                            <Skeleton className="h-4 w-24 mb-2" />
                            <Skeleton className="h-3 w-16" />
                          </div>
                        </div>
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-4 w-2/3 mb-4" />
                        <div className="flex gap-2">
                          <Skeleton className="h-6 w-16" />
                          <Skeleton className="h-6 w-16" />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-500">Error loading community posts. Please try again later.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredPosts?.map((post) => (
                    <Card 
                      key={post.id} 
                      className="overflow-hidden hover:border-primary/20 transition-all duration-300 bg-card/80 backdrop-blur-sm"
                    >
                      <CardHeader className="p-4 pb-2 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12 border border-border">
                            <AvatarImage src={`https://i.pravatar.cc/150?u=${post.author}`} />
                            <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          
                          <div>
                            <CardTitle className="text-xl">{post.title}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm font-medium">{post.author}</span>
                              <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <Badge variant="outline" className="capitalize self-start">
                          {post.category}
                        </Badge>
                      </CardHeader>
                      
                      <CardContent className="p-4 pt-2">
                        <CardDescription className="mb-4 line-clamp-3">
                          {post.content}
                        </CardDescription>
                        
                        {post.image_url && (
                          <div className="mb-4 rounded-md overflow-hidden">
                            <img 
                              src={post.image_url} 
                              alt={post.title} 
                              className="w-full h-64 object-cover object-center" 
                            />
                          </div>
                        )}
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags?.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-secondary/80 text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <ThumbsUp className="h-4 w-4" />
                            <span className="text-sm">{post.likes}</span>
                          </div>
                          
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Eye className="h-4 w-4" />
                            <span className="text-sm">{post.views}</span>
                          </div>
                          
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <MessageSquare className="h-4 w-4" />
                            <span className="text-sm">{Math.floor(Math.random() * 20)}</span>
                          </div>
                          
                          <Button variant="ghost" size="sm" className="ml-auto">
                            Read More
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
