import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import CategoryPage from "./pages/CategoryPage";
import RouteGuard from "./components/RouteGuard";
import MealPage from "./pages/MealPage";

const App = () => {
  const user = JSON.parse(localStorage.getItem("user")); // Check user on initial load

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route
          path="/dashboard"
          element={
            <RouteGuard>
              <Dashboard />
            </RouteGuard>
          }
        />
         <Route
          path="/category/:categoryName"
          element={
            <RouteGuard>
              <CategoryPage />
            </RouteGuard>
          }
        />
         <Route
         path="/meal/:mealName"
          element={
            <RouteGuard>
             <MealPage />
            </RouteGuard>
          }
        />
      </Routes>
      
    </Router>
  );
};

export default App;
