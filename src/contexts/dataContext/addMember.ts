import { Dispatch } from "react";
import { Data } from "../../models/Data";
import { makeId } from "../../utilities/makeId";

export const addMember = (data: Data, setData: Dispatch<Data>) => {
  const newMemberId = makeId();
  const newArrangements = data.views.map((view) => ({
    viewId: view.id,
    memberId: newMemberId,
    position: { x: 0, y: 0 },
    isVisible: true,
  }));
  setData({
    ...data,
    members: [
      ...data.members,
      {
        id: newMemberId,
        name: "new member",
      },
    ],
    view_member_arrangements:
      data.view_member_arrangements.concat(newArrangements),
  });
};
