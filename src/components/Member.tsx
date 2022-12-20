/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { Position } from "../models/Position";
interface Props {
  id: string;
  name: string;
  position: Position;
}
export const Member = ({
  id,
  name = "title",
  position = { x: 0, y: 0 },
}: Props) => {
  const [positionX, setPositionX] = useState(0);
  const handleClick = () => {
    setPositionX(positionX + 1);
  };
  return (
    <div
      id={id}
      css={[member, css``]}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
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
