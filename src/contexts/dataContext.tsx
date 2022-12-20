import { createContext, ReactNode } from "react";
import { data } from "../data/data";
export const DataContext = createContext(data);
interface Props {
  children: ReactNode;
}
export const DataContextProvider = ({ children }: Props) => {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
