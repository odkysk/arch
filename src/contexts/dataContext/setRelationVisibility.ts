import { Dispatch } from "react";
import { Data } from "../../models/Data";

export const setRelationVisibility = (
  data: Data,
  setData: Dispatch<Data>,
  viewId: string,
  relationName: string,
  isVisible: boolean
) => {
  setData({
    ...data,
    view_relationName_visibilities: data.view_relationName_visibilities.map(
      (visibility) =>
        visibility.viewId === viewId && visibility.relationName === relationName
          ? { ...visibility, isVisible: isVisible }
          : visibility
    ),
  });
};
