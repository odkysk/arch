import { Dispatch } from "react";
import { Data } from "../../models/Data";

export const setRelationVisibility = (
  data: Data,
  setData: Dispatch<Data>,
  viewId: string,
  relationId: string | string[],
  isVisible: boolean
) => {
  console.log(
    `setRelationVisibility: (${relationId}, isVisible: ${isVisible})`
  );
  setData({
    ...data,
    view_relation_visibilities: data.view_relation_visibilities.map(
      (visibility) => {
        const isTargetView = visibility.viewId === viewId;
        const isTargetRelation = Array.isArray(relationId)
          ? relationId.some((id) => id === visibility.relationId)
          : visibility.relationId === relationId;
        const isTarget = isTargetView && isTargetRelation;
        return isTarget ? { ...visibility, isVisible: isVisible } : visibility;
      }
    ),
  });
  console.log(data.view_relation_visibilities);
};
