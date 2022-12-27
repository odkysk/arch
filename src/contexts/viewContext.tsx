import { ReactNode, createContext, useContext, useState } from "react";
import { DataContext } from "./dataContext";

export const ViewContext = createContext({
  view: "0",
  setView: (id: string) => {},
});

interface ViewContextProviderProps {
  children: ReactNode;
}
export const ViewContextProvider = ({ children }: ViewContextProviderProps) => {
  const dataContext = useContext(DataContext);
  const [view, setView] = useState<string>(dataContext.data.views[0].id);

  return (
    <ViewContext.Provider
      value={{
        view,
        setView,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
};
