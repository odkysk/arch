import { Data } from "../../models/Data";

export const getMemberArrangement = (
  data: Data,
  viewId: string,
  memberId: string
) => {
  const arrangement = data.view_member_arrangements.find(
    (arrangement) =>
      arrangement.view === viewId && arrangement.member === memberId
  );
  return (
    arrangement || {
      view: "undefined",
      member: "undefined",
      position: { x: 0, y: 0 },
      isVisible: false,
    }
  );
};
