/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
  useContext,
  useState,
  WheelEvent,
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
  const [isZoomMode, setIsZoomMode] = useState(false);

  // scale canvas
  const [scale, setScale] = useState(1);
  const { translation, isDragging } = useDrag(isGrabbing);

  const handleMouseDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button === 1) setIsGrabbing(true);
    if (isHandMode && event.button === 0) setIsGrabbing(true);
  };
  const handleMouseUp = (event: MouseEvent<HTMLDivElement>) => {
    if (event.button === 1) setIsGrabbing(false);
    actionContext.dispatch("canvas", "onMouseUp");
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.repeat) return;
    if (event.key === " ") {
      setIsHandMode(true);
    }
    if (event.key === "Meta") setIsZoomMode(true);
    if (event.metaKey && event.key === "0") setScale(1);
  };
  const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.repeat) return;
    if (event.key === " ") setIsHandMode(false);
    if (event.key === "Meta") setIsZoomMode(false);
  };
  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (isZoomMode) {
      if (event.deltaY < 0 && scale < 1.6) setScale(scale + 0.2);
      if (event.deltaY > 0 && scale > 0.6) setScale(scale - 0.2);
      if (scale < 0.4) setScale(0.2);
      if (scale > 1.6) setScale(1.6);
    }
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
          ${translation.x / scale}px,
          ${translation.y / scale}px
        )`,
      }}
      tabIndex={0}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onWheel={handleWheel}
    >
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
  backface-visibility: hidden;
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
