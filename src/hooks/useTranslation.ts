import { useEffect, useRef, useState } from "react";
import { Position } from "../models/Data";
import { useCursorPositionOnWindow } from "./useCursorPositionOnWindow";
export const useTranslation = (button = 0) => {
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
  const translationOnMouseDown = useRef<Position>({ x: 0, y: 0 });
  const [translation, setTranslation] = useState<Position>({ x: 0, y: 0 });
  const [isTranslating, setIsTranslating] = useState(false);
  const handleMouseDown = (event: any) => {
    cursorPositionOnMouseDown.current = cursorPosition;
    translationOnMouseDown.current = translation;
    setIsTranslating(true);
  };
  const handleMouseMove = (event: any) => {
    if (isTranslating && event.button === button) {
      setTranslation({
        x:
          translationOnMouseDown.current.x +
          cursorPosition.x -
          cursorPositionOnMouseDown.current.x,
        y:
          translationOnMouseDown.current.y +
          cursorPosition.y -
          cursorPositionOnMouseDown.current.y,
      });
    }
    console.log(translation);
  };
  const handleMouseUp = (event: any) => {
    setIsTranslating(false);
  };

  return { translation, isTranslating };
};
