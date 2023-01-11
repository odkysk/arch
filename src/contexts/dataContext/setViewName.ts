import { Dispatch, SetStateAction } from "react";
import { Data } from "../../models/Data";

export const setViewName = (
  setData: Dispatch<SetStateAction<Data>>,
  viewId: string,
  name: string
) => {
  setData((data) => {
    return {
      ...data,
      views: data.views.map((connection) =>
        connection.id === viewId
          ? {
              ...connection,
              name: name,
            }
          : { ...connection }
      ),
    };
  });
};
