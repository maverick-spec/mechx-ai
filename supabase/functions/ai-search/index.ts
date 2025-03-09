
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") || "";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();

    if (!query?.trim()) {
      return new Response(
        JSON.stringify({ error: "Query is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!OPENAI_API_KEY) {
      console.error("OpenAI API key is not configured");
      return new Response(
        JSON.stringify({ 
          error: "OpenAI API key is not configured",
          text: "The OpenAI API key is not configured. Please add it to your Supabase project's secrets with the name OPENAI_API_KEY."
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Call OpenAI API with the query
    try {
      console.log("Calling OpenAI API with query:", query);
      
      const openAIResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are a helpful and knowledgeable AI assistant. Answer questions directly, accurately, and conversationally. If you don't know something, admit it honestly. Your responses should be engaging, informative, and friendly."
            },
            {
              role: "user",
              content: query
            }
          ],
          temperature: 0.7,
          max_tokens: 800,
        }),
      });

      // Check if the API request was successful
      if (!openAIResponse.ok) {
        const errorData = await openAIResponse.json();
        console.error("OpenAI API error details:", JSON.stringify(errorData));
        throw new Error(errorData.error?.message || "Error calling OpenAI API");
      }

      const data = await openAIResponse.json();
      console.log("OpenAI API response status:", openAIResponse.status);
      
      const responseText = data.choices[0]?.message?.content || "";
      console.log("Successfully got response from OpenAI");

      return new Response(
        JSON.stringify({ text: responseText }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("OpenAI API Error:", error);
      
      // Return a more specific error message
      return new Response(
        JSON.stringify({ 
          text: "I'm experiencing technical difficulties with my AI service. Please try again in a moment. Error: " + error.message 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("General error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
