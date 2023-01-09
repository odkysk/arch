//Canvas座標におけるカーソル位置を取得するためのhook
import { useEffect, useState } from "react";
import { Position } from "../models/Data";

export const useCursorPosition = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  useEffect(() => {
    const canvas = document.getElementById("canvas");

    const updatePosition = (event: MouseEvent) => {
      if (canvas) {
        const scaleString =
          getComputedStyle(canvas).scale === "none"
            ? "1"
            : getComputedStyle(canvas).scale;
        const scale = parseFloat(scaleString);
        const canvasWidth = canvas.clientWidth;
        const canvasHeight = canvas.clientHeight;
        setPosition({
          x:
            (event.clientX - canvas.getBoundingClientRect().left) / scale -
            canvasWidth / 2,
          y:
            (event.clientY - canvas.getBoundingClientRect().top) / scale -
            canvasHeight / 2,
        });
      }
    };
    if (window) {
      window.addEventListener("mousemove", updatePosition);
    }
    return () => {
      if (window) {
        window.removeEventListener("mousemove", updatePosition);
      }
    };
  });

  return position;
};
