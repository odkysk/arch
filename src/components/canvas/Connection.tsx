/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ChangeEvent, useContext } from "react";
import { DataContext, DataDispatchContext } from "../../contexts/dataContext";
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
  const dataDispatchContext = useContext(DataDispatchContext);
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
      dataDispatchContext.setRelationName(relation.id, event.target.value);
    }
  };
  const inputAngle = Math.atan2(end.y - start.y, end.x - start.x);
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
              dataDispatchContext.deleteConnection(id);
            }}
          />
        </svg>
      </div>
      <input
        css={css`
          text-align: center;
          width: 120px;
          position: absolute;
          background-color: rgba(0, 0, 0, 0);
          border: none;
          pointer-events: all;
          transform-origin: center;
          transform: translate(-50%, -50%) rotate(${inputAngle}rad);
        `}
        style={{
          left: (startRelative.x + endRelative.x) / 2,
          top: (startRelative.y + endRelative.y) / 2,
        }}
        value={relation.name}
        onChange={handleChangeValue}
      ></input>
    </div>
  );
};
