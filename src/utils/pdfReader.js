
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

async function readPDF(file) {
  const fileData = await file.arrayBuffer();

  const pdf = await pdfjsLib.getDocument({
    data: fileData,
  }).promise;

  let extractedText = "";

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);
    const textContent = await page.getTextContent();

    const pageText = textContent.items
      .map((item) => item.str)
      .join(" ");

    extractedText += pageText + "\n";
  }

  return extractedText;
}

export default readPDF;
