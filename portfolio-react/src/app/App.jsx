import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import ParallaxJourney from "../components/parallax/parallax/ParallaxJourney";

import LoadingScreen from "../components/loading/LoadingScreen";
import useImagePreloader from "../hooks/useImagePreloader";
import { preloadImages } from "../lib/preloadImages";

function App() {
  const { loaded, progress } = useImagePreloader(preloadImages);

  const [showLoader, setShowLoader] = useState(true);
  const [hidingLoader, setHidingLoader] = useState(false);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    setHidingLoader(true);

    const timeout = setTimeout(() => {
      setShowLoader(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [loaded]);

  return (
    <>
      {showLoader && (
        <LoadingScreen
          progress={progress}
          hiding={hidingLoader}
        />
      )}

      {loaded && (
        <div className="app-shell">
          <Navbar />

          <main className="app-main">
            <ParallaxJourney />
          </main>

          <Footer />
        </div>
      )}
    </>
  );
}

export default App;