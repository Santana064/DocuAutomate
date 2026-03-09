import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

async function createDocumentAction(formData: FormData) {
  'use server'

  const title = formData.get('title') as string

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

  if (!user) redirect('/login')

  const { data: org } = await supabase
    .from('organizations')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!org) redirect('/dashboard')

  await supabase.from('documents').insert({
    title,
    content: '',
    organization_id: org.id,
  })

  revalidatePath('/dashboard')
}

export default async function DashboardPage() {
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

  if (!user) redirect('/login')

  const { data: org } = await supabase
    .from('organizations')
    .select('*')
    .eq('user_id', user.id)
    .single()

  const { data: documents } = await supabase
    .from('documents')
    .select('*')
    .eq('organization_id', org?.id)
    .order('created_at', { ascending: false })

  return (
    <div style={{ padding: '40px' }}>
      <h1>Dashboard</h1>

      <p>Welcome {user.email}</p>

      <div style={{ marginTop: '20px' }}>
        <form action={createDocumentAction}>
          <input
            type="text"
            name="title"
            placeholder="Enter document title"
            required
            style={{
              padding: '10px',
              marginRight: '10px',
              width: '250px',
            }}
          />

          <button type="submit">Create Document</button>
        </form>
      </div>

      <h2 style={{ marginTop: '40px' }}>Your Documents</h2>

      <div style={{ marginTop: '20px' }}>
        {documents?.map((doc) => (
          <div key={doc.id} style={{ marginBottom: '10px' }}>
            <Link href={`/dashboard/documents/${doc.id}`}>
              {doc.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
