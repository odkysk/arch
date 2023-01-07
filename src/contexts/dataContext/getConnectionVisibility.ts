import { Data } from "../../models/Data";

export const getConnectionVisibility = (
  data: Data,
  viewId: string,
  connectionId: string
) =>
  data.view_connection_visibilities.find(
    (visibility) =>
      visibility.viewId === viewId && visibility.connectionId === connectionId
  ) || {
    viewId: "0",
    connectionId: "0",
    isVisible: false,
  };
