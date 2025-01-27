import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        const data = await response.json();
        setCategories(data.categories);
        setFilteredCategories(data.categories); // Initially show all
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${categoryName}`);
  };

  const handleSearch = (query) => {
    const filtered = categories.filter((category) =>
      category.strCategory.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const handleInfoClick = (category) => {
    setSelectedCategory(category);
  };

  const closeModal = () => {
    setSelectedCategory(null);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <header
        style={{
          backgroundColor: "#ff5722",
          color: "white",
          padding: "20px",
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        Let's Enable the Craving
      </header>

      {/* Search Component */}
      <div style={{ padding: "10px 20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search categories..."
          onChange={(e) => handleSearch(e.target.value)}
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

      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Welcome, {user?.username || "Guest"}!</h2>
      </div>

      {/* Categories Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {filteredCategories.map((category) => (
          <div
            key={category.idCategory}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              position: "relative",
              cursor: "pointer",
            }}
            onClick={() => handleCategoryClick(category.strCategory)}
          >
            <img
              src={category.strCategoryThumb}
              alt={category.strCategory}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                padding: "10px",
                textAlign: "center",
              }}
            >
              <h3 style={{ margin: "0", fontSize: "1.2rem" }}>
                {category.strCategory}
              </h3>
              <p
                style={{
                  margin: "10px 0 0",
                  fontSize: "0.9rem",
                  color: "#555",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {category.strCategoryDescription}
              </p>
              {/* Info Icon */}
              <span
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the card click
                  handleInfoClick(category);
                }}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  cursor: "pointer",
                  color: "#ff5722",
                  fontSize: "1.5rem",
                }}
              >
               <b  style={{
              border: "1px solid black",
              borderRadius: "4px",
              padding:"0 5px 0 5px",
              background:"black"
            }}>i</b>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Full Description */}
      {selectedCategory && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "1000",
          }}
          onClick={closeModal}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              maxWidth: "500px",
              width: "90%",
              boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{selectedCategory.strCategory}</h3>
            <p>{selectedCategory.strCategoryDescription}</p>
            <button
              onClick={closeModal}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#ff5722",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
