/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MouseEvent, useContext, useRef } from "react";
import { ActionContext } from "../contexts/actionContext";
import { DataContext } from "../contexts/dataContext";
import { Position } from "../models/Position";
interface Props {
  id: string;
}
export const Member = ({ id }: Props) => {
  const dataContext = useContext(DataContext);
  const actionContext = useContext(ActionContext);

  const member = dataContext.findMember(id);
  const name = member.name;
  const position = member.position;

  const dragging = useRef(false);
  const cursorPositionOnMouseDown = useRef<Position>({ x: 0, y: 0 });
  const positionOnMouseDown = useRef<Position>({ x: 0, y: 0 });

  const handleClickStartRelating = (event: MouseEvent) => {
    event.stopPropagation();
    actionContext.startRelating(id);
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
  const handleMouseUp = (event: MouseEvent) => {
    handleEndMouseMove(event);
    if (actionContext.relating) {
      actionContext.endRelating(id);
    }
  };
  const handleMouseLeave = (event: MouseEvent) => {
    handleEndMouseMove(event);
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
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <button>V</button>
      <input
        type="text"
        css={css`
          width: 100%;
        `}
        value={name}
      />
      <button onMouseDown={handleClickStartRelating}>▼</button>
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
