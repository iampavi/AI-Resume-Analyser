import { useEffect, useState } from "react";

const roles = [
  "Backend Developer",
  "Frontend Developer",
  "Full Stack Developer",
  "Data Analyst",
  "DevOps Engineer",
  "ML Engineer"
];

function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, 60);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length - 1));
      }, 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section className="hero2">

      {/* background blobs */}
      <div className="hero2Blob hero2Blob1" />
      <div className="hero2Blob hero2Blob2" />
      <div className="hero2Blob hero2Blob3" />

      {/* LEFT */}
      <div className="hero2Left">

        <div className="hero2Pill">
          <span className="hero2PillDot" />
          AI-Powered Resume Analysis
        </div>

        <h1 className="hero2Heading">
          Land Your Dream Job as      
          {" "}<br></br>
          <span className="hero2Typed">
            {displayed}
            <span className="hero2Cursor">|</span>
          </span>
        </h1>

        <p className="hero2Sub">
          Upload your resume and get instant ATS score, skill gap analysis,
          and AI-powered suggestions tailored to your target role.
        </p>

        <div className="hero2Actions">
  <button onClick={() =>{
    document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" });
  }} className="hero2Btn hero2BtnPrimary">
    Analyze My Resume
    <span className="hero2BtnArrow">→</span>
  </button>

<button
  className="hero2Btn hero2BtnGhost"
  onClick={() => {
    document.getElementById("learn")?.scrollIntoView({ behavior: "smooth" });
  }}
>
  How it works
</button>
</div>

        <div className="hero2Stats">
          <div className="hero2Stat">
            <span className="hero2StatNum">50K+</span>
            <span className="hero2StatLabel">Resumes Analyzed</span>
          </div>
          <div className="hero2StatDivider" />
          <div className="hero2Stat">
            <span className="hero2StatNum">94%</span>
            <span className="hero2StatLabel">ATS Pass Rate</span>
          </div>
          <div className="hero2StatDivider" />
          <div className="hero2Stat">
            <span className="hero2StatNum">4.8/5</span>
            <span className="hero2StatLabel">User Satisfaction</span>
          </div>
        </div>

      </div>

      {/* RIGHT — mock resume card */}
      <div className="hero2Right">

        <div className="hero2Card">

          {/* card header */}
          <div className="hero2CardHeader">
            <div className="hero2CardAvatar">JD</div>
            <div>
              <div className="hero2CardName">John Doe</div>
              <div className="hero2CardRole">Full Stack Developer</div>
            </div>
            <div className="hero2CardScore">78</div>
          </div>

          {/* score bar */}
          <div className="hero2CardSection">
            <div className="hero2CardBarRow">
              <span>Skills Match</span>
              <span style={{ color: "#6366f1", paddingLeft: "0.5rem" }}>87%</span>
            </div>
            <div className="hero2CardTrack">
              <div className="hero2CardFill" style={{ width: "87%", background: "#6366f1" }} />
            </div>
          </div>

          <div className="hero2CardSection">
            <div className="hero2CardBarRow">
              <span>ATS Score</span>
              <span style={{ color: "#10b981", paddingLeft: "0.5rem" }}>100%</span>
            </div>
            <div className="hero2CardTrack">
              <div className="hero2CardFill" style={{ width: "100%", background: "#10b981" }} />
            </div>
          </div>

          <div className="hero2CardSection">
            <div className="hero2CardBarRow">
              <span>Keywords</span>
              <span style={{ color: "#f59e0b", paddingLeft: "0.5rem" }}>66%</span>
            </div>
            <div className="hero2CardTrack">
              <div className="hero2CardFill" style={{ width: "66%", background: "#f59e0b" }} />
            </div>
          </div>

          {/* skills */}
          <div className="hero2CardSkills">
            {["C#", "React", "SQL", "ASP.NET", "Git"].map((s) => (
              <span key={s} className="hero2CardSkill">{s}</span>
            ))}
          </div>

         

        </div>

      {/* Replace floating chips — remove emojis */}
<div className="hero2Chip hero2Chip1">
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:5}}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
  ATS Compatible
</div>
<div className="hero2Chip hero2Chip2">
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:5}}>
    <circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/>
    <line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/>
  </svg>
  87% Role Match
</div>
<div className="hero2Chip hero2Chip3">
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:5}}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
  Instant Analysis
</div>

{/* Replace card tip emoji */}
<div className="hero2CardTip">
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:6,flexShrink:0}}>
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
  Add Docker & Azure to boost your score
</div>

      </div>

    </section>
  );
}

export default HeroSection;