/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useContext } from "react";
import { DataContext } from "../contexts/dataContext";
import { Member } from "./Member";
import { Relation } from "./Relation";
export const Canvas = () => {
  const dataContext = useContext(DataContext);
  const members = dataContext.data.members.map((member) => {
    return <Member key={member.id} id={member.id} />;
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
    <div css={canvas}>
      <div css={originator}>
        <>
          {relations}
          {members}
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
