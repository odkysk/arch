import { CanvasColor } from "../models/Color";

interface CanvasColors {
  [color: CanvasColor]: {
    main: string;
    background: string;
    border: string;
  };
}

export const canvasColors: CanvasColors = {
  amber: {
    main: "rgba(217, 121, 0, 1)",
    background: "rgba(217, 121, 0, 0.05)",
    border: "rgba(217, 121, 0, 0.2)",
  },
  olive: {
    main: "rgba(170, 150, 0, 1)",
    background: "rgba(170, 150, 0, 0.05)",
    border: "rgba(170, 150, 0, 0.2)",
  },
  green: {
    main: "rgba(54, 178, 0, 1)",
    background: "rgba(54, 178, 0, 0.05)",
    border: "rgba(54, 178, 0, 0.2)",
  },
  turquoise: {
    main: "rgba(0, 170, 177, 1)",
    background: "rgba(0, 170, 177, 0.05)",
    border: "rgba(0, 170, 177, 0.2)",
  },
  blue: {
    main: "rgba(81, 146, 255, 1)",
    background: "rgba(81, 146, 255, 0.05)",
    border: "rgba(81, 146, 255, 0.2)",
  },
  purple: {
    main: "rgba(171, 111, 255, 1)",
    background: "rgba(171, 111, 255, 0.05)",
    border: "rgba(171, 111, 255, 0.2)",
  },
  pink: {
    main: "rgba(252, 0, 203, 1)",
    background: "rgba(252, 0, 203, 0.05)",
    border: "rgba(252, 0, 203, 0.2)",
  },
  red: {
    main: "rgba(255, 72, 90, 1)",
    background: "rgba(255, 72, 90, 0.05)",
    border: "rgba(255, 72, 90, 0.2)",
  },
  grey: {
    main: "rgba(149, 149, 149, 1)",
    background: "rgba(149, 149, 149, 0.066)",
    border: "rgba(149, 149, 149, 0.2)",
  },
};

export const systemColors = {
  black: "rgba(22, 22, 22, 1)",
  grey: "rgba(22, 22, 22, 0.4)",
  greyBorder: "rgba(22, 22, 22, 0.1)",
  greyBackground: "rgba(204, 204, 204, 0.2)",
  white: "#FFFFFF",
  accent: "#3B51D3",
  success: "#007835",
  attention: "#D97900",
  danger: "#BA0D00",
};
