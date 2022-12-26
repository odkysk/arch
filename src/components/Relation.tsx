/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ChangeEvent, useContext } from "react";
import { DataContext } from "../contexts/dataContext";
import { Position, Relation as RelationModel } from "../models/Data";
interface Props {
  id: string;
  relation: RelationModel;
  start: Position;
  end: Position;
  preview?: boolean;
}
export const Relation = ({
  id,
  relation,
  start,
  end,
  preview = false,
}: Props) => {
  const dataContext = useContext(DataContext);
  const name = relation.name;

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
  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    if (event) {
      dataContext.updateRelationName(id, event.target.value);
    }
  };
  return (
    <div
      css={[
        css`
          position: absolute;
          left: -600px;
          top: -400px;
          pointer-events: none;
        `,
        preview &&
          css`
            opacity: 0.33;
          `,
      ]}
    >
      <div>
        <svg id="Relation" width="1200" height="800" viewBox="0 0 1200 800">
          <line
            css={css`
              pointer-events: all;
              &:hover {
                stroke: rgba(255, 123, 123, 0.5);
              }
            `}
            x1={startRelative.x}
            y1={startRelative.y}
            x2={endRelative.x}
            y2={endRelative.y}
            stroke="rgba(255,0,0,0.5)"
            strokeWidth="4"
            onClick={() => {
              console.log("delete");
              dataContext.deleteRelation(id);
            }}
          />
        </svg>
      </div>
      <input
        style={{
          fontSize: "12px",
          width: "60px",
          position: "absolute",
          transformOrigin: "0.5, 0.5",
          left: (startRelative.x + endRelative.x) / 2,
          top: (startRelative.y + endRelative.y) / 2,
          backgroundColor: "rgba(0,0,0,0)",
          border: "none",
          pointerEvents: "all",
        }}
        value={name}
        onChange={handleChangeValue}
      ></input>
    </div>
  );
};
