import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import Link from "next/link"

export default async function TemplatesPage() {

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

  const { data: templates } = await supabase
    .from("templates")
    .select("*")

  return (
    <div style={{ padding: 30 }}>

      <h1>Your Templates</h1>

      <Link href="/dashboard/templates/new">
        Create Template
      </Link>

      <div style={{ marginTop: 30 }}>

        {templates?.length === 0 && (
          <div>No templates yet</div>
        )}

        {templates?.map((template) => (
          <Link
            key={template.id}
            href={`/dashboard/templates/${template.id}`}
          >
            <div
              style={{
                padding: 12,
                border: "1px solid #333",
                marginBottom: 10,
                cursor: "pointer"
              }}
            >
              {template.name}
            </div>
          </Link>
        ))}

      </div>

    </div>
  )
}
