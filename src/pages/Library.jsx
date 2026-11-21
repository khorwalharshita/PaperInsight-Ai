
import EmptyState from "../components/EmptyState";
import PaperCard from "../components/PaperCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Library.css";

const papers = [
  {
    id: 1,
    title: "Attention Is All You Need",
    authors: "Ashish Vaswani et al.",
    category: "Deep Learning",
    status: "Analyzed",
    date: "Nov 18, 2026",
    tags: ["Transformer", "NLP"],
    icon: "🧠",
  },
  {
    id: 2,
    title: "BERT: Pre-training of Deep Bidirectional Transformers",
    authors: "Jacob Devlin et al.",
    category: "Natural Language Processing",
    status: "Analyzed",
    date: "Nov 16, 2026",
    tags: ["BERT", "Language Model"],
    icon: "📘",
  },
  {
    id: 3,
    title: "A Survey on Large Language Models",
    authors: "Wayne Xin Zhao et al.",
    category: "Artificial Intelligence",
    status: "Pending",
    date: "Nov 15, 2026",
    tags: ["LLM", "Survey"],
    icon: "📄",
  },
  {
    id: 4,
    title: "Deep Residual Learning for Image Recognition",
    authors: "Kaiming He et al.",
    category: "Computer Vision",
    status: "Analyzed",
    date: "Nov 12, 2026",
    tags: ["ResNet", "CNN"],
    icon: "🖼️",
  },
  {
    id: 5,
    title: "Generative Adversarial Networks",
    authors: "Ian Goodfellow et al.",
    category: "Machine Learning",
    status: "Pending",
    date: "Nov 10, 2026",
    tags: ["GAN", "Generative AI"],
    icon: "✨",
  },
  {
    id: 6,
    title: "An Image is Worth 16x16 Words",
    authors: "Alexey Dosovitskiy et al.",
    category: "Computer Vision",
    status: "Analyzed",
    date: "Nov 08, 2026",
    tags: ["Vision Transformer", "ViT"],
    icon: "🔬",
  },
];

function Library() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Newest");

  const filteredPapers = papers
    .filter((paper) => {
      const searchTerm = search.toLowerCase().trim();

      const matchesSearch =
        paper.title.toLowerCase().includes(searchTerm) ||
        paper.authors.toLowerCase().includes(searchTerm) ||
        paper.category.toLowerCase().includes(searchTerm) ||
        paper.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm)
        );

      const matchesFilter =
        filter === "All" ||
        paper.status === filter ||
        paper.category === filter;

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sort === "A-Z") {
        return a.title.localeCompare(b.title);
      }

      if (sort === "Z-A") {
        return b.title.localeCompare(a.title);
      }

      return b.id - a.id;
    });

  const clearFilters = () => {
    setSearch("");
    setFilter("All");
    setSort("Newest");
  };

  return (
    <div className="library-page">
      <div className="library-header">
        <div>
          <span className="library-eyebrow">RESEARCH COLLECTION</span>
          <h1>My Library</h1>
          <p>Organize, explore, and revisit your research papers.</p>
        </div>

        <button
          className="library-upload-button"
          onClick={() => navigate("/upload")}
        >
          + Add Paper
        </button>
      </div>

      <div className="library-stats">
        <div className="library-stat-card">
          <div className="library-stat-icon purple">📚</div>
          <div>
            <h3>24</h3>
            <p>Total Papers</p>
          </div>
        </div>

        <div className="library-stat-card">
          <div className="library-stat-icon blue">✨</div>
          <div>
            <h3>18</h3>
            <p>Analyzed</p>
          </div>
        </div>

        <div className="library-stat-card">
          <div className="library-stat-icon orange">⏳</div>
          <div>
            <h3>6</h3>
            <p>Pending</p>
          </div>
        </div>
      </div>

      <div className="library-toolbar">
        <div className="library-search">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search papers, authors, topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Papers</option>
          <option value="Analyzed">Analyzed</option>
          <option value="Pending">Pending</option>
          <option value="Deep Learning">Deep Learning</option>
          <option value="Artificial Intelligence">Artificial Intelligence</option>
          <option value="Computer Vision">Computer Vision</option>
          <option value="Machine Learning">Machine Learning</option>
          <option value="Natural Language Processing">
            Natural Language Processing
          </option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="Newest">Newest</option>
          <option value="A-Z">A–Z</option>
          <option value="Z-A">Z–A</option>
        </select>
      </div>

      <div className="library-results-header">
        <h2>
          Your Papers <span>{filteredPapers.length}</span>
        </h2>
        <p>Browse your saved research collection</p>
      </div>

      <div className="library-papers-grid">
        {filteredPapers.length > 0 ? (
          filteredPapers.map((paper) => (
            <PaperCard
              key={paper.id}
              title={paper.title}
              authors={paper.authors}
              category={paper.category}
              status={paper.status}
              date={paper.date}
              tags={paper.tags}
              icon={paper.icon}
              onView={() => navigate("/analysis")}
            />
          ))
        ) : (
          <div style={{ gridColumn: "1 / -1" }}>
            <EmptyState
              icon="fa-magnifying-glass"
              title="No papers found"
              description="We couldn't find any papers matching your search or filters. Try changing your search or clearing your filters."
              actionLabel="Clear Filters"
              onAction={clearFilters}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Library;
