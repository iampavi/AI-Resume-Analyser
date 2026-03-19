import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import StaggeredMenu from "./StaggeredMenu";

function Navbar() {
  const { setAuthType } = useContext(AuthContext);
  const [userEmail, setUserEmail] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const email = localStorage.getItem("email");
    setUserEmail(email);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const cur = window.scrollY;
      setShowNavbar(cur <= lastScrollY || cur <= 80);
      setLastScrollY(cur);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setUserEmail(null);
    window.location.reload();
  };

  const getInitials = (email) =>
    email?.substring(0, 2).toUpperCase() ?? "";

  const menuItems = [
    { label: "Home",           link: "/"       },
    { label: "Analyse Resume", link: "#upload" },
    { label: "Results",        link: "#score"  },
    { label: "Learn",          link: "#learn"  },
  ];

  const socialItems = [
    { label: "GitHub",   link: "https://github.com"   },
    { label: "LinkedIn", link: "https://linkedin.com" },
  ];

  return (
    <nav className={`navbar ${showNavbar ? "showNav" : "hideNav"}`}>

      {/* LEFT — Logo */}
      <a href="/" className="logo">
        <div className="logoIcon">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M9 12h6M9 8h6M9 16h4M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"
              stroke="white" strokeWidth="1.8" strokeLinecap="round"
            />
          </svg>
        </div>
        <span className="logoText">ResumeAI</span>
      </a>

      {/* RIGHT — Actions + Menu */}
      <div className="navRight">

        {/* Buttons come FIRST (left of menu button) */}
        <div className="navActions">
          {userEmail ? (
            <div className="userProfile">
              <div className="avatar">{getInitials(userEmail)}</div>
              <span className="userText">{userEmail}</span>
              <button className="logoutBtn" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <button
                className="primaryBtn"
                onClick={() => setAuthType("register")}
              >
                Get Started
              </button>
              <button
                className="primaryBtn2"
                onClick={() => setAuthType("login")}
              >
                Log In
              </button>
            </>
          )}
        </div>

        {/* Menu button LAST (rightmost) */}
        <StaggeredMenu className="menuTriggerWrap"
          items={menuItems}
          socialItems={socialItems}
           menuButtonColor="#374151"
    openMenuButtonColor="#374151"
        />

      </div>
    </nav>
  );
}

export default Navbar;