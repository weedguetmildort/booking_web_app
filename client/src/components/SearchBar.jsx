import React, { useContext, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { SearchContext } from "../SearchContext";


function SearchBar({ onSearch }) {
  const {loadSearch} = useContext(SearchContext)
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  async function onSearch(query) {

  //   // Request to send data to backend
  //   axios
  //   .post("http://localhost:5002/db/api/getSearchResults", {"criteria": query})
  //   .then((response) => { console.log(response);
  //   navigate("/search")
  // });

  //console.log(axios.get("http://localhost:5002/db/api/getSearchResults/com").then(response => response.data))

  const url = `http://localhost:5002/db/api/getSearchResults/${query}`

  const response = await axios.get(url);
  console.log(response);
  const searchResults = response.data.data;
  loadSearch(searchResults);
  navigate("/search");

  }

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(query);
  };


  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Services or Businesses"
        style={{ padding: "10px", margin: "5px" }}
      />
      <button type="submit" style={{ padding: "10px", margin: "5px" }}>
        Search
      </button>
    </form>
  );
}

export default SearchBar;
