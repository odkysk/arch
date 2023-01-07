import { Dispatch } from "react";
import { Data } from "../../models/Data";
import { makeId } from "../../utilities/makeId";
export const addConnection = (
  data: Data,
  setData: Dispatch<Data>,
  name: string,
  startMemberId: string,
  endMemberId: string
) => {
  const connectionId = makeId();
  if (startMemberId !== endMemberId) {
    setData({
      ...data,
      connections: [
        ...data.connections,
        {
          id: connectionId,
          relationId: "0",
          name: name,
          startMemberId: startMemberId,
          endMemberId: endMemberId,
        },
      ],
      view_connection_visibilities: data.view_connection_visibilities.concat(
        data.views.map((view) => ({
          viewId: view.id,
          connectionId: connectionId,
          isVisible: true,
        }))
      ),
    });
  }
};
