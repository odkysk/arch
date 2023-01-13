import { Dispatch, SetStateAction } from "react";
import { Data } from "../../models/Data";

export const setShowAsTag = (
  setData: Dispatch<SetStateAction<Data>>,
  relationId: string,
  showInChildren: boolean
) => {
  setData((data) => {
    return {
      ...data,
      relations: data.relations.map((relation) =>
        relation.id === relationId
          ? {
              ...relation,
              showAsTag: showInChildren,
            }
          : relation
      ),
    };
  });
};
