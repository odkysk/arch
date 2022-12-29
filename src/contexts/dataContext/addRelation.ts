import { Dispatch } from "react";
import { Data } from "../../models/Data";
import { makeId } from "../../utilities/makeId";
export const addRelation = (
  data: Data,
  setData: Dispatch<Data>,
  name: string,
  start: string,
  end: string
) => {
  if (start !== end) {
    setData({
      ...data,
      relations: [
        ...data.relations,
        {
          id: makeId(),
          name: name,
          start: start,
          end: end,
        },
      ],
    });
  }
};
