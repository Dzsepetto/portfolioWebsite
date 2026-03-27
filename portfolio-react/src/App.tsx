import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { TransitionProvider } from "./context/TransitionContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageTransitionOverlay from "./components/PageTransitionOverlay";

import Home from "./pages/Home";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";

import "./i18n";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function AppContent() {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, [i18n]);

  const isAboutPage = location.pathname === "/about";

  return (
    <>
      <PageTransitionOverlay />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>

      {!isAboutPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <TransitionProvider>
      <Router>
        <AppContent />
      </Router>
    </TransitionProvider>
  );
}

export default App;