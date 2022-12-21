/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useContext } from "react";
import { DataContext } from "../contexts/dataContext";
interface Props {
  id: string;
}
export const Member = ({ id }: Props) => {
  const dataContext = useContext(DataContext);
  const name = dataContext.findMember(id).name;
  const position = dataContext.findMember(id).position;
  const handleClick = () => {
    dataContext.moveMember(id, { x: 10, y: 10 });
  };
  console.log(`rendered Member ${name}`);
  return (
    <div
      id={id}
      css={[member, css``]}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onClick={handleClick}
    >
      {name}
    </div>
  );
};
const member = css`
  position: absolute;
  font-size: 12px;
  padding: 12px;
  border: solid 1px rgba(0, 0, 255, 0.1);
  width: 60px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 255, 0.04);
`;
