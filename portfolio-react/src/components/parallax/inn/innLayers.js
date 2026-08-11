import background from "../../../assets/images/parralax/inn/background.webp";
import bridge from "../../../assets/images/parralax/inn/bridge.webp";
import leftTree from "../../../assets/images/parralax/inn/left-tree.webp";
import middle from "../../../assets/images/parralax/inn/middle.webp";
import rightTree from "../../../assets/images/parralax/inn/right-tree.webp";

const exitRange = [0, 0.18, 1];

export const innLayers = [
  {
    id: "background",
    src: background,
    modifierClass:
      "inn-section__layer--background",
    range: [0, 1],
  },
  {
    id: "left-tree",
    src: leftTree,
    modifierClass:
      "inn-section__layer--left-tree",
    range: exitRange,
    x: ["0vw", "0vw", "-115vw"],
    rotate: [0, 0, -2],
  },
  {
    id: "right-tree",
    src: rightTree,
    modifierClass:
      "inn-section__layer--right-tree",
    range: exitRange,
    x: ["0vw", "0vw", "115vw"],
    rotate: [0, 0, 2],
  },
  {
    id: "middle",
    src: middle,
    modifierClass:
      "inn-section__layer--middle",
    range: exitRange,
    y: ["0vh", "0vh", "115vh"],
  },
  {
    id: "bridge",
    src: bridge,
    modifierClass:
      "inn-section__layer--bridge",
    range: exitRange,
    y: ["0vh", "0vh", "125vh"],
  },
];

export const innLayersMobile = [
  {
    id: "background",
    src: background,
    modifierClass:
      "inn-section__layer--background",
    range: [0, 1],
  },
  {
    id: "left-tree",
    src: leftTree,
    modifierClass:
      "inn-section__layer--left-tree",
    range: exitRange,
    x: ["0vw", "0vw", "-65vw"],
    rotate: [0, 0, -1],
  },
  {
    id: "right-tree",
    src: rightTree,
    modifierClass:
      "inn-section__layer--right-tree",
    range: exitRange,
    x: ["0vw", "0vw", "65vw"],
    rotate: [0, 0, 1],
  },
  {
    id: "middle",
    src: middle,
    modifierClass:
      "inn-section__layer--middle",
    range: exitRange,
    y: ["0vh", "0vh", "68vh"],
  },
  {
    id: "bridge",
    src: bridge,
    modifierClass:
      "inn-section__layer--bridge",
    range: exitRange,
    y: ["0vh", "0vh", "75vh"],
  },
];