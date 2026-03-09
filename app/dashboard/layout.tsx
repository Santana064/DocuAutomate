import Link from "next/link"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ display: "flex" }}>

      <div
        style={{
          width: "200px",
          borderRight: "1px solid #333",
          padding: "20px",
        }}
      >
        <h3>DocuAutomate</h3>

        <div style={{ marginTop: "20px" }}>
          <div>
            <Link href="/dashboard">Dashboard</Link>
          </div>

          <div style={{ marginTop: "10px" }}>
            <Link href="/dashboard/organizations">Organizations</Link>
          </div>

          <div style={{ marginTop: "10px" }}>
            <Link href="/dashboard/documents">Documents</Link>
          </div>

          <div style={{ marginTop: "10px" }}>
            <Link href="/dashboard/templates">Templates</Link>
          </div>
        </div>
      </div>

      <div style={{ padding: "20px", flex: 1 }}>{children}</div>

    </div>
  )
}
