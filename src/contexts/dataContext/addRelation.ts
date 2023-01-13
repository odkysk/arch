import { Dispatch, SetStateAction } from "react";
import { v4 as uuid } from "uuid";
import { CanvasColor } from "../../models/Color";
import { Data } from "../../models/Data";

export const addRelation = (
  setData: Dispatch<SetStateAction<Data>>,
  color: CanvasColor,
  visibleViewId?: string
) => {
  const relationId = uuid();
  setData((data) => {
    return {
      ...data,
      relations: [
        ...data.relations,
        {
          id: relationId,
          name: "new relation",
          color: color,
          shape: "straight",
          showAsTag: false,
        },
      ],
      view_relation_visibilities: data.view_relation_visibilities.concat(
        data.views.map((view) => ({
          viewId: view.id,
          relationId: relationId,
          isVisible: view.id === visibleViewId ? true : false,
        }))
      ),
    };
  });
};
