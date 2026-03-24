import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import StaggeredMenu from "./StaggeredMenu";

function Navbar( { variant = "light" }) {
  const { setAuthType, user, logout } = useContext(AuthContext);

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  // 🔥 Hide navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const cur = window.scrollY;
      setShowNavbar(cur <= lastScrollY || cur <= 80);
      setLastScrollY(cur);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // 🔥 Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest(".userProfileWrapper")) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const getInitials = (email) =>
    email?.substring(0, 2).toUpperCase() ?? "";

  const menuItems = [
    { label: "Home", link: "/" },
    { label: "Analyse Resume", link: "#upload" },
    { label: "Results", link: "#score" },
    { label: "Learn", link: "#learn" },
  ];

  const socialItems = [
    { label: "GitHub", link: "https://github.com" },
    { label: "LinkedIn", link: "https://linkedin.com" },
  ];

  return (
    <nav className={`navbar ${variant === "dark" ? "navbar-dark" : ""} ${showNavbar ? "showNav" : "hideNav"}`}>
      
      {/* LEFT — Logo */}
      <a href="/" className="logo">
        <div className="logoIcon">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M9 12h6M9 8h6M9 16h4M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <span className="logoText">ResumeAI</span>
      </a>

      {/* RIGHT — Actions + Menu */}
      <div className="navRight">

        <div className="navActions">
          {user?.email ? (
            <div className="userProfileWrapper">

              {/* 🔥 Avatar */}
              <div
                className="avatar"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
              >
                {getInitials(user.email)}
              </div>

              {/* 🔥 Dropdown */}
              {showMenu && (
                <div className="userDropdown">
                  <p className="userEmail">{user.email}</p>
                  <button className="logoutBtn" onClick={logout}>
                    Logout
                  </button>
                </div>
              )}
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

        {/* Menu */}
        <StaggeredMenu
          className="menuTriggerWrap"
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