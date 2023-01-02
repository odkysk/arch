import { createContext, ReactNode, useContext, useState } from "react";
import { DataContext } from "./dataContext";

export const ViewContext = createContext({
  currentViewId: "0",
  setCurrentViewId: (id: string) => {},
});

interface ViewContextProviderProps {
  children: ReactNode;
}
export const ViewContextProvider = ({ children }: ViewContextProviderProps) => {
  const dataContext = useContext(DataContext);
  const [currentViewId, setCurrentViewId] = useState<string>(
    dataContext.data.views[0].id
  );

  return (
    <ViewContext.Provider
      value={{
        currentViewId,
        setCurrentViewId,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
};
