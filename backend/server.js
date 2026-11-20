
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.get("/", (req, res) => {
  res.send("PaperInsight AI Backend is running!");
});

// Convert OpenAlex abstract data into readable text
function reconstructAbstract(invertedIndex) {
  if (!invertedIndex) return "Abstract not available.";

  const words = [];

  for (const [word, positions] of Object.entries(invertedIndex)) {
    positions.forEach((position) => {
      words[position] = word;
    });
  }

  return words.filter(Boolean).join(" ") || "Abstract not available.";
}

// SEARCH RESEARCH PAPERS
app.get("/api/search", async (req, res) => {
  try {
    const topic = req.query.topic?.trim();

    if (!topic) {
      return res.status(400).json({
        error: "Please enter a research topic.",
      });
    }

    const url = new URL("https://api.openalex.org/works");

    url.searchParams.set("search", topic);
    url.searchParams.set("per_page", "10");
    url.searchParams.set(
      "select",
      "id,doi,title,publication_year,authorships,primary_location,open_access,abstract_inverted_index"
    );

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Research database is temporarily unavailable.");
    }

    const data = await response.json();

    const papers = (data.results || []).map((paper) => ({
      id: paper.id,
      title: paper.title || "Untitled Research Paper",
      authors:
        paper.authorships
          ?.map((item) => item.author?.display_name)
          .filter(Boolean)
          .slice(0, 5)
          .join(", ") || "Authors unavailable",
      year: paper.publication_year || "Year unavailable",
      description: reconstructAbstract(paper.abstract_inverted_index),
      url:
        paper.primary_location?.landing_page_url ||
        paper.doi ||
        paper.id,
      isOpenAccess: paper.open_access?.is_oa || false,
    }));

    res.json({
      total: data.meta?.count || papers.length,
      papers,
    });
  } catch (error) {
    console.error("Research search error:", error);

    res.status(500).json({
      error: error.message || "Unable to search research papers.",
    });
  }
});

// COMMON GEMINI REQUEST
async function generateAIResponse(prompt) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Gemini API key is missing from the backend.");
  }

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/interactions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY,
      },
      body: JSON.stringify({
        model: "gemini-3.5-flash-lite",
        input: prompt,
        store: false,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Gemini API error:", data);

    throw new Error(
      data.error?.message || "Gemini request failed."
    );
  }

  const result =
    data.steps
      ?.filter((step) => step.type === "model_output")
      .flatMap((step) => step.content || [])
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join("") || "";

  if (!result) {
    throw new Error("Gemini returned an empty response.");
  }

  return result;
}

// AI PAPER ANALYSIS
app.post("/api/analyze", async (req, res) => {
  try {
    const { paperText } = req.body;

    if (!paperText || !paperText.trim()) {
      return res.status(400).json({
        error: "No research paper text provided.",
      });
    }

    const prompt = `
You are PaperInsight AI, an academic research assistant.

Carefully analyse the following research paper.
Use simple, clear language.
Never invent findings or information that is not present.

Organise your response under these headings:

1. Summary
2. Key Findings
3. Research Methodology
4. Strengths
5. Limitations
6. Future Scope

If information is missing, clearly mention that.

RESEARCH PAPER:

${paperText.slice(0, 30000)}
`;

    const analysis = await generateAIResponse(prompt);

    res.json({ analysis });
  } catch (error) {
    console.error("Analysis error:", error);

    res.status(500).json({
      error: error.message || "Unable to analyse the research paper.",
    });
  }
});

// ASK AI ABOUT UPLOADED PAPER
app.post("/api/ask", async (req, res) => {
  try {
    const { paperText, question } = req.body;

    if (!paperText || !paperText.trim()) {
      return res.status(400).json({
        error: "Research paper content is missing.",
      });
    }

    if (!question || !question.trim()) {
      return res.status(400).json({
        error: "Please enter a question.",
      });
    }

    const prompt = `
You are PaperInsight AI, an academic research assistant.

Answer the user's question using ONLY the research paper provided below.

Instructions:
- Use simple, clear language.
- Give accurate and relevant answers.
- Do not invent information.
- If the paper does not contain the answer, clearly say so.
- Explain technical concepts in beginner-friendly language.
- Use bullet points when helpful.

USER QUESTION:
${question.trim()}

RESEARCH PAPER:
${paperText.slice(0, 30000)}
`;

    const answer = await generateAIResponse(prompt);

    res.json({ answer });
  } catch (error) {
    console.error("Ask AI error:", error);

    res.status(500).json({
      error: error.message || "Unable to answer your question.",
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`PaperInsight AI backend running on port ${PORT}`);
});
