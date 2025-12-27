// src/components/common/EmptyState.jsx

export default function EmptyState({
  title = "Nothing here",
  message = "No data available",
  actionText,
  onAction
}) {
  return (
    <div className="empty-state">
      <h3 className="empty-state-title">{title}</h3>

      <p className="empty-state-message">
        {message}
      </p>

      {actionText && onAction && (
        <button
          type="button"
          className="start-shopping-btn empty-state-btn"
          onClick={onAction}
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
