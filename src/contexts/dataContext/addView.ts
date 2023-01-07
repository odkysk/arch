import { Dispatch } from "react";
import { Data } from "../../models/Data";
import { makeId } from "../../utilities/makeId";

export const addView = (data: Data, setData: Dispatch<Data>) => {
  const newViewId = makeId();
  const newArrangements = data.members.map((member) => ({
    viewId: newViewId,
    memberId: member.id,
    position: { x: 0, y: 0 },
    isVisible: true,
  }));
  const newRelationVisibilities = data.view_relation_visibilities.map(
    (visibility) => ({
      relationId: visibility.relationId,
      viewId: newViewId,
      isVisible: false,
    })
  );
  setData({
    ...data,
    views: [
      ...data.views,
      {
        id: newViewId,
        name: "new view",
      },
    ],
    view_member_arrangements:
      data.view_member_arrangements.concat(newArrangements),
    view_relation_visibilities: data.view_relation_visibilities.concat(
      newRelationVisibilities
    ),
  });
};
