import { createContext, ReactNode, useState } from "react";
export interface Tool {
  name: "selection" | "relation" | "member";
  options?: { relationId: string };
}
export const ToolContext = createContext({
  currentTool: { name: "selection" } as Tool,
  setRelationTool: (relationId: string) => {},
  setSelectionTool: () => {},
});

interface ToolContextProviderProps {
  children: ReactNode;
}
export const ToolContextProvider = ({ children }: ToolContextProviderProps) => {
  const [currentTool, setCurrentTool] = useState<Tool>({
    name: "selection",
  });
  const actions = {
    setRelationTool: (relationId: string) => {
      setCurrentTool({ name: "relation", options: { relationId: relationId } });
    },
    setSelectionTool: () => {
      setCurrentTool({ name: "selection" });
    },
  };
  return (
    <ToolContext.Provider
      value={{
        currentTool,
        ...actions,
      }}
    >
      {children}
    </ToolContext.Provider>
  );
};
