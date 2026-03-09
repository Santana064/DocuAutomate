'use client'

import { useState, useEffect } from 'react'
import Editor from './Editor'

export default function EditorWrapper({
  initialContent,
  documentId,
}: {
  initialContent: string
  documentId: string
}) {
  const [content, setContent] = useState(initialContent)
  const [saving, setSaving] = useState(false)
  const [prompt, setPrompt] = useState("")

  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([])

  useEffect(() => {
    const timer = setTimeout(async () => {
      setSaving(true)

      await fetch('/api/save-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: documentId,
          content,
        }),
      })

      setSaving(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [content, documentId])

  async function generateClause() {
    if (!prompt) return

    const userPrompt = prompt
    setPrompt("")

    setMessages(prev => [...prev, { role: "user", text: userPrompt }])

    const res = await fetch('/api/generate-clause', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: userPrompt }),
    })

    const data = await res.json()

    setMessages(prev => [...prev, { role: "ai", text: data.text }])
  }

  function insertIntoDocument(text: string) {
    setContent(prev => prev + "<p>" + text + "</p>")
  }

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Ask AI to generate a clause..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{
            width: "70%",
            padding: "10px",
            marginRight: "10px"
          }}
        />

        <button onClick={generateClause}>
          Generate Clause
        </button>
      </div>

      <div style={{ marginBottom: "30px" }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              marginBottom: "15px"
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                padding: "12px",
                borderRadius: "10px",
                background: msg.role === "user" ? "#2563eb" : "#1f1f1f",
                color: "white"
              }}
            >
              {msg.text}

              {msg.role === "ai" && (
                <div style={{ marginTop: "10px" }}>
                  <button
                    onClick={() => insertIntoDocument(msg.text)}
                    style={{
                      fontSize: "12px",
                      padding: "5px 10px"
                    }}
                  >
                    Insert Into Document
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Editor content={content} onChange={setContent} />

      <div style={{ marginTop: '10px', fontSize: '12px', opacity: 0.7 }}>
        {saving ? 'Saving...' : 'All changes saved'}
      </div>
    </>
  )
}
