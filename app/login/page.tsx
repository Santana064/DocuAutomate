"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email) return;

    setLoading(true);

    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + "/auth/callback",
      },
    });

    setSent(true);
    setLoading(false);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: 360 }}>
        <h1 style={{ fontSize: 24, marginBottom: 20 }}>Login</h1>

        {sent ? (
          <p>Check your email for login link.</p>
        ) : (
          <>
            <input
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 8,
                border: "1px solid #333",
                marginBottom: 10,
              }}
            />

            <button
              onClick={login}
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              {loading ? "Sending..." : "Login"}
            </button>
          </>
        )}
      </div>
    </main>
  );
}
