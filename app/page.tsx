"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const createOrg = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("organizations")
      .insert([{ name: "My first org" }])
      .select();

    console.log("DATA:", data);
    console.log("ERROR:", error);

    setLoading(false);
  };

  return (
    <main style={{ padding: 40 }}>
      <button
        onClick={createOrg}
        style={{
          padding: 12,
          background: "white",
          color: "black",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        {loading ? "Creating..." : "Create organization"}
      </button>
    </main>
  );
}