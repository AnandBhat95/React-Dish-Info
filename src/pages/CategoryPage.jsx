import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import SearchComponent from "../components/SearchComponent";
import BackButton from "../components/BackButton";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
        );
        const data = await response.json();
        setMeals(data.meals);
        setFilteredMeals(data.meals);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };
    fetchMeals();
  }, [categoryName]);

  const handleSearch = (query) => {
    const filtered = meals.filter((meal) =>
      meal.strMeal.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMeals(filtered);
  };

  const handleMealClick = (mealName) => {
    navigate(`/meal/${mealName}`);
  };


  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Header */}

      <BackButton />
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
        Meals in {categoryName}
      </header>

      <SearchComponent onSearch={handleSearch} placeholder="Search meals..." />

      {/* Meals Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {filteredMeals.map((meal) => (
          <div
            key={meal.idMeal}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              transition: "transform 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onClick={() => handleMealClick(meal.strMeal)}
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "10px", textAlign: "center" }}>
              <h3 style={{ margin: "0", fontSize: "1.2rem" }}>{meal.strMeal}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
