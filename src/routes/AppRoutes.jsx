import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home/home";
import NotFound from "../pages/notFound";
import UserPage from "../pages/userPage";
//import Login from "../pages/auth/Login";
//import ProtectedRoute from "../components/protectedRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userpage/:userId/:subIds" element={<UserPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
