"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("/login");
        return;
      }

      setEmail(data.session.user.email ?? null);
    });
  }, [router]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <main style={{ padding: 40 }}>
      <h1 style={{ fontSize: 24 }}>Dashboard</h1>

      <p style={{ marginTop: 10 }}>Logged in as: {email}</p>

      <button
        onClick={logout}
        style={{
          marginTop: 20,
          padding: 10,
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </main>
  );
}