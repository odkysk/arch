import { createContext, ReactNode, useState } from "react";
import { data as saveData } from "../../data/data";
import { CanvasColor } from "../../models/Color";
import {
  Arrangement,
  Connection,
  Data,
  Member,
  Position,
  Relation,
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
import { getRelation as getRelationCallback } from "./getRelation";
import { getConnectionsConnectedToMember as getConnectionsConnectedToMemberCallback } from "./getRelationsConnectedToMember";
import { getRelationVisibility as getRelationVisibilityCallback } from "./getRelationVisibility";
import { loadData as loadDataCallback } from "./loadData";
import { setConnectionName as setConnectionNameCallback } from "./setConnectionName";
import { setMemberName as setMemberNameCallback } from "./setMemberName";
import { setMemberPosition as setMemberPositionCallback } from "./setMemberPosition";
import { setMemberVisibility as setMemberVisibilityCallback } from "./setMemberVisibility";
import { setRelationName as setRelationNameCallback } from "./setRelationName";
import { setRelationVisibility as setRelationVisibilityCallback } from "./setRelationVisibility";
import { setShowInChildren as setShowInChildrenCallback } from "./setShowInChildren";
import { setViewName as setViewNameCallback } from "./setViewName";
export const DataContext = createContext(
  {} as {
    data: Data;
    getMember: (memberId: string) => Member;
    getMemberArrangement: (viewId: string, memberId: string) => Arrangement;
    getMemberArrangements: (viewId: string) => Arrangement[];
    getRelation: (relationId: string) => Relation | undefined;
    getRelationVisibility: (
      viewId: string,
      connectionId: string
    ) => View_Relation_Visibility;
    getConnectionsConnectedToMember: (memberId: string) => Connection[];
  }
);
export const DataDispatchContext = createContext(
  {} as {
    loadData: (data: Data) => void;
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
    setRelationName: (relationId: string, name: string) => void;
    setShowInChildren: (relationId: string, showInChildren: boolean) => void;
  }
);
interface Props {
  children: ReactNode;
}
export const DataContextProvider = ({ children }: Props) => {
  const [data, setData] = useState<Data>(saveData);
  // MEMO: Canvas内のすべてが再レンダリングされてしまうのでパフォーマンスは最悪
  const getters = {
    getMember: (memberId: string) => getMemberCallback(data, memberId),
    getMemberArrangement: (viewId: string, memberId: string) => {
      return getMemberArrangementCallback(data, viewId, memberId);
    },
    getMemberArrangements: (viewId: string) => {
      return getMemberArrangementsCallback(data, viewId);
    },
    getRelation: (relationId: string) => getRelationCallback(data, relationId),
    getRelationVisibility: (viewId: string, relationId: string) =>
      getRelationVisibilityCallback(data, viewId, relationId),
    getConnectionsConnectedToMember: (memberId: string) =>
      getConnectionsConnectedToMemberCallback(data, memberId),
  };
  const setters = {
    loadData: (data: Data) => {
      loadDataCallback(setData, data);
    },
    setMemberVisibility: (
      viewId: string,
      memberId: string,
      isVisible: boolean
    ) => {
      setMemberVisibilityCallback(setData, viewId, memberId, isVisible);
    },
    setMemberPosition: (
      viewId: string,
      memberId: string,
      position: Position
    ) => {
      setMemberPositionCallback(setData, viewId, memberId, position);
    },
    setMemberName: (memberId: string, name: string) => {
      setMemberNameCallback(setData, memberId, name);
    },
    setConnectionName: (connectionId: string, name: string) => {
      setConnectionNameCallback(setData, connectionId, name);
    },
    addConnection: (
      relationId: string,
      startMemberId: string,
      endMemberId: string
    ) => {
      addConnectionCallback(setData, relationId, startMemberId, endMemberId);
    },
    addMember: () => {
      addMemberCallback(setData);
    },
    addView: () => {
      addViewCallback(setData);
    },
    addRelation: (color: CanvasColor, visibleViewId?: string) => {
      addRelationCallback(setData, color, visibleViewId);
    },
    deleteConnection: (connectionId: string) => {
      deleteConnectionCallback(setData, connectionId);
    },
    setRelationVisibility: (
      viewId: string,
      relationId: string | string[],
      isVisible: boolean
    ) => {
      setRelationVisibilityCallback(setData, viewId, relationId, isVisible);
    },
    setViewName: (viewId: string, name: string) => {
      setViewNameCallback(setData, viewId, name);
    },
    setRelationName: (relationId: string, name: string) => {
      setRelationNameCallback(setData, relationId, name);
    },
    setShowInChildren: (relationId: string, setShowInChildren: boolean) => {
      setShowInChildrenCallback(setData, relationId, setShowInChildren);
    },
  };
  return (
    <DataContext.Provider
      value={{
        data,
        ...getters,
      }}
    >
      <DataDispatchContext.Provider value={{ ...setters }}>
        {children}
      </DataDispatchContext.Provider>
    </DataContext.Provider>
  );
};
