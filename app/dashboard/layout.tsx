"use client";

import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 220,
          padding: 20,
          borderRight: "1px solid #222",
        }}
      >
        <h2 style={{ marginBottom: 20 }}>DocuAutomate</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/organizations">Organizations</Link>
          <Link href="/dashboard/documents">Documents</Link>
        </nav>
      </aside>

      {/* Content */}
      <div style={{ flex: 1, padding: 30 }}>{children}</div>
    </div>
  );
}