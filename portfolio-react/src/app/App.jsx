import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import ParallaxJourney from "../components/parallax/parallax/ParallaxJourney";

function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="app-main">
        <ParallaxJourney />
      </main>

      <Footer />
    </div>
  );
}

export default App;