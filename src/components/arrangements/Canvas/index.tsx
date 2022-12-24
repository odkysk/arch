/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useContext } from "react";
import { ActionContext } from "../../../contexts/actionContext";
import { DataContext } from "../../../contexts/dataContext";
import { ToolContext } from "../../../contexts/toolContext";
import { Members } from "./Members";
import { Preview } from "./Preview";
import { Relations } from "./Relations";
export const Canvas = () => {
  const toolContext = useContext(ToolContext);
  const dataContext = useContext(DataContext);
  const actionContext = useContext(ActionContext);
  const handleMouseUp = () => {
    actionContext.endRelating();
  };
  return (
    <div
      id="canvas"
      css={canvas}
      style={toolContext.mode === "relation" ? { cursor: "crosshair" } : {}}
      onMouseUp={handleMouseUp}
    >
      <div css={originator}>
        <Preview />
        <Relations />
        <Members />
      </div>
      <div css={buttons}>
        <button onClick={dataContext.addMember}>+</button>
        <button
          css={toolContext.mode === "selection" && activeModeButton}
          onClick={() => {
            toolContext.setMode("selection");
          }}
        >
          select mode
        </button>
        <button
          css={toolContext.mode === "member" && activeModeButton}
          onClick={() => {
            toolContext.setMode("member");
          }}
        >
          member mode
        </button>
        <button
          css={toolContext.mode === "relation" && activeModeButton}
          onClick={() => {
            toolContext.setMode("relation");
          }}
        >
          relation mode
        </button>
      </div>
    </div>
  );
};
const canvas = css`
  width: 1200px;
  height: 800px;
  background-color: #eee;
  position: relative;
`;
const originator = css`
  transform: translate(600px, 400px);
  width: 0px;
  height: 0px;
`;
const buttons = css`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
`;
const activeModeButton = css`
  color: white;
  background-color: blue;
  border-color: black;
`;
