import React from "react";
import { useMediaQuery } from "@mui/material";
import FlexBetween from "./FlexBetween";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  return (
    <div
      className="navbar"
      style={{ paddingRight: "120px", paddingLeft: "120px" }}
    >
      <FlexBetween gap="1.75rem">
        <FlexBetween>Personal Care</FlexBetween>
        <FlexBetween>Landscaping</FlexBetween>
        <FlexBetween>Plumbing</FlexBetween>
        <FlexBetween>Electrical</FlexBetween>
        <FlexBetween>More...</FlexBetween>
      </FlexBetween>
    </div>
  );
}

export default Navbar;
