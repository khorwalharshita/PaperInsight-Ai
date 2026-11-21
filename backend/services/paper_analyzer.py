import os
import json

from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def analyze_paper(text):

    prompt = f"""
You are a research paper analysis assistant.

Analyze the following research paper.

Return ONLY valid JSON with these fields:

title
authors
year
abstract
technology
dataset
key_findings
research_gap

Rules:
- Do not invent information.
- If information is unavailable, return null.
- Keep the information concise.
- Research gap should be based only on evidence from the paper.

Research paper:

{text[:30000]}
"""

    interaction = client.interactions.create(
        model="gemini-3.6-flash",
        input=prompt
    )

    result = interaction.output_text.strip()

    result = result.replace("```json", "")
    result = result.replace("```", "")
    result = result.strip()

    return json.loads(result)