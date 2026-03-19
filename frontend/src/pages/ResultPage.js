import { useLocation, useNavigate } from "react-router-dom";
import IssueCard from "../components/IssueCard";
import SkillsSection from "../components/SkillsSection";
import Navbar from "../components/Navbar";
import { useState } from "react";
import MissingSkillsSection from "../components/MissingSkillsSection";


function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const result   = location.state?.result;

  if (!result) return (
    <div className="rp2Empty">
      <p>No result found.</p>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  );

  const criticalCount = result.issues.filter(i => i.severity?.toLowerCase() === "critical").length;
  const warningCount  = result.issues.filter(i => i.severity?.toLowerCase() === "warning").length;
  const infoCount     = result.issues.filter(i => i.severity?.toLowerCase() === "info").length;

  const scoreStatus =
    result.score >= 80 ? { label: "Excellent",        color: "#10b981" } :
    result.score >= 60 ? { label: "Good",              color: "#6366f1" } :
    result.score >= 40 ? { label: "Needs Improvement", color: "#f59e0b" } :
                         { label: "Poor",              color: "#ef4444" };


 const scoreCards = [
  {
    label: "Skills", value: result.skillsScore, color: "#6366f1", bg: "#eef2ff",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    )
  },
  {
    label: "ATS", value: result.atsScore, color: "#8b5cf6", bg: "#f3eeff",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    )
  },
  {
    label: "Structure", value: result.structureScore, color: "#10b981", bg: "#e6faf4",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
        <line x1="8" y1="18" x2="21" y2="18"/>
        <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/>
        <line x1="3" y1="18" x2="3.01" y2="18"/>
      </svg>
    )
  },
  {
    label: "Keywords", value: result.keywordScore, color: "#06b6d4", bg: "#e0f9ff",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    )
  },
  {
    label: "Impact", value: result.impactScore, color: "#f59e0b", bg: "#fff8e6",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="20" x2="12" y2="10"/>
        <line x1="18" y1="20" x2="18" y2="4"/>
        <line x1="6"  y1="20" x2="6"  y2="16"/>
      </svg>
    )
  },
];
  return (
    <div className="rp2Wrapper">

      {/* background */}
      <div className="rp2Bg" />
      <div className="rp2BlobA" />
      <div className="rp2BlobB" />
      <div className="rp2GridOverlay" />

      <Navbar />

      <div className="rp2Inner">

        {/* BREADCRUMB */}
        <div className="rp2Breadcrumb">
          <span onClick={() => navigate("/")} className="rp2BreadLink">Home</span>
          <span className="rp2BreadSep">›</span>
          <span>Results</span>
        </div>

        {/* PAGE TITLE */}
        <div className="rp2PageTitle">
          <h1>Resume Analysis <span className="rp2TitleGrad">Report</span></h1>
          <p>Here's a detailed breakdown of your resume performance</p>
        </div>

        {/* ── SCORE HERO ── */}
        <div className="rp2ScoreHero">

          {/* ring */}
          <div className="rp2RingWrap">
            <svg width="160" height="160" className="rp2RingSvg">
              <defs>
                <linearGradient id="rpGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor={scoreStatus.color} />
                  <stop offset="100%" stopColor={scoreStatus.color + "99"} />
                </linearGradient>
              </defs>
              <circle cx="80" cy="80" r="68"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="12" fill="none"/>
              <circle cx="80" cy="80" r="68"
                stroke="url(#rpGrad)"
                strokeWidth="12" fill="none"
                strokeDasharray="427"
                strokeDashoffset={427 - (result.score / 100) * 427}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 1.2s ease" }}
              />
            </svg>
            <div className="rp2RingInner">
              <span className="rp2RingScore">{Math.round(result.score)}</span>
              <span className="rp2RingMax">/100</span>
            </div>
          </div>

          {/* info */}
          <div className="rp2ScoreInfo">
            <div className="rp2ScorePill" style={{ background: scoreStatus.color + "22", color: scoreStatus.color, border: `1px solid ${scoreStatus.color}44` }}>
              {scoreStatus.label}
            </div>
            <h2 className="rp2ScoreHeading">Your Resume Score</h2>
            <p className="rp2ScoreDesc">
              Role analysed: <strong>{result.role?.replace(/([A-Z])/g, ' $1').trim()}</strong>
              &nbsp;·&nbsp;
              Experience detected: <strong>{result.experienceYears} yr{result.experienceYears !== 1 ? "s" : ""}</strong>
            </p>
            <div className="rp2GradeBadge">
              Grade: <span style={{ color: scoreStatus.color }}>{result.grade}</span>
              &nbsp;·&nbsp;
              <span style={{ color: scoreStatus.color }}>{result.verdict}</span>
            </div>
          </div>

         {/* issue pills — replace emoji with SVG */}
<div className="rp2IssuePills">
  <div className="rp2IssuePill rp2Critical">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{marginRight:5}}>
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
    {criticalCount} Critical
  </div>
  <div className="rp2IssuePill rp2Warning">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{marginRight:5}}>
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
    {warningCount} Warnings
  </div>
  <div className="rp2IssuePill rp2Info">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{marginRight:5}}>
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
    {infoCount} Info
  </div>
</div>

        </div>

        {/* ── SCORE CARDS ── */}
        <div className="rp2Cards">
          {scoreCards.map((c, i) => (
            <div key={i} className="rp2Card">
              <div className="rp2CardIcon" style={{ background: c.bg, color: c.color }}>
                {c.icon}
              </div>
              <div className="rp2CardLabel">{c.label}</div>
              <div className="rp2CardValue" style={{ color: c.color }}>
                {c.value}
                <span className="rp2CardUnit">%</span>
              </div>
              <div className="rp2CardBar">
                <div
                  className="rp2CardBarFill"
                  style={{ width: `${c.value}%`, background: c.color }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ── AI SUMMARY ── */}
        <div className="rp2Summary">
          <div className="rp2SummaryIcon"> <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 0110 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z"/>
    <path d="M12 16v-4M12 8h.01"/>
  </svg>
  </div>
  
          <div>
            <h3 className="rp2SummaryTitle">AI Summary</h3>
            <p className="rp2SummaryText">
  {generateSummary(result.suggestions)}
</p>
<div
 className="aiSuggestionToggle"
 onClick={() => setShowSuggestions(!showSuggestions)}
>
 {showSuggestions ? "Hide AI Suggestions ▲" : "View AI Suggestions ▼"}
</div>

{showSuggestions && (
 <div className="aiSuggestionList">
  {result.suggestions.map((s, i) => (
   <div key={i} className="aiSuggestionItem">
    <span className="aiSuggestionNumber">{i + 1}</span>
    {s}
   </div>
  ))}
 </div>
)}
          </div>
        </div>

        {/* ── SKILLS + MISSING SKILLS ── */}
        <div className="rp2Grid2">
          <div className="rp2GlassCard">
            <SkillsSection result={result} />
          </div>
          <div className="rp2GlassCard">
            <MissingSkillsSection result={result} />
          </div>
        </div>

        {/* ── ISSUES ── */}
        <div className="rp2Section">
          <h3 className="rp2SectionTitle">Issues Found</h3>
          <div className="rp2Issues">
            {result.issues.map((issue, i) => (
              <IssueCard
                key={i}
                title={issue.title}
                issue={issue.issueText}
                why={issue.why}
                fix={issue.fix}
                severity={issue.severity}
              />
            ))}
          </div>
        </div>

        {/* ── ACTIONS ── */}
        <div className="rp2Actions">
          <button className="rp2BtnPrimary" onClick={() => navigate("/")}>
            Analyse Another Resume <span>→</span>
          </button>
          <button className="rp2BtnGhost" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Back to Top ↑
          </button>
        </div>

      </div>
    </div>
  );
  function generateSummary(suggestions) {
  if (!suggestions || suggestions.length === 0) return "Your resume looks well structured.";

  const text = suggestions.join(" ").toLowerCase();

  let points = [];

  if (text.includes("experience"))
    points.push("lacks practical experience");

  if (text.includes("project"))
    points.push("could benefit from more project examples");

  if (text.includes("certification"))
    points.push("adding certifications may strengthen your profile");

  if (text.includes("metric") || text.includes("quantify"))
    points.push("including measurable achievements would improve impact");

  if (points.length === 0)
    return "Your resume is well structured but could be improved for stronger ATS performance.";

  return `Your resume shows good skill alignment but ${points.join(
    ", "
  )}. Improving these areas can increase recruiter visibility and ATS ranking.`;
}
}

export default ResultPage;