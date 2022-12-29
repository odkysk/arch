import { Arrangement, Data } from "../../models/Data";

export const getMemberArrangements = (data: Data, viewId: string) => {
  let result: Arrangement[] = [];
  data.view_member_arrangements.map((arrangement) => {
    if (arrangement.view === viewId) {
      result.push(arrangement);
    }
  });
  return result;
};
