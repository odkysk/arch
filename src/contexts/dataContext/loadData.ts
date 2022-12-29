import { Data } from "../../models/Data";

export const loadData = (setData: (data: Data) => void, data: Data) => {
  setData(data);
};
