import { motion } from "framer-motion";
import profileImg from "../assets/profile.jpg";

export default function About() {
  return (
    <div className="about-container">

      {/* LEFT PROFILE CARD */}
      <motion.div 
        className="profile-card"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <img src={profileImg} alt="profile" />

        <h3>PAVI</h3>

        <p>
          Full-stack developer focused on building AI-powered applications.
        </p>
      </motion.div>

      {/* RIGHT CONTENT */}
      <div className="about-content">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          FULL STACK <br /> DEVELOPER
        </motion.h1>

        <p className="about-desc">
          Passionate about creating scalable applications using React and ASP.NET Core,
          with AI integrations for smarter user experiences.
        </p>

        {/* STATS */}
        <div className="stats">
          <div><h2>1+</h2><span>Years Experience</span></div>
          <div><h2>5+</h2><span>Projects</span></div>
          <div><h2>3+</h2><span>Clients</span></div>
        </div>

        {/* SKILL CARDS */}
        <div className="cards">
          <div className="card">
            <h4>Backend Development</h4>
            <p>ASP.NET Core, APIs</p>
          </div>

          <div className="card green">
            <h4>Frontend</h4>
            <p>React, UI Design</p>
          </div>
        </div>

        {/* EXPERIENCE */}
        <h2 className="exp-title">MY EXPERIENCE</h2>

        <div className="experience">
          <h4>AI Resume Analyzer</h4>
          <p>Built full-stack AI app using Groq + ASP.NET</p>
        </div>

      </div>
    </div>
  );
}