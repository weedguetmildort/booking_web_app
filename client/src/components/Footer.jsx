import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer flex flex-row gap-3">
      <Link to="/contact">Contact Us</Link>
      <Link to="/about">About</Link>
    </div>
  );
}

export default Footer;
