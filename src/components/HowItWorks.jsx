function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Upload Your Paper",
      description:
        "Upload your research paper in PDF format to PaperInsight AI.",
    },
    {
      number: "02",
      title: "AI Analyzes It",
      description:
        "Our AI processes the paper and identifies important information and insights.",
    },
    {
      number: "03",
      title: "Explore the Insights",
      description:
        "Read summaries, key findings, and interact with your research paper.",
    },
  ];

  return (
    <section className="how-it-works" id="how-it-works">
      <h2>How It Works</h2>

      <p className="how-it-works-intro">
        Analyze your research paper in three simple steps.
      </p>

      <div className="steps-container">
        {steps.map((step) => (
          <div className="step" key={step.number}>
            <div className="step-number">{step.number}</div>

            <h3>{step.title}</h3>

            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;