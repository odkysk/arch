/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ChangeEvent, useContext } from "react";
import { DataContext } from "../../contexts/dataContext";
import { Position, Relation as RelationModel } from "../../models/Data";
import { colors } from "../../styles/colors";
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
  const viewWidth = 2400;
  const viewHeight = 1600;
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
      dataContext.setRelationName(id, event.target.value);
    }
  };
  return (
    <div
      css={[
        css`
          position: absolute;
          left: ${-viewWidth / 2}px;
          top: ${-viewHeight / 2}px;
          pointer-events: none;
        `,
        preview &&
          css`
            opacity: 0.33;
          `,
      ]}
    >
      <div>
        <svg
          id="Relation"
          width={viewWidth}
          height={viewHeight}
          viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        >
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
            stroke={colors.purple.main}
            strokeWidth={3}
            onClick={() => {
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
