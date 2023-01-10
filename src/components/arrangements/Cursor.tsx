/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../contexts/dataContext/index";
import { ToolContext } from "../../contexts/toolContext";
import { Position } from "../../models/Data";
import { canvasColors } from "../../styles/colors";
export const Cursor = () => {
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };
    if (window) {
      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.addEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);
  const [cursorPosition, setCursorPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  const toolContext = useContext(ToolContext);
  const dataContext = useContext(DataContext);
  const currentToolRelation =
    toolContext.currentTool.name === "relation" &&
    toolContext.currentTool.options?.relationId;
  const relationColor =
    (currentToolRelation &&
      dataContext.getRelation(currentToolRelation)?.color) ||
    "blue";
  return (
    <div
      css={[
        css`
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          height: 8px;
          width: 8px;
          border-radius: 8px;
          transition: 0;
        `,
        toolContext.currentTool.name === "relation" &&
          css`
            background-color: ${canvasColors[relationColor].main};
          `,
      ]}
      style={{
        transform: `translate(calc(${cursorPosition.x}px - 50%), calc(${cursorPosition.y}px - 50%))`,
      }}
    ></div>
  );
};
