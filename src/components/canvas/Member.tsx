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
import { DataContext } from "../../contexts/dataContext";
import { useDrag } from "../../hooks/useDrag";
import { addPosition, Position } from "../../models/Data";
import { colors } from "../../styles/colors";
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

  const [isDragging, setIsDragging] = useState(false);
  const { translation } = useDrag(isDragging);
  const positionOnMouseDown = useRef<Position>({ x: 0, y: 0 });
  const handleMouseDownConnectionStart = (event: MouseEvent) => {
    event.stopPropagation();
    actionContext.setNewConnectionStart(id);
  };

  const handleMouseDown = (event: MouseEvent) => {
    positionOnMouseDown.current = { x: position.x, y: position.y };
    setIsDragging(true);
  };

  const handleMouseMove = () => {
    if (isDragging) {
      dataContext.setMemberPosition(
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
      <button onMouseDown={handleMouseDownConnectionStart} css={button}>
        ▼
      </button>
    </div>
  );
};

const memberCss = css`
  position: absolute;
  padding: 12px;
  border: solid 1.5px ${colors.purple.border};
  background-color: ${colors.purple.background};
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
