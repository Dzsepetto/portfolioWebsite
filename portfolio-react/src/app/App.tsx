import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { TransitionProvider } from "./providers/TransitionProvider";

import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import PageTransitionOverlay from "../components/transitions/PageTransitionOverlay/PageTransitionOverlay";

const Home = lazy(() => import("../features/home/Home"));
const About = lazy(() => import("../features/about/About"));
const Experience = lazy(() => import("../features/experience/Experience"));
const Projects = lazy(() => import("../features/projects/Projects"));

function AppContent() {
  const location = useLocation();
  const isAboutPage = location.pathname === "/about";

  return (
    <div className="app-shell">
      <PageTransitionOverlay />
      <Navbar />

      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </Suspense>

      {!isAboutPage && <Footer />}
    </div>
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