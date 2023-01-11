import { Dispatch, SetStateAction } from "react";
import { Data } from "../../models/Data";

export const loadData = (
  setData: Dispatch<SetStateAction<Data>>,
  data: Data
) => {
  setData(data);
};
