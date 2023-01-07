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
    views: data.views.map((connection) =>
      connection.id === viewId
        ? {
            ...connection,
            name: name,
          }
        : { ...connection }
    ),
  });
};
