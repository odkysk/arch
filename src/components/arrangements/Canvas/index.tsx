/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useContext } from "react";
import { ActionContext } from "../../../contexts/actionContext";
import { ToolContext } from "../../../contexts/toolContext";
import { ViewContext } from "../../../contexts/viewContext";
import { Members } from "./Members";
import { Preview } from "./Preview";
import { Relations } from "./Relations";
export const Canvas = () => {
  const toolContext = useContext(ToolContext);
  const actionContext = useContext(ActionContext);
  const { view } = useContext(ViewContext);

  const handleMouseUp = () => {
    actionContext.dispatch("canvas", "onMouseUp");
  };

  return (
    <div
      id="canvas"
      css={canvas}
      style={toolContext.mode === "relation" ? { cursor: "crosshair" } : {}}
      onMouseUp={handleMouseUp}
    >
      <div css={originator}>
        <Preview view={view} />
        <Relations view={view} />
        <Members view={view} />
      </div>
    </div>
  );
};
const canvas = css`
  width: 2400px;
  height: 1600px;
  background-color: #f5f5f5;
  position: absolute;
  user-select: none;
`;
const originator = css`
  transform: translate(1200px, 800px);
  width: 0px;
  height: 0px;
`;
