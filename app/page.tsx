"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  useEffect(() => {
    supabase.from("test").select("*").then(console.log);
  }, []);

  return (
    <div style={{ padding: 40 }}>
      Supabase connected ✅
    </div>
  );
}