import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { TransitionProvider } from "./providers/TransitionProvider";

import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import PageTransitionOverlay from "../components/transitions/PageTransitionOverlay/PageTransitionOverlay";

import Home from "../features/home/Home";
import About from "../features/about/About";
import Experience from "../features/experience/Experience";
import Projects from "../features/projects/Projects";
import Lounge3D from "../features/lounge/Lounge3D";

function AppContent() {
  const location = useLocation();

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
       <Route path="/lounge" element={<Lounge3D />} />
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