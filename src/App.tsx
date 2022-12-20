/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import "reseter.css";
import { Member } from "./components/Member";
import { data } from "./data/data";
export default function App() {
  const members = data.members.map((member) => {
    return (
      <Member id={member.id} name={member.name} position={member.position} />
    );
  });

  return (
    <main css={main}>
      <div css={canvas}>
        <div css={originator}>{members}</div>
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
