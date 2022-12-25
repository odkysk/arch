import { Member } from "../models/Member";
import { Relation } from "../models/Relation";

export interface Data {
  members: Member[];
  relations: Relation[];
}

export const data: Data = {
  members: [
    {
      id: "0",
      name: "りんご",
      position: {
        x: 0,
        y: 0,
      },
    },
    {
      id: "1",
      name: "みかん",
      position: {
        x: 0,
        y: 80,
      },
    },
    {
      id: "2",
      name: "ぶどう",
      position: {
        x: 0,
        y: 160,
      },
    },
  ],
  relations: [],
};
