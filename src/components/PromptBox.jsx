import { useState } from "react";
import ExamplePrompts from "./ExamplePrompts";

function PromptBox() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!prompt.trim()) {
      return;
    }

    try {
      setLoading(true);
      setResponse("");

      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: prompt,
        }),
      });

      const data = await res.json();

      setResponse(data.answer);
    } catch (error) {
      console.error(error);
      setResponse("Something went wrong while generating the answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prompt-section">
      <div className="prompt-box">
        <h3>Ask About Your Paper</h3>

        <p>
          Ask questions and get insights from your research paper.
        </p>

        <form onSubmit={handleSubmit}>
          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Ask something about your research paper..."
            rows="4"
          />

          <button type="submit" disabled={loading}>
            {loading ? "Generating..." : "Ask AI"}
          </button>
        </form>

        {response && (
          <div className="ai-response">
            <h4>AI Response</h4>
            <p>{response}</p>
          </div>
        )}
      </div>

      <ExamplePrompts
        onPromptSelect={(selectedPrompt) => setPrompt(selectedPrompt)}
      />
    </div>
  );
}

export default PromptBox;