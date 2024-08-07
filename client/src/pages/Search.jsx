import React, { useContext } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import Banner from "components/Banner";
import FlexBetween from "components/FlexBetween";
import User from "components/User";
import Navbar from "components/Navbar";
import { BusinessContext } from "BusinessContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Search() {
  const searchResultsArray = JSON.parse(localStorage.getItem("search")) || [];

  const { loadBusiness, clearBusiness } = useContext(BusinessContext);

  const navigate = useNavigate();

  const initializeBusiness = async (pid) => {
    clearBusiness();

    const response1 = await axios.get(
      `http://localhost:5002/db/api/getBusiness/${pid}`
    );

    const partner = response1.data.data[0];
    const response2 = await axios.get(
      `http://localhost:5002/db/api/getServices/${pid}`
    );
    const service = response2.data.data[0];

    const business = {
      pid: pid,
      name: partner.businessName,
      category: partner.category,
      address: partner.address,
      state: partner.state,
      zip: partner.zip,
      city: partner.city,
      about: partner.aboutUs,
      serviceName: service.name,
      duration: service.duration,
      cost: service.cost,
      description: service.description,
    };

    loadBusiness(business);

    navigate("/landing");
  };

  return (
    <div>
      <div>
        <FlexBetween>
          <Banner />
          <User />
        </FlexBetween>

        <Navbar />
      </div>
      <div>
        {/* Heading */}
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="left"
          padding={2}
          className="center"
        >
          Search Results:
        </Typography>

        {/* Search Results */}
        <Grid container spacing={8} padding={2} className="center">
          {searchResultsArray.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                variant="outlined"
                sx={{
                  minWidth: 275, // Set minimum width
                  minHeight: 250, // Set minimum height
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="div">
                    <h3
                      underline="hover"
                      color="primary"
                      onClick={() => initializeBusiness(item.pID)}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      {item.businessname}
                    </h3>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    About Us: {item.aboutus}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Address: {item.address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    State: {item.state}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ZIP: {item.zip}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Services: {item.servicename}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Search;
