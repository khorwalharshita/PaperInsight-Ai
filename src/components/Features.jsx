function Features() {
  const features = [
    {
      title: "Smart Summaries",
      description:
        "Get clear and concise summaries of lengthy research papers.",
      icon: "📝",
    },
    {
      title: "Key Insights",
      description:
        "Quickly identify important findings, concepts, and conclusions.",
      icon: "💡",
    },
    {
      title: "Interactive Analysis",
      description:
        "Explore your research paper through an easy-to-use AI interface.",
      icon: "📊",
    },
  ];

  return (
    <section className="features">
      <h2>Powerful Research Insights</h2>

      <p className="features-intro">
        Everything you need to understand research papers faster.
      </p>

      <div className="feature-grid">
        {features.map((feature) => (
          <div className="feature-card" key={feature.title}>
            <div className="feature-icon">{feature.icon}</div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;