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
  if (startMemberId !== endMemberId) {
    setData({
      ...data,
      relations: [
        ...data.relations,
        {
          id: makeId(),
          name: name,
          startMemberId: startMemberId,
          endMemberId: endMemberId,
        },
      ],
    });
  }
};
