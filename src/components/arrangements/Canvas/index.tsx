/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
  useContext,
  useState,
} from "react";
import { ActionContext } from "../../../contexts/actionContext";
import { ViewContext } from "../../../contexts/viewContext";
import { useDrag } from "../../../hooks/useDrag";
import { colors } from "../../../styles/colors";
import { Members } from "./Members";
import { Preview } from "./Preview";
import { Relations } from "./Relations";
export const Canvas = () => {
  const actionContext = useContext(ActionContext);
  const { currentViewId } = useContext(ViewContext);
  const [isHandMode, setIsHandMode] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);

  // scale canvas
  const [scale, setScale] = useState(1);
  const handlePlus = () => setScale(scale + 0.05);
  const handleMinus = () => setScale(scale - 0.05);

  const { translation, isDragging } = useDrag(isGrabbing);

  const handleMouseDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button === 1) setIsGrabbing(true);
    if (isHandMode && event.button === 0) setIsGrabbing(true);
  };
  const handleMouseUp = (event: MouseEvent<HTMLDivElement>) => {
    if (event.button === 1) setIsGrabbing(false);
    actionContext.dispatch("canvas", "onMouseUp");
  };
  const handleMouseMove = (event: PointerEvent<HTMLDivElement>) => {};
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.repeat) return;
    if (event.key === " ") {
      setIsHandMode(true);
    }
  };
  const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.repeat) return;
    if (event.key === " ") {
      setIsHandMode(false);
    }
    setIsGrabbing(false);
  };
  return (
    <div
      id="canvas"
      css={[
        canvas,
        css`
          scale: ${scale};
        `,
        isHandMode &&
          css`
            cursor: grab;
          `,
        isDragging &&
          css`
            cursor: grabbing;
          `,
      ]}
      style={{
        transform: `translate(
          ${translation.x}px,
          ${translation.y}px
        )`,
      }}
      tabIndex={0}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
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
