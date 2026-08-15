import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import GenerateResume from "./pages/GenerateResume";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route
          path="/generate-resume"
          element={<GenerateResume />}
        />

      </Routes>
    </BrowserRouter>
  </StrictMode>
);