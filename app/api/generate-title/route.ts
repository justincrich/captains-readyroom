import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to generate a title for the advice
async function generateTitle(
  dilemma: string,
  advice: string,
  isLocutusMode: boolean
) {
  try {
    const titlePrompt = isLocutusMode
      ? `As Locutus of Borg, create a short, concise title (5-7 words) for the following exchange. 
         The title should reflect Borg terminology and the essence of the response in a clinical, emotionless manner.
         
         Query: ${dilemma.substring(0, 100)}${dilemma.length > 100 ? "..." : ""}
         
         Response: ${advice.substring(0, 300)}${
          advice.length > 300 ? "..." : ""
        }`
      : `As Captain Picard, create a short, memorable title (5-7 words) for the following exchange.
         The title should be eloquent and capture the essence of the advice, possibly referencing literature, philosophy, or a core Starfleet value.
         
         Dilemma: ${dilemma.substring(0, 100)}${
          dilemma.length > 100 ? "..." : ""
        }
         
         Advice: ${advice.substring(0, 300)}${
          advice.length > 300 ? "..." : ""
        }`;

    const completion = await openai.chat.completions.create({
      model: "gpt-5-mini-2025-08-07",
      messages: [
        {
          role: "system",
          content:
            "You create concise, meaningful titles that capture the essence of conversations.",
        },
        { role: "user", content: titlePrompt },
      ],
      temperature: 0.7,
      max_tokens: 30,
    });

    return (
      completion.choices[0].message.content?.trim() || "Untitled Log Entry"
    );
  } catch (error) {
    console.error("Error generating title:", error);
    return isLocutusMode
      ? "Collective Analysis Protocol"
      : "Captain's Log Entry";
  }
}

// Generate a stardate based on current date
function generateStardate() {
  const now = new Date();
  const year = now.getFullYear();
  // Generate a random 4-digit decimal for the stardate
  const decimal = Math.floor(Math.random() * 9000 + 1000);
  return `${year.toString().slice(2)}.${decimal}`;
}

export async function POST(req: Request) {
  try {
    const { dilemma, advice, isLocutusMode } = await req.json();
    const title = await generateTitle(dilemma, advice, isLocutusMode);
    const stardate = generateStardate();

    return new Response(
      JSON.stringify({
        title,
        stardate,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error generating title:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to generate title",
        title: "Untitled Log Entry",
        stardate: generateStardate(),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
