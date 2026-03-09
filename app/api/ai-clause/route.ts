import OpenAI from "openai"

export async function POST(req: Request) {
  const { prompt } = await req.json()

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a legal assistant that writes professional contract clauses.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  })

  return Response.json({
    text: response.choices[0].message.content,
  })
}
