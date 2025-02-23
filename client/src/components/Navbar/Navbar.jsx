import React from "react";
import "./Navbar.css";
import Dropdown from "./dropdown";

let Resume = () => {
  // window.open("", "_blank");
};

export default function Navbar() {
  return (
    <div className="Navbar">
      <span className="material-symbols-outlined logo">roofing</span>
      <ul className="nav-list">
        <a href="#about">
          <li>About us</li>
        </a>

        <a href="lastsec">
          <li>Contact</li>
        </a>
      </ul>

      <div className="Resume-Nav">
        <button className="resume-btn" onClick={Resume}>
          Login
        </button>
      </div>
      <Dropdown />
    </div>
  );
}
