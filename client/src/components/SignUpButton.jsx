//
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignUpButton = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <h3>Sign Up</h3>
    </Box>
  );
};

export default SignUpButton;
