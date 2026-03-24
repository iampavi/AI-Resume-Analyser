import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Footer({ variant = "light" }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      className={`footer ${variant === "dark" ? "footer-dark" : ""}`}
      style={{
        backgroundPositionY: offset * 0.3 + "px",
      }}
    >
      <div className="footerContainer">

        <div className="footerBrand">
          <div className="footerLogoRow">
            <div className="footerLogoIcon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M9 12h6M9 8h6M9 16h4M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"
                  stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="footerLogoName">ResumeAI</span>
          </div>
          <p>
            AI-powered resume analysis that helps job seekers stand out.
            Get instant feedback on ATS, skills, and impact.
          </p>
        </div>

        <div className="footerColumn">
          <h4>Product</h4>
          <a href="#upload">Analyse Resume</a>
          <a href="#learn">How It Works</a>
          <a href="#score">Score Breakdown</a>
        </div>

        <div className="footerColumn">
          <h4>Roles</h4>
          <a href="#upload">Backend Dev</a>
          <a href="#upload">Frontend Dev</a>
          <a href="#upload">Full Stack</a>
          <a href="#upload">Data Analyst</a>
          <a href="#upload">DevOps</a>
        </div>

        <div className="footerColumn">
          <h4>Company</h4>
          <Link to="/about">About</Link>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-use">Terms of Use</a>
          <a href="/about">Contact</a>
        </div>

      </div>

      <div className="footerBottom">
        <span>© 2026 ResumeAI — All rights reserved</span>
        <div className="footerSocials">

          {/* GitHub */}
          <a className="footerSocialBtn" href="https://github.com" target="_blank" rel="noreferrer" title="GitHub">
            <svg viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"/>
            </svg>
          </a>

          {/* LinkedIn */}
          <a className="footerSocialBtn" href="https://linkedin.com" target="_blank" rel="noreferrer" title="LinkedIn">
            <svg viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>

          {/* X / Twitter */}
          <a className="footerSocialBtn" href="https://twitter.com" target="_blank" rel="noreferrer" title="X">
            <svg viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>

        </div>
      </div>
    </footer>
  );
}

export default Footer;