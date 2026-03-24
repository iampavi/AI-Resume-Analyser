import { useState } from "react";
import { analyzeResume } from "../api";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M9 9h6M9 12h6M9 15h4"/>
      </svg>
    ),
    title: "AI Analysis",
    desc: "Powered by Groq LLaMA"
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "Instant Results",
    desc: "Score in under 5 seconds"
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="22" y1="12" x2="18" y2="12"/>
        <line x1="6" y1="12" x2="2" y2="12"/>
        <line x1="12" y1="6" x2="12" y2="2"/>
        <line x1="12" y1="22" x2="12" y2="18"/>
      </svg>
    ),
    title: "Role Matching",
    desc: "9 job roles supported"
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6"  y1="20" x2="6"  y2="14"/>
      </svg>
    ),
    title: "5 Score Metrics",
    desc: "Skills, ATS, Keywords & more"
  },
];

const uploadIcon = (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="12" y1="18" x2="12" y2="12"/>
    <line x1="9"  y1="15" x2="12" y2="12"/>
    <line x1="15" y1="15" x2="12" y2="12"/>
  </svg>
);

const dragIcon = (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
  </svg>
);

const fileIcon = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

const lockIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:"inline",verticalAlign:"middle",marginRight:"5px"}}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
);

const roles = [
  "BackendDeveloper",
  "FrontendDeveloper",
  "FullStackDeveloper",
  "DataAnalyst",
  "DevOpsEngineer",
  "MobileDeveloper",
  "MachineLearningEngineer",
  "SoftwareTester",
  "CloudEngineer"
];

function UploadSection({ setResult }) {
  const [file,    setFile]    = useState(null);
  const [role,    setRole]    = useState("");
  const [loading, setLoading] = useState(false);
  const [drag,    setDrag]    = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !role || role === "select") {
      alert("Please select a role and upload your resume.");
      return;
    }
    setLoading(true);
    try {
      const result = await analyzeResume(file, role);
      setResult(result);
      navigate("/result", { state: { result } });
    } catch (err) {
      console.error("Error analyzing resume", err);
    }
    setLoading(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDrag(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped?.type === "application/pdf") setFile(dropped);
    else alert("Please upload a PDF file.");
  };

  return (
    <section id="upload" className="upload2Wrapper">

      <div className="upload2Blob upload2Blob1" />
      <div className="upload2Blob upload2Blob2" />
      <div className="upload2Grid" />

      <div className="upload2Inner">

        {/* ── LEFT ── */}
        <div className="upload2Left">

          <div className="upload2Pill">
            <span className="upload2PillDot" />
            Resume Analyser
          </div>

          <h2 className="upload2Title">
            Get Your Resume<br />
            <span className="upload2TitleGrad">Score in Seconds</span>
          </h2>

          <p className="upload2Sub">
            Upload your PDF resume, pick your target role, and our AI
            will give you a detailed breakdown with actionable improvements.
          </p>

          <div className="upload2Features">
            {features.map((f, i) => (
              <div key={i} className="upload2Feature">
                <span className="upload2FeatureIcon">{f.icon}</span>
                <div>
                  <div className="upload2FeatureTitle">{f.title}</div>
                  <div className="upload2FeatureDesc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ── RIGHT CARD ── */}
        <div className="upload2Card">

          <div className="upload2CardGlow" />

          <h3 className="upload2CardTitle">Analyse Your Resume</h3>
          <p className="upload2CardSub">PDF files only · Free · Instant</p>

          <form onSubmit={handleSubmit} className="upload2Form">

            {/* ROLE SELECT */}
          
             
              <div className="upload2Field">
  <label className="upload2Label">Target Role</label>

  <Select
  options={roles.map(r => ({
    value: r,
    label: r.replace(/([A-Z])/g, ' $1').trim()
  }))}
  value={
    role
      ? {
          value: role,
          label: role.replace(/([A-Z])/g, ' $1').trim()
        }
      : null
  }
  onChange={(selected) => setRole(selected?.value || "")}
  placeholder="Select a role..."
  isSearchable

  styles={{
    control: (base, state) => ({
      ...base,
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "12px",
      padding: "6px",
      boxShadow: state.isFocused
        ? "0 0 0 2px rgba(99,102,241,0.4)"
        : "none",
      backdropFilter: "blur(10px)",
      cursor: "pointer"
    }),

    menu: (base) => ({
      ...base,
      background: "rgba(247,250,252,0.8)",
      borderRadius: "12px",
      padding: "6px",
      backdropFilter: "blur(10px)"
    }),

    option: (base, state) => ({
      ...base,
      background: state.isSelected
        ? "#22c55e"
        : "transparent",
       color: state.isSelected ? "white" : "#111", // ✅ FIXED
        // 🚫 REMOVE blue focus completely
     active: {
    backgroundColor: "#22c55e"},
      padding: "10px",
      borderRadius: "8px",
      cursor: "pointer"
    }),
    

    singleValue: (base) => ({
      ...base,
      color: "#111", // match your card text
      fontWeight: "500"
    }),

    placeholder: (base) => ({
      ...base,
      color: "rgba(0,0,0,0.5)"
    }),

    dropdownIndicator: (base) => ({
      ...base,
      color: "#666"
    }),

    indicatorSeparator: () => ({
      display: "none"
    })
  }}
  
/>
            </div>

            {/* DROP ZONE */}
            <div className="upload2Field">
              <label className="upload2Label">Your Resume</label>
              <div
                className={`upload2Drop ${drag ? "upload2DropDrag" : ""} ${file ? "upload2DropFilled" : ""}`}
                onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
                onDragLeave={() => setDrag(false)}
                onDrop={handleDrop}
              >
                {!file ? (
                  <>
                    <div className="upload2DropIcon" style={{ color: drag ? "#67e8f9" : "rgba(255,255,255,0.4)" }}>
                      {drag ? dragIcon : uploadIcon}
                    </div>
                    <p className="upload2DropText">
                      {drag ? "Drop it here!" : "Drag & drop your resume"}
                    </p>
                    <span className="upload2DropHint">or click to browse PDF</span>
                    <input
                      type="file"
                      accept=".pdf"
                      className="upload2Input"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </>
                ) : (
                  <div className="upload2FilePreview">
                    <div className="upload2FileIcon" style={{ color: "#a78bfa" }}>
                      {fileIcon}
                    </div>
                    <div className="upload2FileInfo">
                      <span className="upload2FileName">{file.name}</span>
                      <span className="upload2FileSize">
                        {(file.size / 1024).toFixed(1)} KB · PDF
                      </span>
                    </div>
                    <button
                      type="button"
                      className="upload2FileRemove"
                      onClick={() => setFile(null)}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6"  y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* SUBMIT */}
            <button type="submit" className="upload2Btn" disabled={loading}>
              {loading ? (
                <span className="upload2BtnLoading">
                  <span className="upload2Spinner" />
                  Analysing…
                </span>
              ) : (
                <>
                  Analyse My Resume
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </>
              )}
            </button>

          </form>

          <p className="upload2Trust">
            {lockIcon}
            Your resume is never stored or shared
          </p>

        </div>
      </div>
    </section>
  );
}

export default UploadSection;