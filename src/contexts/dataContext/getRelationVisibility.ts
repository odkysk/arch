import { Data } from "../../models/Data";

export const getRelationVisibility = (
  data: Data,
  viewId: string,
  relationId: string
) =>
  data.view_relation_visibilities.find(
    (visibility) =>
      visibility.viewId === viewId && visibility.relationId === relationId
  ) || {
    viewId: "0",
    relationId: "0",
    isVisible: false,
  };
