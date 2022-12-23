/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MouseEvent, useContext, useRef } from "react";
import { DataContext } from "../contexts/dataContext";
import { useCursorPosition } from "../hooks/useCursorPosition";
import { Position } from "../models/Position";
interface Props {
  id: string;
  setRelationPreviewStart: (position: Position) => void;
  setRelationPreviewEnd: (position: Position) => void;
}
export const Member = ({
  id,
  setRelationPreviewStart,
  setRelationPreviewEnd,
}: Props) => {
  const dataContext = useContext(DataContext);
  const member = dataContext.findMember(id);
  const position = member.position;

  const dragging = useRef(false);
  const cursorPositionOnMouseDown = useRef<Position>({ x: 0, y: 0 });
  const positionOnMouseDown = useRef<Position>({ x: 0, y: 0 });
  const cursorPosition = useCursorPosition();
  const handleClickStartRalating = () => {
    setRelationPreviewStart(cursorPosition);
  };
  const handleClickEndRalating = () => {
    setRelationPreviewEnd(cursorPosition);
  };
  const handleMouseDown = (event: MouseEvent) => {
    positionOnMouseDown.current = { x: position.x, y: position.y };
    cursorPositionOnMouseDown.current = { x: event.clientX, y: event.clientY };
    dragging.current = true;
  };

  const handleMouseMove = (event: MouseEvent) => {
    const difference: Position = {
      x: event.clientX - cursorPositionOnMouseDown.current.x,
      y: event.clientY - cursorPositionOnMouseDown.current.y,
    };
    if (dragging.current) {
      dataContext.moveMember(id, {
        x: positionOnMouseDown.current.x + difference.x,
        y: positionOnMouseDown.current.y + difference.y,
      });
    }
  };
  const handleEndMouseMove = (event: MouseEvent) => {
    dragging.current = false;
  };

  return (
    <div
      id={id}
      css={[memberCss, css``]}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleEndMouseMove}
      onMouseLeave={handleEndMouseMove}
    >
      <button onClick={handleClickEndRalating} css={button}>
        V
      </button>
      <input
        type="text"
        css={css`
          width: 100%;
        `}
      />
      <button onClick={handleClickStartRalating}>▼</button>
    </div>
  );
};
const memberCss = css`
  position: absolute;
  font-size: 12px;
  padding: 12px;
  border: solid 1px rgba(0, 0, 255, 0.1);
  width: 120px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 255, 0.04);
  display: flex;
  flex-direction: column;
  gap: 6px;
  &:hover {
    background-color: rgba(0, 0, 255, 0.08);
  }
`;
const button = css`
  bgc
`;
