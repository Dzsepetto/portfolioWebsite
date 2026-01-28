import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TransitionProvider } from "./context/TransitionContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageTransitionOverlay from "./components/PageTransitionOverlay";

import Home from "./pages/Home";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";

import './i18n';
import { useTranslation } from "react-i18next";
import { useEffect } from "react";


function App() {

  const{t, i18n} = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, [])

  return (
    <TransitionProvider>
      <Router>
        <PageTransitionOverlay />

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
        <Footer />
      </Router>
    </TransitionProvider>
  );
}

export default App;
