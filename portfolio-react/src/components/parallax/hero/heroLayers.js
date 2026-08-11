import sky from "../../../assets/images/parralax/hero/sky.webp";
import background from "../../../assets/images/parralax/hero/bg.webp";
import tree from "../../../assets/images/parralax/hero/tree.webp";
import house from "../../../assets/images/parralax/hero/house.webp";
import bushRight from "../../../assets/images/parralax/hero/bush_right.webp";
import path from "../../../assets/images/parralax/hero/path.webp";
import rockLeft from "../../../assets/images/parralax/hero/rock_left.webp";

const range = [0, 1];

export const heroStaticLayers = [
  {
    id: "sky",
    src: sky,
    modifierClass: "hero-section__layer--sky",
  },
  {
    id: "background",
    src: background,
    modifierClass:
      "hero-section__layer--background",
  },
];

export const heroMovingLayers = [
  {
    id: "tree",
    src: tree,
    modifierClass: "hero-section__layer--tree",
    range,
    x: ["0vw", "-75vw"],
    y: ["0vh", "-4vh"],
  },
  {
    id: "house",
    src: house,
    modifierClass: "hero-section__layer--house",
    range,
    x: ["0vw", "75vw"],
    y: ["0vh", "2vh"],
  },
  {
    id: "bush-right",
    src: bushRight,
    modifierClass:
      "hero-section__layer--bush-right",
    range,
    x: ["0vw", "85vw"],
    y: ["0vh", "6vh"],
  },
  {
    id: "path",
    src: path,
    modifierClass: "hero-section__layer--path",
    range,
    x: ["0vw", "0vw"],
    y: ["0vh", "85vh"],
  },
  {
    id: "rock-left",
    src: rockLeft,
    modifierClass:
      "hero-section__layer--rock-left",
    range,
    x: ["0vw", "-85vw"],
    y: ["0vh", "8vh"],
  },
];

export const heroMovingLayersMobile = [
  {
    id: "tree",
    src: tree,
    modifierClass: "hero-section__layer--tree",
    range,
    x: ["0vw", "-42vw"],
    y: ["0vh", "-2vh"],
  },
  {
    id: "house",
    src: house,
    modifierClass: "hero-section__layer--house",
    range,
    x: ["0vw", "42vw"],
    y: ["0vh", "1vh"],
  },
  {
    id: "bush-right",
    src: bushRight,
    modifierClass:
      "hero-section__layer--bush-right",
    range,
    x: ["0vw", "48vw"],
    y: ["0vh", "3vh"],
  },
  {
    id: "path",
    src: path,
    modifierClass: "hero-section__layer--path",
    range,
    x: ["0vw", "0vw"],
    y: ["0vh", "52vh"],
  },
  {
    id: "rock-left",
    src: rockLeft,
    modifierClass:
      "hero-section__layer--rock-left",
    range,
    x: ["0vw", "-48vw"],
    y: ["0vh", "4vh"],
  },
];