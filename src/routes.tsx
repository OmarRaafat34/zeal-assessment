import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./views/home/home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <React.Suspense fallback={<>...</>}>
            <Home />
          </React.Suspense>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
