import { useState } from "react";
import aiImage from "../assets/ai-illustration.jpg";

const scanItems = [
  {
    title: "Skill Detection",
    desc: "AI scans your resume and detects all technical and soft skills automatically.",
    color: "#6366f1",
    bg: "#eef2ff",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&fit=crop"
  },
  {
    title: "ATS Compatibility",
    desc: "Checks if your resume passes ATS systems used by top recruiters.",
    color: "#8b5cf6",
    bg: "#f3eeff",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80&fit=crop"
  },
  {
    title: "Keyword Matching",
    desc: "Matches your resume keywords with the target job role requirements.",
    color: "#06b6d4",
    bg: "#e0f9ff",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80&fit=crop"
  }
];

function AIScanSection() {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % scanItems.length);
  };

  return (
    <section className="aiSection">
      <div className="aiLayout">

        {/* LEFT */}
        <div className="aiLeft">
          <div className="cardStack" onClick={handleNext}>
            {scanItems.map((item, i) => {
              const position =
                (i - active + scanItems.length) % scanItems.length;

              return (
                <div
                  key={i}
                  className="stackCard"
                  style={{
                    transform: `
                      translate(-50%, calc(-50% + ${position * 14}px))
                      scale(${1 - position * 0.06})
                    `,
                    zIndex: 100 - position,
                    opacity: position > 4 ? 0 : 1
                  }}
                >
                  {/* ✅ CLEAN CARD */}
                <div className="stackInner">

  <img src={item.image} alt={item.title} />

  <div className="stackOverlay">
    <span className="stackTag">{item.title}</span>
  </div>

</div>

                
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT */}
        <div className="aiRight">

          <div className="aiImage">
            <img src={aiImage} alt="AI analysis" />
          </div>

          <div className="aiText" key={active}>
            <h3>{scanItems[active].title}</h3>
            <p>{scanItems[active].desc}</p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AIScanSection;