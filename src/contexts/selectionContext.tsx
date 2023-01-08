import React, { createContext, useState } from "react";

export const SelectionContext = createContext({} as any);

interface SelectionContextProviderProps {
  children: React.ReactNode;
}
export const SelectionContextProvider = ({
  children,
}: SelectionContextProviderProps) => {
  const [members, setMembers] = useState<string[]>([]);
  const [connections, setConnections] = useState<string[]>([]);
  const [relations, setRelations] = useState<string[]>([]);

  const actions = {
    selectRelation: (relationId: string) => {
      setRelations([relationId]);
    },
    pushRelation: (relationId: string) => {
      setRelations(relations.concat(relationId));
    },
    resetSelection: () => {
      setMembers([]);
      setConnections([]);
      setRelations([]);
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
