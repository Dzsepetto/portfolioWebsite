import "../styles/Home.css";
import ProfileImage from "../assets/images/main.jpg";

import "../i18n";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function Home() {
  const { t } = useTranslation();

  const [mainLoaded, setMainLoaded] = useState(false);
  const [avatarLoaded, setAvatarLoaded] = useState(false);

  return (
    <section className="home">
      <div className="home-container">
        <div className="home-image">
          <div className="home-image-frame">
            {!mainLoaded && <div className="skeleton skeleton-main" />}

            <img
              src={ProfileImage}
              alt="Home"
              className={`home-img ${mainLoaded ? "loaded" : ""}`}
              onLoad={() => setMainLoaded(true)}
            />
          </div>
        </div>

        <div className="home-content">
          <div className="home-header">
            <div className="avatar-wrapper">
              {!avatarLoaded && <div className="skeleton skeleton-avatar" />}

              <img
                className={`home-avatar ${avatarLoaded ? "loaded" : ""}`}
                src={ProfileImage}
                alt="Profile"
                onLoad={() => setAvatarLoaded(true)}
              />
            </div>

            <h1>{t("home_title")}</h1>
          </div>

          <div className="home-cards">
            <div className="home-card">
              <h3>{t("home_experience_title")}</h3>
              <p>{t("home_experience")}</p>
            </div>

            <div className="home-card">
              <h3>{t("home_aimaster_title")}</h3>
              <p>{t("home_aimaster")}</p>
            </div>

            <div className="home-card">
              <h3>{t("home_degree_title")}</h3>
              <p>{t("home_degree")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}