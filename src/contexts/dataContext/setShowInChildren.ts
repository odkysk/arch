import { Dispatch, SetStateAction } from "react";
import { Data } from "../../models/Data";

export const setShowInChildren = (
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
              options: {
                ...relation.options,
                showInChildren: showInChildren,
              },
            }
          : relation
      ),
    };
  });
};
