import { Data } from "../models/Data";

export const data: Data = {
  members: [],
  connections: [],
  views: [{ id: "0", name: "All" }],
  view_member_arrangements: [
    //MEMO: すべてのmemberのすべてのviewに対してレコードが存在することを約束する方法がわからない
  ],
  view_connection_visibilities: [],
};
