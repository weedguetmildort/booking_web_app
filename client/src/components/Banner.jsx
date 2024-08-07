import React from "react";
import logo from "../assets/images/logo.png";
import FlexBetween from "./FlexBetween";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate = useNavigate();
  return (
    <FlexBetween>
      <div className="container">
        <img
          src={logo}
          alt="Logo"
          onClick={() => navigate("/")}
          style={{
            maxWidth: "4%",
            height: "auto",
            display: "block",
            cursor: "pointer",
          }}
        />
        <Typography
          fontWeight="bold"
          fontSize="clamp(2rem, 4rem, 4.5rem)"
          color="azure"
          onClick={() => navigate("/")}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          Albert's List
        </Typography>
      </div>
    </FlexBetween>
  );
}

export default Banner;
