import React from "react";
import { Box, useMediaQuery } from "@mui/material";

function PartnerSignUp() {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <Box
      width={isSmallScreen ? "50%" : "93%"}
      p="2rem"
      m="2rem auto"
      borderRadius="1.5rem"
    >
      partnerSignup
    </Box>
  );
}

export default PartnerSignUp;
