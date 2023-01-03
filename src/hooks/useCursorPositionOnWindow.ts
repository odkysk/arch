import { useEffect, useState } from "react";
import { Position } from "../models/Data";

export const useCursorPositionOnWindow = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  useEffect(() => {
    const updatePosition = (event: MouseEvent) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
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
