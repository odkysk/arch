import { Position } from "../models/Position";
interface Member {
  id: string;
  name: string;
  position: Position;
}
interface Relation {
  id: string;
  start: string;
  end: string;
}
export interface Data {
  members: Member[];
  relations: Relation[];
}

export const data: Data = {
  members: [
    {
      id: "0",
      name: "apple",
      position: {
        x: 0,
        y: 0,
      },
    },
    {
      id: "1",
      name: "orange",
      position: {
        x: 0,
        y: 80,
      },
    },
    {
      id: "2",
      name: "grape",
      position: {
        x: 0,
        y: 160,
      },
    },
  ],
  relations: [
    { id: "0", start: "0", end: "1" },
    { id: "1", start: "1", end: "2" },
  ],
};
