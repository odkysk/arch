import { createContext, ReactNode, useState } from "react";
import { data as saveData } from "../data/data";
import { Arrangement, Data, Member, Position } from "../models/Data";

interface Context {
  data: Data;
  loadData: (data: Data) => void;
  findMember: (memberId: string) => Member;
  getMemberPosition: (viewId: string, memberId: string) => Position;
  getMemberArrangement: (viewId: string, memberId: string) => Arrangement;
  setMemberVisibility: (
    viewId: string,
    memberId: string,
    visibility: boolean
  ) => void;
  moveMember: (viewId: string, memberId: string, position: Position) => void;
  updateMemberName: (memberId: string, name: string) => void;
  addMember: () => void;
  updateRelationName: (relationId: string, name: string) => void;
  addRelation: (name: string, start: string, end: string) => void;
  deleteRelation: (id: string) => void;
  getMemberArrangements: (viewId: string) => Arrangement[];
}

export const DataContext = createContext<Context>({
  data: saveData,
  loadData: (data: Data) => {},
  findMember: (memberId: string) => saveData.members[0],
  getMemberPosition: (viewId: string, memberId: string) => ({ x: 0, y: 0 }),
  getMemberArrangement: (viewId: string, memberId: string) => ({
    view: "undefined",
    member: "undefined",
    position: { x: 0, y: 0 },
    visible: false,
  }),
  setMemberVisibility: (
    viewId: string,
    memberId: string,
    visibility: boolean
  ) => {},
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
  const makeId = () =>
    new Date().getTime().toString() + Math.floor(Math.random() * 10).toString();
  const getMemberArrangement = (viewId: string, memberId: string) => {
    const arrangement = dataState.view_member_arrangements.find(
      (arrangement) =>
        arrangement.view === viewId && arrangement.member === memberId
    );
    return (
      arrangement || {
        view: "undefined",
        member: "undefined",
        position: { x: 0, y: 0 },
        visible: false,
      }
    );
  };
  const getMemberArrangements = (viewId: string) => {
    let result: Arrangement[] = [];
    dataState.view_member_arrangements.map((arrangement) => {
      if (arrangement.view === viewId) {
        result.push(arrangement);
      }
    });
    return result;
  };
  const setMemberVisibility = (
    viewId: string,
    memberId: string,
    visible: boolean
  ) => {
    setDataState({
      ...dataState,
      view_member_arrangements: dataState.view_member_arrangements.map(
        (arrangement) => {
          return arrangement.view === viewId && arrangement.member === memberId
            ? {
                ...arrangement,
                visible: visible,
              }
            : arrangement;
        }
      ),
    });
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
  const getMemberPosition = (viewId: string, memberId: string) => {
    const arrangement = dataState.view_member_arrangements.find(
      (arrangement) =>
        arrangement.view === viewId && arrangement.member === memberId
    );
    return arrangement?.position || { x: 0, y: 0 };
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
    const newMemberId = makeId();
    const newArrangements = dataState.views.map((view) => ({
      view: view.id,
      member: newMemberId,
      position: { x: 0, y: 0 },
      visible: true,
    }));
    setDataState({
      ...dataState,
      members: [
        ...dataState.members,
        {
          id: newMemberId,
          name: "new member",
        },
      ],
      view_member_arrangements:
        dataState.view_member_arrangements.concat(newArrangements),
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
    if (start !== end) {
      setDataState({
        ...dataState,
        relations: [
          ...dataState.relations,
          {
            id: makeId(),
            name: name,
            start: start,
            end: end,
          },
        ],
      });
    }
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
        getMemberPosition,
        getMemberArrangement,
        setMemberVisibility,
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
