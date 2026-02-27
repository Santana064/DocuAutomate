"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [name, setName] = useState("");
  const [orgs, setOrgs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadOrgs = async () => {
    const { data } = await supabase.from("organizations").select("*").order("id", { ascending: false });
    setOrgs(data || []);
  };

  useEffect(() => {
    loadOrgs();
  }, []);

  const createOrg = async () => {
    if (!name) return;

    setLoading(true);

    await supabase.from("organizations").insert([{ name }]);

    setName("");
    await loadOrgs();
    setLoading(false);

    const router = useRouter();

useEffect(() => {
  supabase.auth.getSession().then(({ data }) => {
    if (!data.session) router.push("/login");
  });
}, []);
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