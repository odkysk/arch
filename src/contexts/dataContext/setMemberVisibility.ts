import { Dispatch } from "react";
import { Data } from "../../models/Data";

export const setMemberVisibility = (
  data: Data,
  setData: Dispatch<Data>,
  viewId: string,
  memberId: string,
  isVisible: boolean
) => {
  setData({
    ...data,
    view_member_arrangements: data.view_member_arrangements.map(
      (arrangement) => {
        return arrangement.viewId === viewId &&
          arrangement.memberId === memberId
          ? {
              ...arrangement,
              isVisible: isVisible,
            }
          : arrangement;
      }
    ),
  });
};
