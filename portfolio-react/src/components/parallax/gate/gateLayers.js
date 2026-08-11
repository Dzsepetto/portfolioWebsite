import background from "../../../assets/images/parralax/gate/bg.webp";
import gate from "../../../assets/images/parralax/gate/gate.webp";

const range = [0, 0.18, 1];

export const gateLayers = [
  {
    id: "background",
    src: background,
    modifierClass:
      "gate-section__layer--background",
    range,
    scale: [1, 1, 1.03],
  },
  {
    id: "gate",
    src: gate,
    modifierClass: "gate-section__layer--gate",
    range,
    y: ["0vh", "0vh", "115vh"],
    scale: [1, 1, 1.06],
  },
];

export const gateLayersMobile = [
  {
    id: "background",
    src: background,
    modifierClass:
      "gate-section__layer--background",
    range,
    scale: [1, 1, 1.015],
  },
  {
    id: "gate",
    src: gate,
    modifierClass: "gate-section__layer--gate",
    range,
    y: ["0vh", "0vh", "70vh"],
    scale: [1, 1, 1.025],
  },
];