
function EmptyState({
  icon = "fa-folder-open",
  title = "Nothing here yet",
  description = "Your content will appear here.",
  actionLabel,
  onAction,
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <i className={`fa-solid ${icon}`}></i>
      </div>

      <h3>{title}</h3>
      <p>{description}</p>

      {actionLabel && onAction && (
        <button className="empty-state-action" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
