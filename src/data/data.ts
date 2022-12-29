import { Data } from "../models/Data";

export const data: Data = {
  members: [],
  relations: [],
  views: [
    { id: "0", name: "0" },
    { id: "1", name: "1" },
    { id: "2", name: "2" },
    { id: "3", name: "3" },
    { id: "4", name: "4" },
    { id: "5", name: "5" },
  ],
  view_member_arrangements: [
    //MEMO: すべてのmemberのすべてのviewに対してレコードが存在することを約束する方法がわからない
  ],
  view_relationName_visibilities: [],
};
