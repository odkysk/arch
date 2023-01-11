import { Dispatch, SetStateAction } from "react";
import { Data } from "../../models/Data";

export const setMemberVisibility = (
  setData: Dispatch<SetStateAction<Data>>,
  viewId: string,
  memberId: string,
  isVisible: boolean
) => {
  setData((data) => {
    return {
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
    };
  });
};
