"use client"

import { supabase } from "@/lib/supabase"

export default function DebugGenerate() {

  async function testAuth() {
    console.log("Testing Supabase auth...")

    const { data, error } = await supabase.auth.getUser()

    console.log("Auth result:", data, error)

    if (!data?.user) {
      alert("User NOT logged in")
      return
    }

    alert("User logged in: " + data.user.email)
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Supabase Auth Debug</h1>
      <button onClick={testAuth}>Test Login Session</button>
    </div>
  )
}