import React from "react";
import LandingPage from "./pages/LandingPage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import ExamplesPage from "./pages/ExamplesPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/examples" element={<ExamplesPage />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
