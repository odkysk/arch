import { Dispatch } from "react";
import { Data } from "../../models/Data";

export const deleteRelation = (
  data: Data,
  setData: Dispatch<Data>,
  id: string
) => {
  setData({
    ...data,
    relations: data.relations.filter((relation) => {
      return relation.id !== id;
    }),
  });
};
