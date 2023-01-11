import { Dispatch, SetStateAction } from "react";
import { Data, Position } from "../../models/Data";
export const setMemberPosition = (
  setData: Dispatch<SetStateAction<Data>>,
  viewId: string,
  memberId: string,
  position: Position
) => {
  setData((data) => {
    return {
      ...data,
      view_member_arrangements: data.view_member_arrangements.map(
        (arrangement) =>
          arrangement.viewId === viewId && arrangement.memberId === memberId
            ? {
                ...arrangement,
                position: position,
              }
            : {
                ...arrangement,
              }
      ),
    };
  });
};
