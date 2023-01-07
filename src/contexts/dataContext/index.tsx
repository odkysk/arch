import { createContext, ReactNode, useState } from "react";
import { data as saveData } from "../../data/data";
import { CanvasColor } from "../../models/Color";
import {
  Arrangement,
  Connection,
  Data,
  Member,
  Position,
  View_Relation_Visibility,
} from "../../models/Data";
import { addConnection as addConnectionCallback } from "./addConnection";
import { addMember as addMemberCallback } from "./addMember";
import { addRelation as addRelationCallback } from "./addRelation";
import { addView as addViewCallback } from "./addView";
import { deleteConnection as deleteConnectionCallback } from "./deleteConnection";
import { getMember as getMemberCallback } from "./getMember";
import { getMemberArrangement as getMemberArrangementCallback } from "./getMemberArrangement";
import { getMemberArrangements as getMemberArrangementsCallback } from "./getMemberArrangements";
import { getRelationsConnectedToMember as getRelationsConnectedToMemberCallback } from "./getRelationsConnectedToMember";
import { getRelationVisibility as getRelationVisibilityCallback } from "./getRelationVisibility";
import { loadData as loadDataCallback } from "./loadData";
import { setConnectionName as setConnectionNameCallback } from "./setConnectionName";
import { setMemberName as setMemberNameCallback } from "./setMemberName";
import { setMemberPosition as setMemberPositionCallback } from "./setMemberPosition";
import { setMemberVisibility as setMemberVisibilityCallback } from "./setMemberVisibility";
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
      connectionId: string
    ) => View_Relation_Visibility;
    getRelationsConnectedToMember: (memberId: string) => Connection[];
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
    addView: () => void;
    addRelation: (color: CanvasColor, visibleViewId?: string) => void;
    setConnectionName: (connectionId: string, name: string) => void;
    addConnection: (
      relationId: string,
      name: string,
      startMemberId: string,
      endMemberId: string
    ) => void;
    deleteConnection: (connectionId: string) => void;
    setRelationVisibility: (
      viewId: string,
      relationId: string | string[],
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
    getRelationsConnectedToMember: (memberId: string) =>
      getRelationsConnectedToMemberCallback(data, memberId),
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
    setConnectionName: (connectionId: string, name: string) => {
      setConnectionNameCallback(data, setData, connectionId, name);
    },
    addConnection: (
      relationId: string,
      name: string,
      startMemberId: string,
      endMemberId: string
    ) => {
      addConnectionCallback(
        data,
        setData,
        relationId,
        name,
        startMemberId,
        endMemberId
      );
    },
    addMember: () => {
      addMemberCallback(data, setData);
    },
    addView: () => {
      addViewCallback(data, setData);
    },
    addRelation: (color: CanvasColor, visibleViewId?: string) => {
      addRelationCallback(data, setData, color, visibleViewId);
    },
    deleteConnection: (connectionId: string) => {
      deleteConnectionCallback(data, setData, connectionId);
    },
    setRelationVisibility: (
      viewId: string,
      relationId: string | string[],
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
