import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function createTemplate(formData: FormData) {
  'use server'

  const name = formData.get('name') as string
  const content = formData.get('content') as string

  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return

  const { data: org } = await supabase
    .from('organizations')
    .select('*')
    .eq('user_id', user.id)
    .single()

const { data, error } = await supabase
  .from("templates")
  .insert({
    name,
    content,
    organization_id: org.id,
  })

console.log("TEMPLATE INSERT:", data, error)

  redirect('/dashboard/templates')
}

export default function NewTemplatePage() {
  return (
    <div style={{ padding: 30 }}>

      <h1>Create Template</h1>

      <form action={createTemplate} style={{ marginTop: 20 }}>

        <div style={{ marginBottom: 20 }}>

          <div>Template Name</div>

          <input
            type="text"
            name="name"
            required
            style={{
              width: 400,
              padding: 8,
              marginTop: 5,
              background: "#111",
              border: "1px solid #444",
              color: "white"
            }}
          />

        </div>

        <div style={{ marginBottom: 20 }}>

          <div>Template content with {"{{variables}}"}</div>

          <textarea
            name="content"
            rows={12}
            style={{
              width: 600,
              padding: 10,
              marginTop: 5,
              background: "#111",
              border: "1px solid #444",
              color: "white"
            }}
          />

        </div>

        <button
          type="submit"
          style={{
            padding: "10px 18px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: 6
          }}
        >
          Save Template
        </button>

      </form>

    </div>
  )
}
