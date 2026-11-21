import { useState } from "react";

function FileUpload({ onFileSelect }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      setFile(null);
      return;
    }

    setError("");
    setFile(selectedFile);

    if (onFileSelect) {
      onFileSelect(selectedFile);
    }
  };

  return (
    <div className="file-upload">
      <div className="upload-icon">📄</div>

      <h3>Upload Your Research Paper</h3>

      <p>Drag & drop your PDF here</p>

      <p>or</p>

      <input
        type="file"
        accept=".pdf,application/pdf"
        id="pdf-upload"
        onChange={handleFileChange}
        hidden
      />

      <label htmlFor="pdf-upload" className="upload-button">
        Choose PDF
      </label>

      {file && (
        <p className="selected-file">
          Selected: <strong>{file.name}</strong>
        </p>
      )}

      {error && <p className="upload-error">{error}</p>}
    </div>
  );
}

export default FileUpload;
