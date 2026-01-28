import "../styles/Home.css";
import ProfileImage from "../assets/images/main.jpg";

import '../i18n';
import { useTranslation } from "react-i18next";

export default function Home() {
  const{t, i18n} = useTranslation();
  return (
    <section className="home">
      <div className="home-container">
       
        {/* LEFT – IMAGE */}
        <div className="home-image">
          <img src={ProfileImage} alt="Home" />
        </div>

        {/* RIGHT – TEXT */}
        <div className="home-content">
          <h1>Benedek Pintér</h1>

          <div className="home-cards">

            <div className="home-card">
              <h3>Experience</h3>
                 <p>{t("home_experience")}</p>
            </div>

            <div className="home-card">
              <h3>AI Master?</h3>
              <p>{t("home_aimaster")}</p>
            </div>

            <div className="home-card">
              <h3>Degree</h3>
              <p>{t("home_degree")}</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
