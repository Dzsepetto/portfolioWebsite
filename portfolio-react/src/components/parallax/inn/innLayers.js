import background from "../../../assets/images/parralax/inn/background.webp";
import middleInn from "../../../assets/images/parralax/inn/middle.webp";
import front from "../../../assets/images/parralax/inn/front.webp";

export const innLayers = [
  {
    id: "background",
    src: background,
    modifierClass: "inn-section__layer--background",
    range: [0.75, 1],
    y: [30, -20],
    scale: [1.0, 1.08],
  },
  {
    id: "middle",
    src: middleInn,
    modifierClass: "inn-section__layer--middle",
    range: [0.75, 0.92, 1],
    y: [90, 0, -20],
    scale: [0.96, 1, 1.05],
  },
  {
    id: "front",
    src: front,
    modifierClass: "inn-section__layer--front",
    range: [0.75, 0.92, 1],
    y: [150, 0, -35],
    scale: [0.92, 1, 1.09],
  },
];