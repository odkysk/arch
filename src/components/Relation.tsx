/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Position } from "../models/Position";
interface Props {
  start: Position;
  end: Position;
  preview?: boolean;
}
export const Relation = ({ start, end, preview = false }: Props) => {
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
  // console.log(`rendered Relation`);
  return (
    <div
      css={[
        css`
          position: absolute;
          left: -600px;
          top: -400px;
        `,
        preview &&
          css`
            opacity: 0.33;
          `,
      ]}
    >
      <svg id="Relation" width="1200" height="800" viewBox="0 0 1200 800">
        <line
          x1={startRelative.x}
          y1={startRelative.y}
          x2={endRelative.x}
          y2={endRelative.y}
          stroke="rgba(255,0,0,0.5)"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};
