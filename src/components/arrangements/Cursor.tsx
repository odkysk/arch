/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { Position } from "../../models/Data";
export const Cursor = () => {
  useEffect(() => {
    if (window) {
      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.addEventListener("mousemove", handleMouseMove);
      };
    }
  });
  const [cursorPosition, setCursorPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  const handleMouseMove = (event: MouseEvent) => {
    setCursorPosition({ x: event.clientX, y: event.clientY });
  };
  return (
    <div
      css={css`
        position: fixed;
        pointer-events: none;
        height: 8px;
        width: 8px;
        border-radius: 8px;
        transform: translate(-50%, -50%);
        background-color: red;
      `}
      style={{
        left: cursorPosition.x,
        top: cursorPosition.y,
      }}
    ></div>
  );
};
