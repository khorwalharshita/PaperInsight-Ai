from backend.services.paper_analyzer import analyze_paper


text = """
This research paper presents a transformer-based approach
for sign language recognition using the WLASL dataset.
The proposed method improves recognition accuracy compared
with previous approaches. The study also discusses the
difficulty of real-time sign language recognition.
"""


result = analyze_paper(text)

print(result)