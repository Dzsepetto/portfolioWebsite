import sky from "../../../assets/images/parralax/hero/sky.webp";
import background from "../../../assets/images/parralax/hero/bg.webp";
import tree from "../../../assets/images/parralax/hero/tree.webp";
import house from "../../../assets/images/parralax/hero/house.webp";
import bushRight from "../../../assets/images/parralax/hero/bush_right.webp";
import path from "../../../assets/images/parralax/hero/path.webp";
import rockLeft from "../../../assets/images/parralax/hero/rock_left.webp";

export const heroLayers = [
  {
    id: "sky",
    src: sky,
    modifierClass: "hero-section__layer--sky",
    range: [0, 0.6],
    y: ["0%", "3%"],
  },
  {
    id: "background",
    src: background,
    modifierClass: "hero-section__layer--background",
    range: [0, 0.6],
    y: ["0%", "6%"],
  },
  {
    id: "tree",
    src: tree,
    modifierClass: "hero-section__layer--tree",
    range: [0, 0.6],
    y: ["0%", "10%"],
    scale: [1, 1.07],
  },
  {
    id: "house",
    src: house,
    modifierClass: "hero-section__layer--house",
    range: [0, 0.6],
    y: ["0%", "16%"],
    scale: [1, 1.12],
  },
  {
    id: "bush-right",
    src: bushRight,
    modifierClass: "hero-section__layer--bush-right",
    range: [0, 0.6],
    y: ["0%", "22%"],
    scale: [1, 1.16],
  },
  {
    id: "path",
    src: path,
    modifierClass: "hero-section__layer--path",
    range: [0, 0.6],
    y: ["0%", "14%"],
    scale: [1, 1.1],
  },
  {
    id: "rock-left",
    src: rockLeft,
    modifierClass: "hero-section__layer--rock-left",
    range: [0, 0.6],
    y: ["0%", "18%"],
    scale: [1, 1.13],
  },
];