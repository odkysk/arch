import { useEffect, useState } from "react";
import { Position } from "../models/Data";

export const useCursorPosition = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const canvasWidth = 1200;
  const canvasHeight = 800;
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const updatePosition = (event: MouseEvent) => {
      if (canvas) {
        setPosition({
          x:
            event.clientX -
            canvas.getBoundingClientRect().left -
            canvasWidth / 2,
          y:
            event.clientY -
            canvas.getBoundingClientRect().top -
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
