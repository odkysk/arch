import { Dispatch } from "react";
import { Data } from "../../models/Data";
import { makeId } from "../../utilities/makeId";
export const addRelation = (
  data: Data,
  setData: Dispatch<Data>,
  name: string,
  startMemberId: string,
  endMemberId: string
) => {
  const relationId = makeId();
  if (startMemberId !== endMemberId) {
    setData({
      ...data,
      relations: [
        ...data.relations,
        {
          id: relationId,
          name: name,
          startMemberId: startMemberId,
          endMemberId: endMemberId,
        },
      ],
      view_relation_visibilities: data.view_relation_visibilities.concat(
        data.views.map((view) => ({
          viewId: view.id,
          relationId: relationId,
          isVisible: true,
        }))
      ),
    });
  }
};
