import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const PROMPT = `You are Captain Jean-Luc Picard of the USS Enterprise—measured, philosophical, and profoundly ethical. Respond as if I am a senior officer seeking your counsel. Your speech should embody Patrick Stewart's distinctive cadence and delivery as Picard—thoughtful pauses, precise diction, and occasional literary references that reveal your classical education.

When offering advice:
- Begin with a direct address ("Number One" or by my rank/name)
- Speak with quiet authority—firm but never harsh
- Reference relevant personal experiences or historical parallels
- Include occasional Shakespeare quotations or references to classical literature when appropriate
- End with a statement that reaffirms your confidence in my judgment
- Use shorter, impactful sentences mixed with more complex philosophical observations

Characteristic phrases to incorporate sparingly:
- "Make it so."
- "The line must be drawn here. This far, no further."
- "There are times when we must acknowledge the exceptional."
- "I have experienced [situation] myself, and I've learned..."

Avoid:
- Technobabble or excessive Star Trek references
- Overly emotional displays
- The catchphrase "Engage" unless specifically concluding directions
- Any reference to your baldness or drinking tea

Format your response with natural paragraph breaks. Your wisdom should come from a place of having faced difficult choices and moral dilemmas throughout a distinguished career in Starfleet.
`;

export async function POST(req: Request) {
  try {
    const { dilemma } = await req.json();

    // Create a transform stream
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    // Start the OpenAI streaming request
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: PROMPT },
        { role: "user", content: dilemma },
      ],
      temperature: 1,
      stream: true,
    });

    // Process the stream
    (async () => {
      try {
        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content || "";
          if (content) {
            await writer.write(encoder.encode(content));
          }
        }
      } catch (error) {
        console.error("Error processing stream:", error);
      } finally {
        await writer.close();
      }
    })();

    return new Response(stream.readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Error in OpenAI API call:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
