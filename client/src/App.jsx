import { useState, useEffect } from "react";
import "./App.css";

const API_BASE = "http://localhost:4000/api";

/**
 * ================= PRESENTATION LAYER (View) =================
 * Pure UI: renders the knowledge base and chat history, takes the
 * user's question, and calls the Application layer's REST API.
 * Contains no business logic of its own - it just displays what the
 * server returns and re-fetches after every action.
 * ================================================================
 */
function App() {
  const [question, setQuestion] = useState("");
  const [history, setHistory] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchHistory() {
    const res = await fetch(`${API_BASE}/history`);
    const data = await res.json();
    setHistory(data.history);
    setLoading(false);
  }

  async function fetchDocuments() {
    const res = await fetch(`${API_BASE}/documents`);
    const data = await res.json();
    setDocuments(data.documents);
  }

  useEffect(() => {
    fetchDocuments();
    fetchHistory();
  }, []);

  async function handleAsk(e) {
    e.preventDefault();
    setError("");
    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }
    const res = await fetch(`${API_BASE}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Something went wrong.");
      return;
    }
    setQuestion("");
    fetchHistory();
  }

  return (
    <div className="app">
      <h1>Campus Knowledge</h1>
      <p className="subtitle">MVC demo — Presentation layer (React)</p>

      <section className="card">
        <h2>Ask a Question</h2>
        <form onSubmit={handleAsk}>
          <input
            type="text"
            placeholder="e.g. What is the last date for exam registration?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button type="submit">Ask</button>
        </form>
        {error && <p className="error">{error}</p>}
      </section>

      <section className="card">
        <h2>Knowledge Base ({documents.length} documents)</h2>
        <ul>
          {documents.map((d) => (
            <li key={d.id}>
              <strong>{d.category}:</strong> {d.title}
            </li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2>Chat History</h2>
        {loading && <p>Loading...</p>}
        {!loading && history.length === 0 && <p>No questions asked yet.</p>}
        <ul className="history">
          {history.map((h) => (
            <li key={h.id}>
              <p className="question">Q: {h.question}</p>
              <p className="answer">A: {h.answer}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
