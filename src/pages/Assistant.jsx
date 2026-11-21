import { useState } from "react";
import "./Assistant.css";

function Assistant() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [activeMode, setActiveMode] = useState("General");

  const suggestions = [
    {
      icon: "📄",
      title: "Summarize a research paper",
      text: "Give me a structured summary of a research paper.",
    },
    {
      icon: "🔬",
      title: "Explain a methodology",
      text: "Explain the methodology used in a research paper.",
    },
    {
      icon: "💡",
      title: "Find research gaps",
      text: "Identify possible research gaps in this topic.",
    },
    {
      icon: "⚖️",
      title: "Compare concepts",
      text: "Compare two research concepts and explain their differences.",
    },
  ];

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: message.trim(),
      sender: "user",
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  const handleSuggestion = (text) => {
    setMessage(text);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="assistant-page">
      {/* Header */}
      <div className="assistant-header">
        <div className="assistant-header-info">
          <span className="assistant-eyebrow">RESEARCH INTELLIGENCE</span>
          <h1>AI Research Assistant</h1>
          <p>Your intelligent companion for exploring academic research.</p>
        </div>

        <button className="assistant-clear-btn" onClick={clearChat}>
          🗑 Clear conversation
        </button>
      </div>

      {/* Main Assistant Workspace */}
      <div className="assistant-workspace">
        {/* Assistant Top Bar */}
        <div className="assistant-chat-header">
          <div className="assistant-profile">
            <div className="assistant-avatar">✦</div>
            <div>
              <h3>PaperInsight AI</h3>
              <span className="assistant-status">
                <span className="status-dot"></span>
                Research Assistant
              </span>
            </div>
          </div>

          <div className="assistant-mode">
            <label>MODE</label>
            <select
              value={activeMode}
              onChange={(e) => setActiveMode(e.target.value)}
            >
              <option>General</option>
              <option>Paper Analysis</option>
              <option>Research</option>
              <option>Academic Writing</option>
            </select>
          </div>
        </div>

        {/* Chat Area */}
        <div className="assistant-chat-body">
          {messages.length === 0 ? (
            <div className="assistant-welcome">
              <div className="welcome-icon">✦</div>

              <h2>How can I help with your research?</h2>

              <p>
                Explore papers, understand complex concepts, discover research
                gaps, or brainstorm your next idea.
              </p>

              <div className="assistant-suggestions">
                {suggestions.map((item, index) => (
                  <button
                    className="assistant-suggestion-card"
                    key={index}
                    onClick={() => handleSuggestion(item.text)}
                  >
                    <span className="suggestion-icon">{item.icon}</span>
                    <span className="suggestion-content">
                      <strong>{item.title}</strong>
                      <small>{item.text}</small>
                    </span>
                    <span className="suggestion-arrow">↗</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="assistant-messages">
              {messages.map((msg) => (
                <div
                  className={`assistant-message ${msg.sender}`}
                  key={msg.id}
                >
                  {msg.sender === "assistant" && (
                    <div className="message-avatar">✦</div>
                  )}

                  <div className="message-content">
                    <span className="message-sender">
                      {msg.sender === "user" ? "You" : "PaperInsight AI"}
                    </span>
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="assistant-input-area">
          <div className="assistant-input-box">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about research, papers, or concepts..."
              rows={2}
            />

            <div className="assistant-input-footer">
              <span className="assistant-input-hint">
                {activeMode} Mode · Enter to send
              </span>

              <button
                className="assistant-send-btn"
                onClick={handleSend}
                disabled={!message.trim()}
              >
                Send <span>➤</span>
              </button>
            </div>
          </div>

          <p className="assistant-disclaimer">
            AI can make mistakes. Verify important research information with original sources.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Assistant;