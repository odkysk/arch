import { useEffect, useRef, useState } from "react";
import { Position } from "../models/Data";
import { useCursorPositionOnWindow } from "./useCursorPositionOnWindow";
export const useDrag = (isValid: boolean) => {
  const cursorPosition = useCursorPositionOnWindow();
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

  const cursorPositionOnMouseDown = useRef<Position>(cursorPosition);
  const [translation, setTranslation] = useState<Position>({ x: 0, y: 0 });
  const handleMouseDown = (event: any) => {
    cursorPositionOnMouseDown.current = cursorPosition;
  };
  const handleMouseMove = (event: any) => {
    if (isValid) {
      setTranslation({
        x: cursorPosition.x - cursorPositionOnMouseDown.current.x,
        y: cursorPosition.y - cursorPositionOnMouseDown.current.y,
      });
    } else {
      setTranslation({ x: 0, y: 0 });
    }
  };
  const handleMouseUp = (event: any) => {};
  return { translation };
};
