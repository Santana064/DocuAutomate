"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const finishLogin = async () => {
      await supabase.auth.getSession();
      router.replace("/");
    };

    finishLogin();
  }, [router]);

  return (
    <main style={{ padding: 40 }}>
      Finishing login...
    </main>
  );
}