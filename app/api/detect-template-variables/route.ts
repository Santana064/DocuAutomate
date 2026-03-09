import { NextResponse } from "next/server"

export async function POST(req: Request) {

  const { template } = await req.json()

  const regex = /\{\{(.*?)\}\}/g

  const variables: string[] = []

  let match

  while ((match = regex.exec(template)) !== null) {
    variables.push(match[1])
  }

  return NextResponse.json({
    variables
  })
}
