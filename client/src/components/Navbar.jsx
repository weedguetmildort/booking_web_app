import React, { useContext } from "react";
import FlexBetween from "./FlexBetween";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../SearchContext";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const { loadSearch } = useContext(SearchContext);

  const search = async (query) => {
    const url = `http://localhost:5002/db/api/getSearchResults/${query}`;
    const response = await axios.get(url);
    console.log(response);
    const searchResults = response.data.data;
    loadSearch(searchResults);
    navigate("/search");
  };

  return (
    <div
      className="navbar"
      style={{ paddingRight: "120px", paddingLeft: "120px" }}
    >
      <FlexBetween gap="1.75rem">
        <FlexBetween
          onClick={() => search("Personal Care")}
          style={{
            cursor: "pointer",
          }}
        >
          Personal Care
        </FlexBetween>
        <FlexBetween
          onClick={() => search("Landscaping")}
          style={{
            cursor: "pointer",
          }}
        >
          Landscaping
        </FlexBetween>
        <FlexBetween
          onClick={() => search("Plumbing")}
          style={{
            cursor: "pointer",
          }}
        >
          Plumbing
        </FlexBetween>
        <FlexBetween
          onClick={() => search("Electrical")}
          style={{
            cursor: "pointer",
          }}
        >
          Electrical
        </FlexBetween>
        <FlexBetween
          onClick={() => search("Handy Work")}
          style={{
            cursor: "pointer",
          }}
        >
          Handy Work
        </FlexBetween>
      </FlexBetween>
    </div>
  );
}

export default Navbar;
