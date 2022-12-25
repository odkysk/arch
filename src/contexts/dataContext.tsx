import { ReactNode, createContext, useState } from "react";
import { Data, data as saveData } from "../data/data";
import { Member } from "../models/Member";
import { Position } from "../models/Position";

export const DataContext = createContext({
  data: saveData,
  findMember: (memberId: string) => saveData.members[0],
  moveMember: (memberId: string, position: Position) => {},
  updateMemberName: (memberId: string, name: string) => {},
  addMember: () => {},
  updateRelationName: (relationId: string, name: string) => {},
  addRelation: (name: string, start: string, end: string) => {},
  deleteRelation: (id: string) => {},
});
interface Props {
  children: ReactNode;
}

export const DataContextProvider = ({ children }: Props) => {
  const [dataState, setDataState] = useState<Data>(saveData);
  const findMember = (memberId: string) => {
    return (
      dataState.members.find((member: Member) => member.id === memberId) ??
      dataState.members[0]
    );
  };
  // TODO: Canvas内のすべてが再レンダリングされてしまうのでメモ化する必要がある?

  const moveMember = (memberId: string, position: Position) => {
    setDataState({
      members: dataState.members.map((member) =>
        member.id === memberId
          ? {
              ...member,
              position: position,
            }
          : { ...member }
      ),
      relations: dataState.relations,
    });
  };
  const updateMemberName = (memberId: string, name: string) => {
    setDataState({
      members: dataState.members.map((member) =>
        member.id === memberId
          ? {
              ...member,
              name: name,
            }
          : { ...member }
      ),
      relations: dataState.relations,
    });
  };
  const addMember = () => {
    setDataState({
      members: [
        ...dataState.members,
        {
          id: dataState.members.length.toString(),
          name: "",
          position: {
            x: 0,
            y: 0,
          },
        },
      ],
      relations: dataState.relations,
    });
  };
  const updateRelationName = (relationId: string, name: string) => {
    setDataState({
      members: dataState.members,
      relations: dataState.relations.map((relation) =>
        relation.id === relationId
          ? {
              ...relation,
              name: name,
            }
          : { ...relation }
      ),
    });
  };
  const addRelation = (name: string, start: string, end: string) => {
    setDataState({
      members: dataState.members,
      relations: [
        ...dataState.relations,
        {
          id: dataState.relations.length?.toString(),
          name: name,
          start: start,
          end: end,
        },
      ],
    });
  };
  const deleteRelation = (id: string) => {
    setDataState({
      members: dataState.members,
      relations: dataState.relations.filter((relation) => {
        return relation.id !== id;
      }),
    });
  };
  return (
    <DataContext.Provider
      value={{
        data: dataState,
        moveMember,
        updateMemberName,
        findMember,
        addMember,
        updateRelationName,
        addRelation,
        deleteRelation,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
