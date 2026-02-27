"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const createOrg = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("organizations")
      .insert([{ name: "My First Org" }])
      .select();

    console.log(data, error);
    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <button onClick={createOrg} disabled={loading}>
        {loading ? "Creating..." : "Create organization"}
      </button>
    </div>
  );
}