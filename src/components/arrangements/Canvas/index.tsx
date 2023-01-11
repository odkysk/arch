/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
  useContext,
  useRef,
  useState,
  WheelEvent,
} from "react";
import { ActionContext } from "../../../contexts/actionContext";
import { SelectionContext } from "../../../contexts/selectionContext";
import { ViewContext } from "../../../contexts/viewContext";
import { useDrag } from "../../../hooks/useDrag";
import { addPosition, Position } from "../../../models/Data";
import { systemColors } from "../../../styles/colors";
import { Connections } from "./Connections";
import { Members } from "./Members";
import { Preview } from "./Preview";
export const Canvas = () => {
  const actionContext = useContext(ActionContext);
  const selectionContext = useContext(SelectionContext);
  const { currentViewId } = useContext(ViewContext);
  const [isHandMode, setIsHandMode] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [isZoomMode, setIsZoomMode] = useState(false);

  const [scale, setScale] = useState(1);
  const { translation } = useDrag(isGrabbing);
  const [canvasTranslation, setCanvasTranslation] = useState({ x: 0, y: 0 });
  const canvasTranslationOnMouseDown = useRef<Position>({ x: 0, y: 0 });
  const handleMouseDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button === 0) {
      selectionContext.resetSelection();
      if (isHandMode) {
        setIsGrabbing(true);
        canvasTranslationOnMouseDown.current = canvasTranslation;
      }
    }
    if (event.button === 1) {
      setIsGrabbing(true);
      canvasTranslationOnMouseDown.current = canvasTranslation;
    }
  };
  const handleMouseUp = (event: MouseEvent<HTMLDivElement>) => {
    if (event.button === 1) setIsGrabbing(false);
    actionContext.dispatch("canvas", "onMouseUp");
    setIsGrabbing(false);
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (isGrabbing) {
      setCanvasTranslation(
        addPosition(canvasTranslationOnMouseDown.current, translation)
      );
    }
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
    if (event.key === " ") {
      setIsHandMode(false);
      setIsGrabbing(false);
    }
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
        isGrabbing &&
          css`
            cursor: grabbing;
          `,
      ]}
      style={{
        transform: `translate(
          ${canvasTranslation.x / scale}px,
          ${canvasTranslation.y / scale}px
        )`,
      }}
      tabIndex={0}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
    >
      <div css={originator}>
        <Preview view={currentViewId} />
        <Connections view={currentViewId} />
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
  border: 1.5px solid ${systemColors.greyBorder};
  background-color: ${systemColors.white};
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
