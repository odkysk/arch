import _ from "lodash";
import { canvasColors } from "../models/Color";
import { Data } from "../models/Data";

const firstRelationColor = _.sample(canvasColors) || "blue";
export const data: Data = {
  members: [],
  relations: [
    {
      id: "0",
      name: "new relation",
      color: firstRelationColor,
      shape: "straight",
    },
  ],
  connections: [],
  views: [{ id: "0", name: "All" }],
  view_member_arrangements: [
    //MEMO: すべてのmemberのすべてのviewに対してレコードが存在することを約束する方法がわからない
  ],
  view_relation_visibilities: [
    { viewId: "0", relationId: "0", isVisible: true },
  ],
};
