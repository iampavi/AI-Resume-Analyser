import { useState } from "react";

const icons = {
  skills: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  ats: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4"/>
      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
    </svg>
  ),
  structure: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"/>
      <line x1="8" y1="12" x2="21" y2="12"/>
      <line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/>
      <line x1="3" y1="12" x2="3.01" y2="12"/>
      <line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  ),
  keyword: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  impact: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10"/>
      <line x1="18" y1="20" x2="18" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="16"/>
    </svg>
  ),
};

const learnItems = [
  {
    id: 0,
    icon: icons.skills,
    label: "Skills Score",
    color: "#6366f1",
    bg: "#eef2ff",
    stat: "35%",
    statLabel: "of total score",
    heading: "How well do your skills match?",
    desc: "Our AI compares your resume skills against the required and optional skills for your target role. Required skills carry 70% weight, optional skills 30%. The more relevant skills you list — including synonyms like 'Node.js' for 'JavaScript' — the higher this score climbs.",
    tips: ["List all technologies you've used", "Include both full names and abbreviations", "Add optional/nice-to-have skills too"]
  },
  {
    id: 1,
    icon: icons.ats,
    label: "ATS Score",
    color: "#8b5cf6",
    bg: "#f3eeff",
    stat: "20%",
    statLabel: "of total score",
    heading: "Will ATS systems read your resume?",
    desc: "Applicant Tracking Systems filter resumes before a human ever sees them. We check for the presence of key sections — Education, Experience, Skills, Projects, and Certifications — that ATS systems expect to find. Missing sections directly lower your ranking.",
    tips: ["Include all 5 standard sections", "Use clear section headings", "Avoid tables and graphics in PDFs"]
  },
  {
    id: 2,
    icon: icons.structure,
    label: "Structure Score",
    color: "#06b6d4",
    bg: "#e0f9ff",
    stat: "15%",
    statLabel: "of total score",
    heading: "Is your resume well structured?",
    desc: "Structure measures how logically your resume is organized. We look for experience timelines, educational background, a dedicated skills section, and project descriptions. A well-structured resume is easier to scan for both humans and automated systems.",
    tips: ["Put experience before education", "Use consistent date formats", "Keep bullet points concise"]
  },
  {
    id: 3,
    icon: icons.keyword,
    label: "Keyword Score",
    color: "#10b981",
    bg: "#e6faf4",
    stat: "20%",
    statLabel: "of total score",
    heading: "Are the right keywords present?",
    desc: "Keywords are the terms recruiters and ATS systems search for. We scan your resume for all required and optional skill keywords for your chosen role. Keyword density matters — the more relevant terms you naturally include, the better your visibility.",
    tips: ["Mirror the job description language", "Use industry-standard tool names", "Include both acronyms and full forms"]
  },
  {
    id: 4,
    icon: icons.impact,
    label: "Impact Score",
    color: "#f59e0b",
    bg: "#fff8e6",
    stat: "10%",
    statLabel: "of total score",
    heading: "Do your achievements stand out?",
    desc: "Impact measures whether your resume demonstrates results, not just responsibilities. We look for quantified achievements — percentages, monetary values, numbers, and strong action verbs like 'Developed', 'Reduced', 'Led'. Resumes with measurable impact get significantly more recruiter attention.",
    tips: ["Add % improvements wherever possible", "Use strong action verbs", "Include team size and project scale"]
  }
];

function LearnMore() {
  const [active, setActive] = useState(0);
  const item = learnItems[active];

  return (
    <section id="learn" className="learnSection2">

      <div className="learn2Header">
        <span className="learn2Pill">How Scoring Works</span>
        <h2>Understanding Your Resume Score</h2>
        <p>Five components combine to give you a complete picture</p>
      </div>

      <div className="learn2Body">

        <div className="learn2Tabs">
          {learnItems.map((t) => (
            <button
              key={t.id}
              className={`learn2Tab ${active === t.id ? "learn2TabActive" : ""}`}
              onClick={() => setActive(t.id)}
              style={active === t.id ? {
                borderLeftColor: t.color,
                background: t.bg
              } : {}}
            >
              <span
                className="learn2TabIcon"
                style={{
                  background: active === t.id ? t.bg : "#f4f5f7",
                  color: active === t.id ? t.color : "#888"
                }}
              >
                {t.icon}
              </span>
              <span className="learn2TabLabel">{t.label}</span>
              <span
                className="learn2TabWeight"
                style={active === t.id ? { color: t.color } : {}}
              >
                {t.stat}
              </span>
            </button>
          ))}
        </div>

        <div
          className="learn2Panel"
          key={active}
          style={{ borderTop: `4px solid ${item.color}` }}
        >
          <div className="learn2PanelTop">
            <div
              className="learn2PanelIcon"
              style={{ background: item.bg, color: item.color }}
            >
              {item.icon}
            </div>
            <div>
              <h3 className="learn2PanelHeading">{item.heading}</h3>
              <span
                className="learn2PanelBadge"
                style={{ background: item.bg, color: item.color }}
              >
                {item.stat} {item.statLabel}
              </span>
            </div>
          </div>

          <p className="learn2PanelDesc">{item.desc}</p>

          <div className="learn2Tips">
            <p className="learn2TipsLabel">Quick tips</p>
            {item.tips.map((tip, i) => (
              <div key={i} className="learn2Tip">
                <span className="learn2TipDot" style={{ background: item.color }} />
                {tip}
              </div>
            ))}
          </div>

          <div className="learn2Progress">
            <div className="learn2ProgressLabel">
              <span>Score weight</span>
              <span style={{ color: item.color }}>{item.stat}</span>
            </div>
            <div className="learn2ProgressTrack">
              <div
                className="learn2ProgressFill"
                style={{
                  width: item.stat,
                  background: `linear-gradient(90deg, ${item.color}, ${item.color}88)`
                }}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default LearnMore;