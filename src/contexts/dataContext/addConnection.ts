import { Dispatch, SetStateAction } from "react";
import { v4 as uuid } from "uuid";
import { Data } from "../../models/Data";

export const addConnection = (
  setData: Dispatch<SetStateAction<Data>>,
  relationId: string,
  startMemberId: string,
  endMemberId: string
) => {
  const connectionId = uuid();
  if (startMemberId !== endMemberId) {
    setData((data) => {
      return {
        ...data,
        connections: [
          ...data.connections,
          {
            id: connectionId,
            relationId: relationId,
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
      };
    });
  }
};
