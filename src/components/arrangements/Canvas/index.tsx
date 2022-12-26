/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ChangeEvent, FormEvent, useContext } from "react";
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
    actionContext.dispatch("canvas", "onMouseUp");
  };
  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = event.target.files?.[0];
    reader.readAsText(file as File);
    reader.onload = () => {
      const json = JSON.parse(reader.result as string);
      dataContext.loadData(json);
    };
    //同じファイルだとonChangeが発火しないので空にする
    event.target.value = "";
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const saveData = new Blob([JSON.stringify(dataContext.data)], {
    type: "text/json",
  });
  return (
    <div
      id="canvas"
      css={canvas}
      style={toolContext.mode === "relation" ? { cursor: "crosshair" } : {}}
      onMouseUp={handleMouseUp}
      onClick={() => {
        // console.log(dataContext.data);
      }}
    >
      <div css={originator}>
        <Preview />
        <Relations />
        <Members />
      </div>
      <div css={buttons}>
        <button onClick={dataContext.addMember} css={button}>
          add member
        </button>
        <a download="arch.json" href={window.URL.createObjectURL(saveData)}>
          <button css={button}>save</button>
        </a>
        <form onSubmit={handleSubmit}>
          <label>
            <p css={button}>load</p>
            <input
              type="file"
              id="file"
              accept=".json"
              onChange={handleUpload}
              css={css`
                display: none;
              `}
            />
          </label>
        </form>
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
  gap: 12px;
`;
const button = css`
  font-size: 12px;
  background-color: lightgrey;
  border: solid 1px black;
  padding: 6px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-contents: center; ;
`;
