/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Position } from "../models/Position";
interface Props {
  start: Position;
  end: Position;
}
export const Relation = ({ start, end }: Props) => {
  //このコンポーネントはCanvas全体をviewBoxとする
  const viewWidth = 1200;
  const viewHeight = 800;
  const startRelative: Position = {
    x: start.x + viewWidth / 2,
    y: start.y + viewHeight / 2,
  };
  const endRelative: Position = {
    x: end.x + viewWidth / 2,
    y: end.y + viewHeight / 2,
  };
  const MemberSizeX = 60;
  const MemberSizeY = 30;
  // console.log(`rendered Relation`);
  return (
    <div
      css={css`
        position: absolute;
        left: -600px;
        top: -400px;
      `}
    >
      <svg id="Relation" width="1200" height="800" viewBox="0 0 1200 800">
        <line
          x1={startRelative.x + MemberSizeX / 2}
          y1={startRelative.y + MemberSizeY / 2}
          x2={endRelative.x + MemberSizeX / 2}
          y2={endRelative.y + MemberSizeY / 2}
          stroke="rgba(255,0,0,0.5)"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};
