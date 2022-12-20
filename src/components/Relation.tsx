import { Position } from "../models/Position";
interface Props {
  start: Position;
  end: Position;
}
export const Relation = ({ start, end }: Props) => {
  return (
    <div>
      <p>
        <p>
          {start.x}, {start.y}
        </p>
        <p>
          {end.x}, {end.y}
        </p>
      </p>
      <svg id="Relation" width="400" height="300" viewBox="0 0 400 300">
        <line
          x1={start.x}
          y1={start.y}
          x2={end.x}
          y2={end.y}
          stroke="black"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};
