import { useState } from "react";
import "./Graph.css";

const graphData = {
  nodes: [
    { id: 1, label: "Artificial Intelligence", type: "topic", x: 50, y: 48 },
    { id: 2, label: "Transformers", type: "technology", x: 30, y: 25 },
    { id: 3, label: "Large Language Models", type: "topic", x: 75, y: 25 },
    { id: 4, label: "Attention Is All You Need", type: "paper", x: 20, y: 68 },
    { id: 5, label: "BERT", type: "paper", x: 43, y: 82 },
    { id: 6, label: "GPT Architecture", type: "technology", x: 80, y: 63 },
    { id: 7, label: "NLP", type: "topic", x: 68, y: 88 },
    { id: 8, label: "Deep Learning", type: "topic", x: 10, y: 43 },
    { id: 9, label: "Vision Transformer", type: "paper", x: 92, y: 42 },
    { id: 10, label: "Neural Networks", type: "technology", x: 52, y: 12 },
  ],
  connections: [
    [1, 2],
    [1, 3],
    [1, 8],
    [1, 7],
    [2, 4],
    [2, 5],
    [2, 10],
    [3, 6],
    [3, 7],
    [3, 5],
    [6, 7],
    [8, 4],
    [8, 10],
    [1, 9],
    [9, 2],
    [10, 5],
  ],
};

const nodeColors = {
  topic: "#7667eb",
  technology: "#26a69a",
  paper: "#f2a64a",
};

function Graph() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredNodes = graphData.nodes.filter((node) => {
    const matchesSearch = node.label
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesFilter =
      activeFilter === "all" || node.type === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const isVisible = (node) => filteredNodes.some((item) => item.id === node.id);

  const getNode = (id) => graphData.nodes.find((node) => node.id === id);

  return (
    <div className="graph-page">
      {/* Header */}
      <div className="graph-page-header">
        <div>
          <span className="graph-eyebrow">RESEARCH INTELLIGENCE</span>
          <h1>Research Graph</h1>
          <p>Explore relationships between papers, concepts, and technologies.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="graph-stats">
        <div className="graph-stat-card">
          <div className="graph-stat-icon purple">◉</div>
          <div>
            <span>Total Nodes</span>
            <h3>{graphData.nodes.length}</h3>
          </div>
        </div>

        <div className="graph-stat-card">
          <div className="graph-stat-icon teal">⌘</div>
          <div>
            <span>Connections</span>
            <h3>{graphData.connections.length}</h3>
          </div>
        </div>

        <div className="graph-stat-card">
          <div className="graph-stat-icon orange">◈</div>
          <div>
            <span>Categories</span>
            <h3>3</h3>
          </div>
        </div>
      </div>

      {/* Graph Workspace */}
      <div className="graph-workspace">
        <div className="graph-toolbar">
          <div className="graph-toolbar-title">
            <h2>Knowledge Network</h2>
            <span className="graph-demo-badge">DEMO DATA</span>
          </div>

          <div className="graph-controls">
            <input
              type="text"
              placeholder="Search nodes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="paper">Papers</option>
              <option value="topic">Topics</option>
              <option value="technology">Technologies</option>
            </select>
          </div>
        </div>

        {/* Graph Canvas */}
        <div className="graph-canvas">
          <svg className="graph-lines" viewBox="0 0 1000 600" preserveAspectRatio="none">
            {graphData.connections.map(([from, to], index) => {
              const nodeA = getNode(from);
              const nodeB = getNode(to);

              if (!isVisible(nodeA) || !isVisible(nodeB)) return null;

              return (
                <line
                  key={index}
                  x1={`${nodeA.x}%`}
                  y1={`${nodeA.y}%`}
                  x2={`${nodeB.x}%`}
                  y2={`${nodeB.y}%`}
                  className={`graph-connection ${
                    selectedNode &&
                    (selectedNode.id === from || selectedNode.id === to)
                      ? "highlighted"
                      : ""
                  }`}
                />
              );
            })}
          </svg>

          {filteredNodes.map((node) => {
            const isSelected = selectedNode?.id === node.id;

            return (
              <button
                key={node.id}
                className={`graph-node ${node.type} ${isSelected ? "selected" : ""}`}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  "--node-color": nodeColors[node.type],
                }}
                onClick={() => setSelectedNode(isSelected ? null : node)}
                title={node.label}
              >
                <span className="graph-node-dot"></span>
                <span className="graph-node-label">{node.label}</span>
              </button>
            );
          })}

          {filteredNodes.length === 0 && (
            <div className="graph-no-results">
              <span>⌕</span>
              <h3>No matching nodes</h3>
              <p>Try a different search or category.</p>
            </div>
          )}

          {/* Legend */}
          <div className="graph-legend">
            <div>
              <span className="legend-dot topic-dot"></span>
              Topics
            </div>
            <div>
              <span className="legend-dot technology-dot"></span>
              Technologies
            </div>
            <div>
              <span className="legend-dot paper-dot"></span>
              Papers
            </div>
          </div>
        </div>

        {/* Selected Node Details */}
        {selectedNode && (
          <div className="graph-detail-panel">
            <div
              className="graph-detail-icon"
              style={{ background: nodeColors[selectedNode.type] }}
            >
              {selectedNode.type === "paper"
                ? "📄"
                : selectedNode.type === "topic"
                  ? "💡"
                  : "⚙️"}
            </div>

            <div className="graph-detail-info">
              <span>{selectedNode.type.toUpperCase()}</span>
              <h3>{selectedNode.label}</h3>
              <p>
                Connected to{" "}
                {
                  graphData.connections.filter(
                    ([from, to]) =>
                      from === selectedNode.id || to === selectedNode.id
                  ).length
                }{" "}
                other nodes in this research network.
              </p>
            </div>

            <button
              className="graph-detail-close"
              onClick={() => setSelectedNode(null)}
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="graph-footer-note">
        <span>✦</span>
        <p>
          Click any node to explore its connections. This interactive network
          currently uses sample data and will be populated from analyzed papers
          once backend integration is complete.
        </p>
      </div>
    </div>
  );
}

export default Graph;