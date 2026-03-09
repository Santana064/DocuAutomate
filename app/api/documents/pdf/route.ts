import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import html_to_pdf from "html-pdf-node"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const { documentId } = await req.json()

    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("id", documentId)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const html = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial;
              padding: 40px;
              line-height: 1.6;
            }
          </style>
        </head>
        <body>
          ${data.content}
        </body>
      </html>
    `

    const file = { content: html }

    const options = {
      format: "A4"
    }

    const pdfBuffer = await html_to_pdf.generatePdf(file, options)

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${data.title}.pdf"`
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    )
  }
}
