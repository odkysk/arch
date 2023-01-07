import { Dispatch } from "react";
import { Data } from "../../models/Data";

export const setConnectionVisibility = (
  data: Data,
  setData: Dispatch<Data>,
  viewId: string,
  connectionId: string | string[],
  isVisible: boolean
) => {
  console.log(
    `setConnectionVisibility: (${connectionId}, isVisible: ${isVisible})`
  );
  setData({
    ...data,
    view_connection_visibilities: data.view_connection_visibilities.map(
      (visibility) => {
        const isTargetView = visibility.viewId === viewId;
        const isTargetConnection = Array.isArray(connectionId)
          ? connectionId.some((id) => id === visibility.connectionId)
          : visibility.connectionId === connectionId;
        const isTarget = isTargetView && isTargetConnection;
        return isTarget ? { ...visibility, isVisible: isVisible } : visibility;
      }
    ),
  });
  console.log(data.view_connection_visibilities);
};
