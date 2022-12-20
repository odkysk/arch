/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import "reseter.css";
import { Member } from "./components/Member";
import { Relation } from "./components/Relation";
import { data } from "./data/data";
export default function App() {
  const members = data.members.map((member) => {
    return (
      <Member id={member.id} name={member.name} position={member.position} />
    );
  });
  const relations = data.relations.map((relation) => {
    const startMember = data.members.find((e) => e.id === relation.start);
    const endMember = data.members.find((e) => e.id === relation.end);
    return (
      <Relation
        start={startMember ? startMember.position : { x: 0, y: 0 }}
        end={endMember ? endMember.position : { x: 0, y: 0 }}
      />
    );
  });
  const test = data.members.find((e) => e.id === "0");
  console.log(test);

  return (
    <main css={main}>
      <div css={canvas}>
        <div css={originator}>
          <>
            {members}
            {relations}
          </>
        </div>
      </div>
    </main>
  );
}
const main = css`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #ddd;
`;
const canvas = css`
  width: 1200px;
  height: 800px;
  background-color: #eee;
`;
const originator = css`
  transform: translate(600px, 400px);
`;
