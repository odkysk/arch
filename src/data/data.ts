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
      name: "0",
      position: {
        x: 0,
        y: 0,
      },
    },
    {
      id: "1",
      name: "1",
      position: {
        x: 0,
        y: 80,
      },
    },
    {
      id: "2",
      name: "2",
      position: {
        x: 0,
        y: 160,
      },
    },
  ],
  relations: [],
};
