import { Dispatch, SetStateAction } from "react";
import { Data } from "../../models/Data";

export const setRelationVisibility = (
  setData: Dispatch<SetStateAction<Data>>,
  viewId: string,
  relationId: string | string[],
  isVisible: boolean
) => {
  setData((data) => {
    return {
      ...data,
      view_relation_visibilities: data.view_relation_visibilities.map(
        (visibility) => {
          const isTargetView = visibility.viewId === viewId;
          const isTargetConnection = Array.isArray(relationId)
            ? relationId.some((id) => id === visibility.relationId)
            : visibility.relationId === relationId;
          const isTarget = isTargetView && isTargetConnection;
          return isTarget
            ? { ...visibility, isVisible: isVisible }
            : visibility;
        }
      ),
    };
  });
};
