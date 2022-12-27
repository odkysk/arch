import React, { createContext, useState } from "react";
export const ViewContext = createContext({
  view: "0",
  setView: (id: string) => {},
});

interface ViewContextProviderProps {
  children: React.ReactNode;
}
export const ViewContextProvider = ({ children }: ViewContextProviderProps) => {
  const [view, setViewState] = useState<string>("0");
  const setView = (id: string) => {
    setViewState(id);
  };
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
