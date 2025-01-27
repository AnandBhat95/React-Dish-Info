import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";

const MealPage = () => {
  const { mealName } = useParams(); // Extract meal name from URL
  const [mealDetails, setMealDetails] = useState(null);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
        );
        const data = await response.json();
        setMealDetails(data.meals ? data.meals[0] : null); // Assuming only one meal matches
      } catch (error) {
        console.error("Error fetching meal details:", error);
      }
    };

    fetchMealDetails();
  }, [mealName]);

  if (!mealDetails) {
    return <p>Loading meal details...</p>;
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      {/* Meal Header */}
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
        {mealDetails.strMeal}
      </header>

      {/* Meal Details */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        {/* Meal Image */}
        <img
          src={mealDetails.strMealThumb}
          alt={mealDetails.strMeal}
          style={{
            width: "300px",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          }}
        />

        {/* Meal Info */}
        <div style={{ marginTop: "20px", textAlign: "center", maxWidth: "600px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
            Category: {mealDetails.strCategory}
          </h2>
          <h3 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
            Area: {mealDetails.strArea}
          </h3>
          <p style={{ fontSize: "1rem", color: "#555", marginTop: "10px" }}>
            {mealDetails.strInstructions}
          </p>
        </div>

        {/* Ingredients Table */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h3 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
            Ingredients
          </h3>
          <ul style={{ listStyleType: "none", padding: "0" }}>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => {
              const ingredient = mealDetails[`strIngredient${i}`];
              const measure = mealDetails[`strMeasure${i}`];
              return (
                ingredient && (
                  <li
                    key={i}
                    style={{
                      fontSize: "1rem",
                      color: "#333",
                      marginBottom: "5px",
                    }}
                  >
                    {ingredient} - {measure}
                  </li>
                )
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MealPage;
