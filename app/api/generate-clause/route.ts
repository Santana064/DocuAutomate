import Groq from "groq-sdk"

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    })

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
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
      text: completion.choices[0].message.content,
    })
  } catch (error) {
    console.error(error)

    return Response.json(
      { text: "AI generation failed. Please try again." },
      { status: 500 }
    )
  }
}
