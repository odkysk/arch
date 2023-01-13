import { useEffect, useRef, useState } from "react";
import { Position } from "../models/Data";
export const useDrag = (isValid: boolean) => {
  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseMove);
    };
  });

  const cursorPositionOnMouseDown = useRef<Position>({ x: 0, y: 0 });
  const [translation, setTranslation] = useState<Position>({ x: 0, y: 0 });
  const [isInitialized, setIsInitialized] = useState(false);
  const handleMouseDown = (event: any) => {
    cursorPositionOnMouseDown.current = {
      x: event.clientX,
      y: event.clientY,
    };
  };
  const handleMouseMove = (event: any) => {
    if (isValid) {
      setIsInitialized(false);
      setTranslation({
        x: event.clientX - cursorPositionOnMouseDown.current.x,
        y: event.clientY - cursorPositionOnMouseDown.current.y,
      });
    } else if (!isInitialized) {
      setTranslation({ x: 0, y: 0 });
      setIsInitialized(true);
    }
  };
  const handleMouseUp = (event: any) => {};
  return { translation };
};
