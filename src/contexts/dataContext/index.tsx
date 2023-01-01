import { createContext, ReactNode, useState } from "react";
import { data as saveData } from "../../data/data";
import {
  Arrangement,
  Data,
  Member,
  Position,
  Relation,
  View_Relation_Visibility,
} from "../../models/Data";
import { addMember as addMemberCallback } from "./addMember";
import { addRelation as addRelationCallback } from "./addRelation";
import { deleteRelation as deleteRelationCallback } from "./deleteRelation";
import { getMember as getMemberCallback } from "./getMember";
import { getMemberArrangement as getMemberArrangementCallback } from "./getMemberArrangement";
import { getMemberArrangements as getMemberArrangementsCallback } from "./getMemberArrangements";
import { getRelationsRelatedToMember as getRelationsRelatedToMemberCallback } from "./getRelationsRlatedToMember";
import { getRelationVisibility as getRelationVisibilityCallback } from "./getRelationVisibility";
import { loadData as loadDataCallback } from "./loadData";
import { setMemberName as setMemberNameCallback } from "./setMemberName";
import { setMemberPosition as setMemberPositionCallback } from "./setMemberPosition";
import { setMemberVisibility as setMemberVisibilityCallback } from "./setMemberVisibility";
import { setRelationName as setRelationNameCallback } from "./setRelationName";
import { setRelationVisibility as setRelationVisibilityCallback } from "./setRelationVisibility";
import { setViewName as setViewNameCallback } from "./setViewName";

export const DataContext = createContext(
  {} as {
    data: Data;
    loadData: (data: Data) => void;
    getMember: (memberId: string) => Member;
    getMemberArrangement: (viewId: string, memberId: string) => Arrangement;
    getMemberArrangements: (viewId: string) => Arrangement[];
    getRelationVisibility: (
      viewId: string,
      relationId: string
    ) => View_Relation_Visibility;
    getRelationsRelatedToMember: (memberId: string) => Relation[];
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
    addRelation: (
      name: string,
      startMemberId: string,
      endMemberId: string
    ) => void;
    deleteRelation: (relationId: string) => void;
    setRelationVisibility: (
      viewId: string,
      relationId: string,
      isVisible: boolean
    ) => void;
    setViewName: (viewId: string, name: string) => void;
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
    getMember: (memberId: string) => getMemberCallback(data, memberId),
    getMemberArrangement: (viewId: string, memberId: string) => {
      return getMemberArrangementCallback(data, viewId, memberId);
    },
    getMemberArrangements: (viewId: string) => {
      return getMemberArrangementsCallback(data, viewId);
    },
    getRelationVisibility: (viewId: string, relationId: string) =>
      getRelationVisibilityCallback(data, viewId, relationId),
    getRelationsRelatedToMember: (memberId: string) =>
      getRelationsRelatedToMemberCallback(data, memberId),
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
    addRelation: (name: string, startMemberId: string, endMemberId: string) => {
      addRelationCallback(data, setData, name, startMemberId, endMemberId);
    },
    addMember: () => {
      addMemberCallback(data, setData);
    },
    deleteRelation: (relationId: string) => {
      deleteRelationCallback(data, setData, relationId);
    },
    setRelationVisibility: (
      viewId: string,
      relationId: string,
      isVisible: boolean
    ) => {
      setRelationVisibilityCallback(
        data,
        setData,
        viewId,
        relationId,
        isVisible
      );
    },
    setViewName: (viewId: string, name: string) => {
      setViewNameCallback(data, setData, viewId, name);
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
