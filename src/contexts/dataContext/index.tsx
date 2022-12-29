import { createContext, ReactNode, useState } from "react";
import { data as saveData } from "../../data/data";
import { Arrangement, Data, Member, Position } from "../../models/Data";
import { addMember as addMemberCallback } from "./addMember";
import { addRelation as addRelationCallback } from "./addRelation";
import { deleteRelation as deleteRelationCallback } from "./deleteRelation";
import { getMember as getMemberCallback } from "./getMember";
import { getMemberArrangement as getMemberArrangementCallback } from "./getMemberArrangement";
import { getMemberArrangements as getMemberArrangementsCallback } from "./getMemberArrangements";
import { loadData as loadDataCallback } from "./loadData";
import { setMemberName as setMemberNameCallback } from "./setMemberName";
import { setMemberPosition as setMemberPositionCallback } from "./setMemberPosition";
import { setMemberVisibility as setMemberVisibilityCallback } from "./setMemberVisibility";
import { setRelationName as setRelationNameCallback } from "./setRelationName";

export const DataContext = createContext(
  {} as {
    data: Data;
    loadData: (data: Data) => void;
    getMember: (memberId: string) => Member;
    getMemberArrangement: (viewId: string, memberId: string) => Arrangement;
    getMemberArrangements: (viewId: string) => Arrangement[];
    setMemberVisibility: (
      viewId: string,
      memberId: string,
      isVisible: boolean
    ) => void;
    setMemberPosition: (
      viewId: string,
      memberId: string,
      position: Position
    ) => void;
    setMemberName: (memberId: string, name: string) => void;
    addMember: () => void;
    setRelationName: (relationId: string, name: string) => void;
    addRelation: (name: string, start: string, end: string) => void;
    deleteRelation: (id: string) => void;
  }
);
interface Props {
  children: ReactNode;
}

export const DataContextProvider = ({ children }: Props) => {
  const [data, setData] = useState<Data>(saveData);
  // MEMO: Canvas内のすべてが再レンダリングされてしまうのでパフォーマンスは最悪
  const actions = {
    loadData: (data: Data) => {
      loadDataCallback(setData, data);
    },
    getMember: (memberId: string) => {
      return getMemberCallback(data, memberId);
    },
    getMemberArrangement: (viewId: string, memberId: string) => {
      return getMemberArrangementCallback(data, viewId, memberId);
    },
    getMemberArrangements: (viewId: string) => {
      return getMemberArrangementsCallback(data, viewId);
    },
    setMemberVisibility: (
      viewId: string,
      memberId: string,
      isVisible: boolean
    ) => {
      setMemberVisibilityCallback(data, setData, viewId, memberId, isVisible);
    },
    setMemberPosition: (
      viewId: string,
      memberId: string,
      position: Position
    ) => {
      setMemberPositionCallback(data, setData, viewId, memberId, position);
    },
    setMemberName: (memberId: string, name: string) => {
      setMemberNameCallback(data, setData, memberId, name);
    },
    setRelationName: (relationId: string, name: string) => {
      setRelationNameCallback(data, setData, relationId, name);
    },
    addRelation: (name: string, start: string, end: string) => {
      addRelationCallback(data, setData, name, start, end);
    },
    addMember: () => {
      addMemberCallback(data, setData);
    },
    deleteRelation: (id: string) => {
      deleteRelationCallback(data, setData, id);
    },
  };

  return (
    <DataContext.Provider
      value={{
        data,
        ...actions,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
