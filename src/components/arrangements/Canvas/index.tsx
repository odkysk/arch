/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MouseEvent, useContext, useState } from "react";
import { ActionContext } from "../../../contexts/actionContext";
import { ViewContext } from "../../../contexts/viewContext";
import { useTranslation } from "../../../hooks/useTranslation";
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

  // translate canvas
  const { translation, isTranslating } = useTranslation(1);

  const handleMouseUp = (event: MouseEvent<HTMLDivElement>) => {
    actionContext.dispatch("canvas", "onMouseUp");
  };
  return (
    <div
      id="canvas"
      css={[
        canvas,
        css`
          scale: ${scale};
        `,
        isTranslating &&
          css`
            cursor: grab;
          `,
      ]}
      style={{
        transform: `translate(
          ${translation.x}px,
          ${translation.y}px
        )`,
      }}
      onMouseUp={handleMouseUp}
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
