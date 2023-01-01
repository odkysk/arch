import { Dispatch } from "react";
import { Data } from "../../models/Data";

export const setViewName = (
  data: Data,
  setData: Dispatch<Data>,
  viewId: string,
  name: string
) => {
  setData({
    ...data,
    views: data.views.map((relation) =>
      relation.id === viewId
        ? {
            ...relation,
            name: name,
          }
        : { ...relation }
    ),
  });
};
