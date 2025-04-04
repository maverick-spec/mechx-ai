
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ProjectIdeaForm = ({ onClose }: { onClose?: () => void }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: '',
    skills: '',
    teamSize: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, field: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create an array of skills from the comma-separated string
      const skillsArray = formData.skills.split(',').map(skill => skill.trim()).filter(Boolean);
      
      // Insert the project idea into the team_up table
      const { data, error } = await supabase
        .from('team_up')
        .insert({
          title: formData.title,
          description: formData.description,
          difficulty: formData.difficulty || 'beginner',
          open_positions: parseInt(formData.teamSize) || 1,
          team_size: parseInt(formData.teamSize) || 1,
          skills_required: skillsArray,
          image_url: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2940&auto=format&fit=crop' // Default image
        });
      
      if (error) throw error;
      
      setIsSuccess(true);
      toast({
        title: "Project Idea Submitted!",
        description: "Thank you for sharing your project idea. We'll help you find team members soon.",
      });
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          title: '',
          description: '',
          category: '',
          difficulty: '',
          skills: '',
          teamSize: ''
        });
        setIsSuccess(false);
        if (onClose) onClose();
      }, 2000);
      
    } catch (error) {
      console.error("Error submitting project idea:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your project idea. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Submit Project Idea</CardTitle>
        <CardDescription>
          Share your project idea and find team members with the right skills
        </CardDescription>
      </CardHeader>
      
      {isSuccess ? (
        <CardContent className="flex flex-col items-center justify-center py-10">
          <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
          <h3 className="text-xl font-medium mb-2">Submission Received!</h3>
          <p className="text-center text-muted-foreground">
            Thanks for sharing your project idea. We'll help you find team members soon.
          </p>
        </CardContent>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input 
                id="title" 
                name="title" 
                placeholder="e.g., Autonomous Drone Navigation System" 
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Project Description</Label>
              <Textarea 
                id="description" 
                name="description"
                placeholder="Describe your project idea, goals, and what problem it solves..." 
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select 
                onValueChange={(value) => handleSelectChange(value, 'difficulty')}
                value={formData.difficulty}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="skills">Required Skills</Label>
              <Input 
                id="skills" 
                name="skills" 
                placeholder="Arduino, Computer Vision, 3D Printing (comma separated)" 
                value={formData.skills}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="teamSize">Team Size</Label>
              <Input 
                id="teamSize" 
                name="teamSize" 
                type="number" 
                min="1" 
                placeholder="How many team members do you need?" 
                value={formData.teamSize}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            {onClose && (
              <Button variant="outline" onClick={onClose} type="button">
                Cancel
              </Button>
            )}
            <Button 
              type="submit" 
              className="bg-mechatronix-600 hover:bg-mechatronix-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Project Idea"}
            </Button>
          </CardFooter>
        </form>
      )}
    </Card>
  );
};

export default ProjectIdeaForm;
