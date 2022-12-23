/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useContext } from "react";
import { DataContext } from "../contexts/dataContext";
import { PreviewContext } from "../contexts/previewContext";
import { ToolContext } from "../contexts/toolContext";
import { useCursorPosition } from "../hooks/useCursorPosition";
import { Member } from "./Member";
import { Preview } from "./Preview";
import { Relation } from "./Relation";
export const Canvas = () => {
  const dataContext = useContext(DataContext);
  const toolContext = useContext(ToolContext);
  const previewContext = useContext(PreviewContext);
  const cursorPosition = useCursorPosition();
  const members = dataContext.data.members.map((member) => {
    return (
      <Member
        key={member.id}
        id={member.id}
        setRelationPreviewStart={(position) => {
          previewContext.setRelationStart(position);
        }}
        setRelationPreviewEnd={(position) => {
          previewContext.setRelationEnd(position);
        }}
      />
    );
  });
  const relations = dataContext.data.relations.map((relation) => {
    const startMember = dataContext.findMember(relation.start);
    const endMember = dataContext.findMember(relation.end);
    return (
      <Relation
        key={relation.id}
        start={startMember ? startMember.position : { x: 0, y: 0 }}
        end={endMember ? endMember.position : { x: 0, y: 0 }}
      />
    );
  });

  return (
    <div
      id="canvas"
      css={canvas}
      style={toolContext.mode === "relation" ? { cursor: "crosshair" } : {}}
    >
      <div css={originator}>
        <Preview />
        {relations}
        {members}
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
            dataContext.addRelation();
          }}
        >
          relation mode
        </button>
        <p>
          cursor: {cursorPosition.x}, {cursorPosition.y}
        </p>
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
