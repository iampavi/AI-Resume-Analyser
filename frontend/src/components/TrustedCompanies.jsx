import {
  FaAmazon,
  FaGoogle,
  FaMicrosoft,
  FaApple,
  FaGithub,
  FaLinkedin
} from "react-icons/fa";
import { useState } from "react";

const icons = [
  { icon: FaMicrosoft, name: "Microsoft" },
  { icon: FaAmazon, name: "Amazon" },
  { icon: FaGoogle, name: "Google" },
  { icon: FaApple, name: "Apple" },
  { icon: FaGithub, name: "GitHub" },
  { icon: FaLinkedin, name: "LinkedIn" }
];

export default function TrustedCompanies() {

  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    text: ""
  });

  const handleMove = (e, name) => {
    setTooltip({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      text: `Trusted By Companies like - ${name}`
    });

    // magnetic effect
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.15)`;
  };

  const handleLeave = (e) => {
    setTooltip((prev) => ({ ...prev, visible: false }));
    e.currentTarget.style.transform = "translate(0,0) scale(1)";
  };

  return (
    <section className="trustedSection">

      <div className="scrollWrapper">
        {[...icons, ...icons, ...icons, ...icons].map((item, i) => {
          const Icon = item.icon;

          return (
            <div
              key={i}
              className="logoItem"
              onMouseMove={(e) => handleMove(e, item.name)}
              onMouseLeave={handleLeave}
            >
              <Icon />
            </div>
          );
        })}
      </div>

      {tooltip.visible && (
        <div
          className="cursorTooltip"
          style={{
            top: tooltip.y + 15,
            left: tooltip.x + 15
          }}
        >
          {tooltip.text}
        </div>
      )}

    </section>
  );
}