/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ChangeEvent, MouseEvent, useContext, useRef } from "react";
import { ActionContext } from "../../contexts/actionContext";
import { DataContext } from "../../contexts/dataContext";
import { Position } from "../../models/Data";
import { body, box, onHover, rounded } from "../../styles/css";
interface Props {
  id: string;
  view: string;
}
export const Member = ({ id, view }: Props) => {
  const dataContext = useContext(DataContext);
  const actionContext = useContext(ActionContext);

  const member = dataContext.getMember(id);
  const name = member.name;
  const position = dataContext.getMemberArrangement(view, id).position;

  const dragging = useRef(false);
  const cursorPositionOnMouseDown = useRef<Position>({ x: 0, y: 0 });
  const positionOnMouseDown = useRef<Position>({ x: 0, y: 0 });

  const handleMouseDownRelationStart = (event: MouseEvent) => {
    event.stopPropagation();
    actionContext.setNewRelationStart(id);
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
      dataContext.setMemberPosition(view, id, {
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
    actionContext.setNewRelationEnd(id);
  };
  const handleMouseLeave = (event: MouseEvent) => {
    handleEndMouseMove(event);
  };
  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    if (event) {
      dataContext.setMemberName(id, event.target.value);
    }
  };
  return (
    <div
      id={id}
      css={[
        memberCss,
        box,
        rounded,
        dragging.current &&
          css`
            z-index: 1;
          `,
        !dragging.current &&
          css`
            transition: all 300ms ease-out;
          `,
      ]}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <button css={button}>○</button>
      <input
        type="text"
        css={[
          body,
          css`
            width: 160px;
            text-align: center;
            background-color: rgba(0, 0, 0, 0);
            border: none;
          `,
        ]}
        value={name}
        onChange={handleChangeValue}
      />
      <button onMouseDown={handleMouseDownRelationStart} css={button}>
        ▼
      </button>
    </div>
  );
};

const memberCss = css`
  position: absolute;
  padding: 12px;
  border: solid 1.5px rgba(0, 0, 255, 0.1);
  width: 120px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  gap: 6px;
  ${onHover(
    css`
      background-color: rgba(0, 0, 255, 0.08);
    `
  )}
`;
const button = css`
  background-color: rgba(0, 0, 0, 0);
  border: none;
`;