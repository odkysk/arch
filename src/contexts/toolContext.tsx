import React, { createContext, useState } from "react";
type Tool = "selection" | "relation" | "member";
export const ToolContext = createContext({
  mode: "selection",
  setMode: (mode: Tool) => {},
});

interface ToolContextProviderProps {
  children: React.ReactNode;
}
export const ToolContextProvider = ({ children }: ToolContextProviderProps) => {
  const [mode, dispatch] = useState<Tool>("selection");
  const setMode = (mode: Tool) => {
    dispatch(mode);
  };
  return (
    <ToolContext.Provider
      value={{
        mode,
        setMode,
      }}
    >
      {children}
    </ToolContext.Provider>
  );
};
