
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const DEEPSEEK_API_KEY = Deno.env.get("DEEPSEEK_API_KEY") || "";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, conversationId } = await req.json();

    if (!query?.trim()) {
      return new Response(
        JSON.stringify({ error: "Query is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!DEEPSEEK_API_KEY) {
      console.error("DeepSeek API key is not configured");
      return new Response(
        JSON.stringify({ 
          error: "DeepSeek API key is not configured",
          text: "The DeepSeek API key is not configured. Please add it to your Supabase project's secrets with the name DEEPSEEK_API_KEY."
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Call DeepSeek API with the query
    try {
      console.log("Calling DeepSeek API with query:", query);
      
      const deepseekResponse = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            {
              role: "system",
              content: "You are a helpful and knowledgeable AI assistant for MechX AI, a platform for mechanical engineering, robotics, electronics, and mechatronics. Answer questions about engineering projects, Arduino, ESP32, Raspberry Pi, IoT, and related topics. Also provide information about the MechX AI platform features including projects, community, and team-up functionality. Be engaging, informative, and friendly."
            },
            {
              role: "user",
              content: query
            }
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      // Check if the API request was successful
      if (!deepseekResponse.ok) {
        const errorData = await deepseekResponse.json();
        console.error("DeepSeek API error details:", JSON.stringify(errorData));
        
        // Check specifically for quota exceeded error
        if (errorData.error?.type === "insufficient_quota" || 
            errorData.error?.message?.includes("quota") || 
            errorData.error?.message?.includes("exceeded")) {
          return new Response(
            JSON.stringify({ 
              text: "Sorry, the DeepSeek API quota has been exceeded. This usually happens with free API keys after they've been used for a while. You'll need to either wait for the quota to reset or upgrade to a paid plan." 
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        throw new Error(errorData.error?.message || "Error calling DeepSeek API");
      }

      const data = await deepseekResponse.json();
      console.log("DeepSeek API response status:", deepseekResponse.status);
      
      const responseText = data.choices[0]?.message?.content || "";
      
      // Save conversation to Supabase if conversationId is provided
      if (conversationId) {
        const supabaseClient = createClient(
          Deno.env.get('SUPABASE_URL') ?? '',
          Deno.env.get('SUPABASE_ANON_KEY') ?? '',
          { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
        );

        // Insert the message into the conversation_messages table
        await supabaseClient
          .from('conversation_messages')
          .insert([
            { 
              conversation_id: conversationId,
              role: 'user',
              content: query,
              timestamp: new Date().toISOString()
            },
            {
              conversation_id: conversationId,
              role: 'assistant',
              content: responseText,
              timestamp: new Date().toISOString()
            }
          ]);
      }

      return new Response(
        JSON.stringify({ text: responseText, conversationId }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("DeepSeek API Error:", error);
      
      // Return a more specific error message
      let errorMessage = "I'm experiencing technical difficulties with my AI service. Please try again in a moment.";
      
      // Check if the error message contains quota-related terms
      if (error.message?.includes("quota") || error.message?.includes("exceeded") || error.message?.includes("billing")) {
        errorMessage = "Sorry, the DeepSeek API quota has been exceeded. This usually happens with free API keys. You'll need to either wait for the quota to reset or upgrade to a paid plan.";
      }
      
      return new Response(
        JSON.stringify({ 
          text: errorMessage
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
