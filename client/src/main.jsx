import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css"; // ← ONLY import style.css

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
