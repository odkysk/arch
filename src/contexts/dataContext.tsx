import { ReactNode, createContext, useState } from "react";
import { data as saveData } from "../data/data";
import { Arrangement, Data, Member, Position } from "../models/Data";

export const DataContext = createContext({
  data: saveData,
  loadData: (data: Data) => {},
  findMember: (memberId: string) => saveData.members[0],
  moveMember: (viewId: string, memberId: string, position: Position) => {},
  updateMemberName: (memberId: string, name: string) => {},
  addMember: () => {},
  updateRelationName: (relationId: string, name: string) => {},
  addRelation: (name: string, start: string, end: string) => {},
  deleteRelation: (id: string) => {},
  getMemberArrangements: (viewId: string) => saveData.view_member_arrangements,
});
interface Props {
  children: ReactNode;
}

export const DataContextProvider = ({ children }: Props) => {
  const [dataState, setDataState] = useState<Data>(saveData);
  const getMemberArrangements = (viewId: string) => {
    let result: Arrangement[] = [];
    dataState.view_member_arrangements.map((arrangement) => {
      if (arrangement.view === viewId) {
        result.push(arrangement);
      }
    });
    return result;
  };
  const loadData = (data: Data) => {
    setDataState(data);
  };
  const findMember = (memberId: string) => {
    return (
      dataState.members.find((member: Member) => member.id === memberId) ??
      dataState.members[0]
    );
  };
  // TODO: Canvas内のすべてが再レンダリングされてしまうのでメモ化する必要がある?

  const moveMember = (viewId: string, memberId: string, position: Position) => {
    setDataState({
      ...dataState,
      view_member_arrangements: dataState.view_member_arrangements.map(
        (arrangement) =>
          arrangement.view === viewId && arrangement.member === memberId
            ? {
                ...arrangement,
                position: position,
              }
            : {
                ...arrangement,
              }
      ),
    });
  };
  const updateMemberName = (memberId: string, name: string) => {
    setDataState({
      ...dataState,
      members: dataState.members.map((member) =>
        member.id === memberId
          ? {
              ...member,
              name: name,
            }
          : { ...member }
      ),
    });
  };
  const addMember = () => {
    setDataState({
      ...dataState,
      members: [
        ...dataState.members,
        {
          id: dataState.members.length.toString(),
          name: "",
        },
      ],
    });
  };
  const updateRelationName = (relationId: string, name: string) => {
    setDataState({
      ...dataState,
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
      ...dataState,
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
      ...dataState,
      relations: dataState.relations.filter((relation) => {
        return relation.id !== id;
      }),
    });
  };
  return (
    <DataContext.Provider
      value={{
        data: dataState,
        loadData,
        moveMember,
        updateMemberName,
        findMember,
        addMember,
        updateRelationName,
        addRelation,
        deleteRelation,
        getMemberArrangements,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
