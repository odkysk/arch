import { Dispatch } from "react";
import { Data } from "../../models/Data";
import { makeId } from "../../utilities/makeId";
export const addConnection = (
  data: Data,
  setData: Dispatch<Data>,
  relationId: string,
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
          relationId: relationId,
          name: name,
          startMemberId: startMemberId,
          endMemberId: endMemberId,
        },
      ],
      view_relation_visibilities: data.view_relation_visibilities.concat(
        data.views.map((view) => ({
          viewId: view.id,
          relationId: connectionId,
          isVisible: true,
        }))
      ),
    });
  }
};
