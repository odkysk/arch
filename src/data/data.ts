import { Data } from "../models/Data";

export const data: Data = {
  members: [
    {
      id: "0",
      name: "りんご",
    },
    {
      id: "1",
      name: "みかん",
    },
    {
      id: "2",
      name: "ぶどう",
    },
  ],
  relations: [{ id: "0", name: "name", start: "0", end: "1" }],
  views: [
    { id: "0", name: "all" },
    { id: "1", name: "cat" },
  ],
  view_member_arrangements: [
    //MEMO: すべてのmemberのすべてのviewに対してレコードが存在することを約束する方法がわからない
    { view: "0", member: "0", position: { x: -150, y: -150 }, visible: true },
    { view: "0", member: "1", position: { x: 0, y: 0 }, visible: true },
    { view: "0", member: "2", position: { x: 150, y: 150 }, visible: true },
    { view: "1", member: "0", position: { x: -250, y: -150 }, visible: true },
    { view: "1", member: "1", position: { x: 210, y: 0 }, visible: true },
    { view: "1", member: "2", position: { x: 250, y: 150 }, visible: true },
  ],
};
