import React from "react";
import "./Logo.css";
import logo from "../assets/logo.png";

function Logo() {
  return (
    <section>
      <div className="container">
        {/* <img className="logo" src={logo} alt="logo" /> */}
        <h1 data-text="Conquer The Crown">Conquer The Crown</h1>
      </div>
    </section>
  );
}

export default Logo;
