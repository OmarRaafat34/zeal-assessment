import React, { useEffect, useRef } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./views/home/home";
import Categories from "./views/categories/categories";
import Questions from "./views/questions/questions";
import { getData, removeData } from "./config/storage";

const AppRoutes = () => {
  const token = getData("token");
  const navigate = useNavigate();
  const inactivityTimeout = useRef<NodeJS.Timeout | null>(null);
  const inactivityTimer = 6 * 60 * 60 * 1000;

  const resetInactivityTimer = () => {
    if (inactivityTimeout.current) {
      clearTimeout(inactivityTimeout.current);
    }
    inactivityTimeout.current = setTimeout(() => {
      removeData("token");
      navigate("/");
    }, inactivityTimer);
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    const activityEvents = ["mousemove", "keydown", "touchstart"];
    activityEvents.forEach((event) =>
      window.addEventListener(event, resetInactivityTimer)
    );

    resetInactivityTimer();

    return () => {
      if (inactivityTimeout.current) {
        clearTimeout(inactivityTimeout.current);
      }
      activityEvents.forEach((event) =>
        window.removeEventListener(event, resetInactivityTimer)
      );
    };
  }, [token, navigate]);

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
      {token && (
        <>
          <Route
            path="/categories"
            element={
              <React.Suspense fallback={<>...</>}>
                <Categories />
              </React.Suspense>
            }
          />
          <Route
            path="/questions"
            element={
              <React.Suspense fallback={<>...</>}>
                <Questions />
              </React.Suspense>
            }
          />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
