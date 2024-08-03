import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

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
