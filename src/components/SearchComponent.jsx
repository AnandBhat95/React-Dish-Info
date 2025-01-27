import React from "react";

const SearchComponent = ({ onSearch, placeholder }) => {
  return (
    <div style={{ padding: "10px 20px", textAlign: "center" }}>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
        style={{
          width: "80%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          fontSize: "1rem",
        }}
      />
    </div>
  );
};

export default SearchComponent;
