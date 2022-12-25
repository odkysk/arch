/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ChangeEvent, useContext } from "react";
import { DataContext } from "../contexts/dataContext";
import { Position } from "../models/Position";
import { Relation as RelationModel } from "../models/Relation";
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
    console.log(dataContext.data.relations);
  };
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
        }}
        value={name}
        onChange={handleChangeValue}
      ></input>
    </div>
  );
};
