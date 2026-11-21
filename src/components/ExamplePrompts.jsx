function ExamplePrompts({ onPromptSelect }) {
  const prompts = [
    "Summarize this research paper",
    "What is the main finding?",
    "Explain the methodology",
    "What are the limitations?",
  ];

  return (
    <div className="example-prompts">
      <h3>Try asking</h3>

      <div className="prompt-list">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onPromptSelect?.(prompt)}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ExamplePrompts;