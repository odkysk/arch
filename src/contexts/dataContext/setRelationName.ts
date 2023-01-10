import { Dispatch } from "react";
import { Data } from "../../models/Data";

export const setRelationName = (
  data: Data,
  setData: Dispatch<Data>,
  relationId: string,
  name: string
) => {
  setData({
    ...data,
    relations: data.relations.map((relation) =>
      relation.id === relationId
        ? {
            ...relation,
            name: name,
          }
        : { ...relation }
    ),
  });
};
