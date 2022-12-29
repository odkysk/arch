import { Dispatch } from "react";
import { Data, Position } from "../../models/Data";
export const setMemberPosition = (
  data: Data,
  setData: Dispatch<Data>,
  viewId: string,
  memberId: string,
  position: Position
) => {
  setData({
    ...data,
    view_member_arrangements: data.view_member_arrangements.map((arrangement) =>
      arrangement.viewId === viewId && arrangement.memberId === memberId
        ? {
            ...arrangement,
            position: position,
          }
        : {
            ...arrangement,
          }
    ),
  });
};
