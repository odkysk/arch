import { Dispatch } from "react";
import { v4 as uuid } from "uuid";
import { Data } from "../../models/Data";

export const addMember = (data: Data, setData: Dispatch<Data>) => {
  const newMemberId = uuid();
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
