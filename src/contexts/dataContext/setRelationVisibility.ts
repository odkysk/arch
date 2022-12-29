import { Dispatch } from "react";
import { Data } from "../../models/Data";

export const setRelationVisibility = (
  data: Data,
  setData: Dispatch<Data>,
  viewId: string,
  relationId: string,
  isVisible: boolean
) => {
  setData({
    ...data,
    view_relation_visibilities: data.view_relation_visibilities.map(
      (visibility) =>
        visibility.viewId === viewId && visibility.relationId === relationId
          ? { ...visibility, isVisible: isVisible }
          : visibility
    ),
  });
};
