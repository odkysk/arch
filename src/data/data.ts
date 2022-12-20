import { Position } from "../models/Position";
interface Member {
  id: string;
  name: string;
  position: Position;
}
interface Relation {
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
        x: 10,
        y: 20,
      },
    },
    {
      id: "1",
      name: "orange",
      position: {
        x: 40,
        y: 60,
      },
    },
    {
      id: "2",
      name: "grape",
      position: {
        x: 140,
        y: 30,
      },
    },
  ],
  relations: [
    { start: "0", end: "1" },
    { start: "1", end: "2" },
  ],
};
