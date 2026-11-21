function UploadProgress({ progress = 0 }) {
  return (
    <div className="upload-progress">
      <div className="progress-header">
        <span>Analyzing your paper...</span>
        <span>{progress}%</span>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p>
        Please wait while PaperInsight AI processes your research paper.
      </p>
    </div>
  );
}

export default UploadProgress;