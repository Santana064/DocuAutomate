"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [orgs, setOrgs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔐 Auth guard
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.push("/login");
    });
  }, [router]);

  // Load orgs
  const loadOrgs = async () => {
    const { data } = await supabase
      .from("organizations")
      .select("*")
      .order("id", { ascending: false });

    setOrgs(data || []);
  };

  useEffect(() => {
    loadOrgs();
  }, []);

  // Create org with ownership
  const createOrg = async () => {
    if (!name) return;

    setLoading(true);

    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData.session?.user;

    if (!user) {
      router.push("/login");
      return;
    }

    await supabase.from("organizations").insert([
      {
        name,
        owner_id: user.id,
      },
    ]);

    setName("");
    await loadOrgs();
    setLoading(false);
  };

  return (
    <main style={{ padding: 40, maxWidth: 600 }}>
      <h1 style={{ fontSize: 24, marginBottom: 20 }}>DocuAutomate</h1>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          placeholder="Organization name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={createOrg}
          style={{
            padding: 10,
            borderRadius: 8,
            background: "white",
            color: "black",
            cursor: "pointer",
          }}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>

      <div style={{ marginTop: 30 }}>
        {orgs.map((o) => (
          <div key={o.id} style={{ padding: 10, borderBottom: "1px solid #222" }}>
            {o.name}
          </div>
        ))}
      </div>
    </main>
  );
}