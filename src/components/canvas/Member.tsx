/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  ChangeEvent,
  MouseEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ActionContext } from "../../contexts/actionContext";
import { DataContext, DataDispatchContext } from "../../contexts/dataContext";
import { ToolContext } from "../../contexts/toolContext";
import { useDrag } from "../../hooks/useDrag";
import { addPosition, Position } from "../../models/Data";
import { canvasColors } from "../../styles/colors";
import { body, box, onHover, rounded } from "../../styles/css";
interface Props {
  id: string;
  view: string;
}
export const Member = ({ id, view }: Props) => {
  console.log("render member");
  const dataContext = useContext(DataContext);
  const dataDispatchContext = useContext(DataDispatchContext);
  const actionContext = useContext(ActionContext);
  const toolContext = useContext(ToolContext);
  const currentTool = toolContext.currentTool;
  const member = dataDispatchContext.getMember(id);
  const name = member.name;
  const position = dataDispatchContext.getMemberArrangement(view, id).position;

  const [isDragging, setIsDragging] = useState(false);
  const { translation } = useDrag(isDragging);
  const positionOnMouseDown = useRef<Position>({ x: 0, y: 0 });

  const handleMouseDown = (event: MouseEvent) => {
    positionOnMouseDown.current = { x: position.x, y: position.y };
    if (currentTool.name === "selection") {
      setIsDragging(true);
    }
    if (toolContext.currentTool.name === "relation") {
      actionContext.setNewConnectionStart(
        id,
        toolContext.currentTool.options?.relationId || "0"
      );
    }
  };

  const handleMouseMove = () => {
    if (isDragging) {
      dataDispatchContext.setMemberPosition(
        view,
        id,
        addPosition(positionOnMouseDown.current, translation)
      );
    }
  };
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUpDocument);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUpDocument);
    };
  });
  const handleMouseUpDocument = () => {
    setIsDragging(false);
  };
  const handleMouseUp = (event: MouseEvent) => {
    actionContext.setNewConnectionEnd(id);
  };
  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    if (event) {
      dataDispatchContext.setMemberName(id, event.target.value);
    }
  };
  return (
    <div
      id={id}
      css={[
        memberCss,
        box,
        rounded,
        isDragging &&
          css`
            z-index: 1;
          `,
        !isDragging &&
          css`
            transition: all 100ms ease-out;
          `,
      ]}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
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
      <button css={button}>▼</button>
    </div>
  );
};

const memberCss = css`
  position: absolute;
  padding: 12px;
  border: solid 1.5px ${canvasColors.purple.border};
  background-color: ${canvasColors.purple.background};
  width: 120px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  transform-origin: 0.5 0.5;
  gap: 6px;
  ${onHover(
    css`
      background-color: rgba(171, 111, 255, 0.1);
    `
  )}
`;
const button = css`
  background-color: rgba(0, 0, 0, 0);
  border: none;
`;
