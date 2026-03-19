import { useEffect, useRef } from "react";

const scanItems = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "Skill Detection",
    desc: "AI scans your resume and detects all technical and soft skills automatically.",
    color: "#6366f1",
    bg: "#eef2ff"
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
    title: "ATS Compatibility",
    desc: "Checks if your resume passes ATS systems used by top recruiters.",
    color: "#8b5cf6",
    bg: "#f3eeff"
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    title: "Keyword Matching",
    desc: "Matches your resume keywords with the target job role requirements.",
    color: "#06b6d4",
    bg: "#e0f9ff"
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="20" x2="12" y2="10"/>
        <line x1="18" y1="20" x2="18" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="16"/>
      </svg>
    ),
    title: "Score Breakdown",
    desc: "Get a detailed score across skills, structure, ATS, and impact.",
    color: "#10b981",
    bg: "#e6faf4"
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    title: "AI Suggestions",
    desc: "Receive smart, role-specific suggestions to improve your resume instantly.",
    color: "#f59e0b",
    bg: "#fff8e6"
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
    title: "Role Matching",
    desc: "See exactly how well your resume fits your chosen job role.",
    color: "#ef4444",
    bg: "#fff0f0"
  }
];

function AIScanSection() {
  const cardsRef = useRef([]);

useEffect(() => {
  const timeout = setTimeout(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            entry.target.classList.add("scanCardVisible");
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    // Force visible for cards already in viewport on load
    cardsRef.current.forEach((el) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight)
        el.classList.add("scanCardVisible");
    });

  }, 100);

  return () => clearTimeout(timeout);
}, []);

  return (
    <section className="aiSection">
      <div className="aiSectionHeader">
        <span className="aiSectionPill">Powered by AI</span>
        <h2>What Our AI Analyses</h2>
        <p>Six powerful checks run instantly on every resume</p>
      </div>

      <div className="scanGrid6">
        {scanItems.map((item, i) => (
          <div
            key={i}
            className="scanCard6"
            ref={(el) => (cardsRef.current[i] = el)}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div
              className="scanCard6Icon"
              style={{ background: item.bg, color: item.color }}
            >
              {item.icon}
            </div>
            <h4 className="scanCard6Title">{item.title}</h4>
            <p className="scanCard6Desc">{item.desc}</p>
            <div
              className="scanCard6Line"
              style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}55)` }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default AIScanSection;