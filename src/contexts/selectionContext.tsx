import { createContext, ReactNode, useContext, useState } from "react";
import { ToolContext } from "./toolContext";

export const SelectionContext = createContext(
  {} as {
    members: string[];
    relations: string[];
    connections: string[];
    selectRelation: (relationId: string) => void;
    pushRelation: (relationId: string) => void;
    resetSelection: () => void;
  }
);

interface SelectionContextProviderProps {
  children: ReactNode;
}
export const SelectionContextProvider = ({
  children,
}: SelectionContextProviderProps) => {
  const [members, setMembers] = useState<string[]>([]);
  const [connections, setConnections] = useState<string[]>([]);
  const [relations, setRelations] = useState<string[]>([]);
  const toolContext = useContext(ToolContext);
  const actions = {
    selectRelation: (relationId: string) => {
      setRelations([relationId]);
      toolContext.setRelationTool(relationId);
    },
    pushRelation: (relationId: string) => {
      setRelations(relations.concat(relationId));
    },
    resetSelection: () => {
      setMembers([]);
      setConnections([]);
      setRelations([]);
      toolContext.setSelectionTool();
    },
  };

  return (
    <SelectionContext.Provider
      value={{
        members,
        relations,
        connections,
        ...actions,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};
