import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer flex flex-row gap-3">
      <Link to="/contact" className="custom-button">Contact Us</Link>
      <Link to="/about" className="custom-button">About</Link>
    </div>
  );
}

export default Footer;
