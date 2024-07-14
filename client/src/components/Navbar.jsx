import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Routes, Route, Link } from "react-router-dom";
import FlexBetween from "./FlexBetween";

function Navbar() {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <FlexBetween class="mx-auto nav">
      <FlexBetween gap="1.75rem">
        <FlexBetween>Personal Care</FlexBetween>
        <FlexBetween>Landscaping</FlexBetween>
        <FlexBetween>Plumbing</FlexBetween>
        <FlexBetween>Electrical</FlexBetween>
        <FlexBetween>More...</FlexBetween>
      </FlexBetween>
    </FlexBetween>
  );
}

export default Navbar;
