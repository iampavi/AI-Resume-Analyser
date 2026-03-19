function IssueCard({ title, issue, why, fix, severity }) {
  const level = severity?.toLowerCase();

  const icon =
    level === "critical" ? (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ) : level === "warning" ? (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ) : (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
    );

  return (
    <div className={`issueCard ${level}`}>
      <div className="issueHeader">
        <span className="issueIcon">{icon}</span>
        <span className="issueTitle">{title}</span>
        <span className={`badge ${level}`}>{level}</span>
      </div>
      <div className="issueBody">
        <p><b>Issue:</b> {issue}</p>
        <p><b>Why it matters:</b> {why}</p>
        <p className="fixText"><b>How to fix:</b> {fix}</p>
      </div>
    </div>
  );
}

export default IssueCard;