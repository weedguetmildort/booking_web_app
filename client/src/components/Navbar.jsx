import React from "react";
import { Routes, Route, Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="nav flex flex-row gap-3">
      <p>Personal Care</p>
      <p>Landscaping</p>
      <p>Plumbing</p>
      <p>Electrical</p>
      <p>More...</p>
    </div>
  );
}

export default Navbar;
