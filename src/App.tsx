import "./App.css";
import { BrowserRouter, useNavigate } from "react-router-dom";
import AppRoutes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

function App() {
  return (
    <div className="app">
      <div className="background"></div>
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
