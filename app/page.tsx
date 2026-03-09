export default function Home() {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>DocuAutomate</h1>

      <p>Welcome to DocuAutomate.</p>

      <div style={{ marginTop: "20px" }}>
        <a href="/login">Login</a>
      </div>

      <div style={{ marginTop: "10px" }}>
        <a href="/dashboard">Go to Dashboard</a>
      </div>
    </main>
  )
}
