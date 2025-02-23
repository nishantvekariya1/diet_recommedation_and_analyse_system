import React from "react";
import "./Navbar.css";
import Dropdown from "./dropdown";

export default function Navbar({ isLoggedIn=false }) {
  const handleSpaClick = () => {
    const email = localStorage.getItem("email");
    if (email) {
      window.location.href = "/home";
    } else {
      window.location.href = "/login";
    }
  };

  const handleAuthButtonClick = () => {
    if (isLoggedIn) {
      localStorage.clear();
    }
    window.location.href = "/";
  };

  return (
    <div className="Navbar">
      <span className="material-symbols-outlined" onClick={handleSpaClick}>spa</span>
      <ul className="nav-list">
        <a href="/home">
          <li>Home</li>
        </a>
        <a href="/update">
          <li>Update</li>
        </a>
      </ul>
      <div className="Resume-Nav">
        <button className="resume-btn" onClick={handleAuthButtonClick}>
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
      {/* <Dropdown /> */}
    </div>
  );
}
