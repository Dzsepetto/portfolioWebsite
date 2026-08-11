import PortfolioIMG400 from "../assets/images/project-images/porfolio-400.webp";
import PortfolioIMG800 from "../assets/images/project-images/porfolio-800.webp";
import PortfolioIMG from "../assets/images/project-images/porfolio.webp";

import OnlineGamesIMG400 from "../assets/images/project-images/OnlineGames-400.webp";
import OnlineGamesIMG800 from "../assets/images/project-images/OnlineGames-800.webp";
import OnlineGamesIMG from "../assets/images/project-images/OnlineGames.webp";

import RikikiKings400 from "../assets/images/project-images/rikikikings-400.webp";
import RikikiKings800 from "../assets/images/project-images/rikikikings-800.webp";
import RikikiKingsIMG from "../assets/images/project-images/rikikikings.webp";

import DASHBOARDIMG400 from "../assets/images/project-images/nas-monitoring-400.webp";
import DASHBOARDIMG800 from "../assets/images/project-images/nas-monitoring-800.webp";
import DASHBOARDIMG from "../assets/images/project-images/nas-monitoring.webp";

export const projects = [
  {
    titleKey: "projects.rikiki.title",
    images: {
      small: RikikiKings400,
      medium: RikikiKings800,
      large: RikikiKingsIMG,
    },
    url: "https://github.com/Dzsepetto/RikikiApp",
    color: "#2B2B2B",
    descriptionKey: "projects.rikiki.description",
  },
  {
    titleKey: "projects.portfolio.title",
    images: {
      small: PortfolioIMG400,
      medium: PortfolioIMG800,
      large: PortfolioIMG,
    },
    url: "https://github.com/Dzsepetto/portfolioWebsite",
    color: "#2B2B2B",
    descriptionKey: "projects.portfolio.description",
  },
  {
    titleKey: "projects.quiz.title",
    images: {
      small: OnlineGamesIMG400,
      medium: OnlineGamesIMG800,
      large: OnlineGamesIMG,
    },
    url: "https://github.com/Dzsepetto/OnlineGames",
    url2: "https://www.dzsepetto.hu/",
    color: "#2B2B2B",
    descriptionKey: "projects.quiz.description",
  },
  {
    titleKey: "projects.nas.title",
    images: {
      small: DASHBOARDIMG400,
      medium: DASHBOARDIMG800,
      large: DASHBOARDIMG,
    },
    url: "https://github.com/Dzsepetto/pi-nas-monitoring",
    color: "#2B2B2B",
    descriptionKey: "projects.nas.description",
  },
];