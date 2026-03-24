import { motion } from "framer-motion";
import profileImg from "../assets/profile.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

export default function About() {
  return (
    <>
      <Navbar variant="dark" />
      <div className="about-wrapper">
        <div className="about-container">

          {/* LEFT PROFILE CARD */}
          <motion.div
            className="profile-card"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <img src={profileImg} alt="profile" />

            <h3>Pavithran D</h3>


            {/* 🔥 CONTACT ICONS */}
            <div className="social-icons">
              <a href="mailto:dpavithran2002@gmail.com" target="_blank" rel="noreferrer">
                <FaEnvelope />
              </a>

              <a href="https://github.com/iampavi" target="_blank" rel="noreferrer">
                <FaGithub />
              </a>

              <a href="https://linkedin.com/in/pavithran-d-766a90260" target="_blank" rel="noreferrer">
                <FaLinkedin />
              </a>
            </div>

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
              Experienced in developing scalable web applications using ASP.NET Core, Web API, React, and SQL Server.
              Built real-time client projects including document automation and employee management systems,
              with a strong focus on performance, clean architecture, and user experience.
            </p>



            {/* STATS */}
            <div className="stats">
              <div><h2>1+</h2><span>Years Experience</span></div>
              <div><h2>5+</h2><span>Projects</span></div>
              <div><h2>2+</h2><span>Clients</span></div>
            </div>



          </div>
          {/* SKILL CARDS */}
          <div className="cards">
            <div className="card2">
              <h4>Architecture & Concepts</h4>
              <p>REST APIs, Authentication, RBAC, Microservices Basics</p>
            </div>
            <div className="card">
              <h4>Backend Development</h4>
              <p>ASP.NET Core, Web API, SQL Server, Background Services</p>
            </div>

            <div className="card green">
              <h4>Frontend</h4>
              <p>React, JavaScript, HTML, CSS, API Integration</p>
            </div>

          </div>
        </div>
      </div>
      <Footer variant="dark" />
    </>
  );
}