/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MouseEvent, useContext, useRef, useState } from "react";
import { ActionContext } from "../../../contexts/actionContext";
import { ViewContext } from "../../../contexts/viewContext";
import { useCursorPositionOnWindow } from "../../../hooks/useCursorPositionOnWindow";
import { Position } from "../../../models/Data";
import { colors } from "../../../styles/colors";
import { Members } from "./Members";
import { Preview } from "./Preview";
import { Relations } from "./Relations";
export const Canvas = () => {
  const actionContext = useContext(ActionContext);
  const { currentViewId } = useContext(ViewContext);

  // scale canvas
  const [scale, setScale] = useState(1);
  const handlePlus = () => setScale(scale + 0.05);
  const handleMinus = () => setScale(scale - 0.05);

  //grab to move canvas
  const [isGrabbing, setIsGrabbing] = useState(false);
  const translation = useRef<Position>({ x: 0, y: 0 });
  const translationOnAuxDown = useRef<Position>({ x: 0, y: 0 });
  const cursorPosition = useCursorPositionOnWindow();
  const cursorPositionOnAuxDown = useRef<Position>({ x: 0, y: 0 });

  const handleMiddleClickDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.button === 1) {
      setIsGrabbing(true);
      cursorPositionOnAuxDown.current = cursorPosition;
      translationOnAuxDown.current = translation.current;
    }
  };
  const handleMiddleClickUp = (event: MouseEvent<HTMLDivElement>) => {
    if (event.button === 1) setIsGrabbing(false);
  };
  const handleMouseMove = () => {
    if (isGrabbing) {
      const difference: Position = {
        x: cursorPosition.x - cursorPositionOnAuxDown.current.x,
        y: cursorPosition.y - cursorPositionOnAuxDown.current.y,
      };
      translation.current = {
        x: translationOnAuxDown.current.x + difference.x,
        y: translationOnAuxDown.current.y + difference.y,
      };
    }
  };

  const handleMouseUp = (event: MouseEvent<HTMLDivElement>) => {
    actionContext.dispatch("canvas", "onMouseUp");
    handleMiddleClickUp(event);
  };
  return (
    <div
      id="canvas"
      css={[
        canvas,
        css`
          scale: ${scale};
        `,
        isGrabbing &&
          css`
            cursor: grab;
          `,
      ]}
      style={{
        transform: `translate(
          ${translation.current.x}px,
          ${translation.current.y}px
        )`,
      }}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMiddleClickDown}
      onMouseMove={handleMouseMove}
    >
      <div css={scaler}>
        <p onClick={handlePlus}>+</p>
        <p onClick={handleMinus}>-</p>
      </div>
      <div css={originator}>
        <Preview view={currentViewId} />
        <Relations view={currentViewId} />
        <Members view={currentViewId} />
      </div>
    </div>
  );
};
const canvas = css`
  width: 2400px;
  height: 1600px;
  position: absolute;
  user-select: none;
  border: 1.5px solid ${colors.system.greyBorder};
  background-color: ${colors.system.white};
`;
const originator = css`
  transform: translate(1200px, 800px);
  width: 0px;
  height: 0px;
`;
const scaler = css`
  position: fixed;
  top: 300px;
  left: 500px;
`;
