import { Dispatch, SetStateAction } from "react";
import { Data } from "../../models/Data";

export const setRelationName = (
  setData: Dispatch<SetStateAction<Data>>,
  relationId: string,
  name: string
) => {
  setData((data) => {
    return {
      ...data,
      relations: data.relations.map((relation) =>
        relation.id === relationId
          ? {
              ...relation,
              name: name,
            }
          : { ...relation }
      ),
    };
  });
};
