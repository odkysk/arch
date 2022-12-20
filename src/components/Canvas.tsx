/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useContext } from "react";
import { DataContext } from "../contexts/dataContext";
import { Member } from "./Member";
import { Relation } from "./Relation";
export const Canvas = () => {
  const dataContext = useContext(DataContext);
  const members = dataContext.members.map((member) => {
    return (
      <Member id={member.id} name={member.name} position={member.position} />
    );
  });
  const relations = dataContext.relations.map((relation) => {
    const startMember = dataContext.members.find(
      (e) => e.id === relation.start
    );
    const endMember = dataContext.members.find((e) => e.id === relation.end);
    return (
      <Relation
        start={startMember ? startMember.position : { x: 0, y: 0 }}
        end={endMember ? endMember.position : { x: 0, y: 0 }}
      />
    );
  });
  return (
    <div css={canvas}>
      <div css={originator}>
        <>
          {members}
          {relations}
        </>
      </div>
    </div>
  );
};
const canvas = css`
  width: 1200px;
  height: 800px;
  background-color: #eee;
`;
const originator = css`
  transform: translate(600px, 400px);
`;
