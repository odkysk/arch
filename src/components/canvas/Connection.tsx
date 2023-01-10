/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ChangeEvent, useContext } from "react";
import { DataContext } from "../../contexts/dataContext";
import {
  Connection as ConnectionModel,
  Position,
  Relation,
} from "../../models/Data";
import { canvasColors } from "../../styles/colors";
interface Props {
  id: string;
  connection: ConnectionModel;
  relation: Relation;
  start: Position;
  end: Position;
  preview?: boolean;
}
export const Connection = ({
  id,
  connection,
  relation,
  start,
  end,
  preview = false,
}: Props) => {
  const dataContext = useContext(DataContext);

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
      dataContext.setRelationName(relation.id, event.target.value);
    }
  };
  const color = canvasColors[relation.color].main;
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
          id="Connection"
          width={viewWidth}
          height={viewHeight}
          viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        >
          <line
            css={css`
              pointer-events: all;
              &:hover {
                opacity: 0.2;
              }
            `}
            x1={startRelative.x}
            y1={startRelative.y}
            x2={endRelative.x}
            y2={endRelative.y}
            stroke={color}
            strokeWidth={3}
            onClick={() => {
              dataContext.deleteConnection(id);
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
        value={relation.name}
        onChange={handleChangeValue}
      ></input>
    </div>
  );
};
