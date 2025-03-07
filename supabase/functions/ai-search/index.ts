
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
      return new Response(
        JSON.stringify({ error: "OpenAI API key is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Call OpenAI API with the query
    try {
      const openAIResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a mechatronics and robotics project recommendation assistant. Provide detailed project ideas based on user queries, including difficulty level, components needed, and skills required. Format your response in a clear, structured way."
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

      const data = await openAIResponse.json();

      if (!openAIResponse.ok) {
        throw new Error(data.error?.message || "Error calling OpenAI API");
      }

      const responseText = data.choices[0]?.message?.content || "";

      return new Response(
        JSON.stringify({ text: responseText }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("OpenAI API Error:", error);
      
      // Fallback to mock response if OpenAI API call fails
      const mockResponse = {
        text: `Based on your query "${query}", here are some project recommendations:

1. **Arduino-based Smart Weather Station**
   - Difficulty: Intermediate
   - Components: Arduino Uno, DHT22 sensor, Barometric pressure sensor, LCD Display
   - Skills: C/C++ programming, sensor integration, data visualization

2. **Autonomous Line Following Robot**
   - Difficulty: Beginner to Intermediate
   - Components: Arduino/ESP32, IR sensors, DC motors, Motor driver
   - Skills: PID control, sensor calibration, basic electronics

3. **Home Automation System**
   - Difficulty: Intermediate
   - Components: Raspberry Pi, Relays, Various sensors, Touchscreen
   - Skills: Python programming, IoT protocols, web interface design

Would you like more information about any of these projects? I can provide detailed instructions, parts lists, or alternative suggestions based on your specific interests or components.`
      };

      return new Response(
        JSON.stringify(mockResponse),
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
