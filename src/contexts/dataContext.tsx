import { createContext, ReactNode, useState } from "react";
import { Data, data as saveData } from "../data/data";
import { Member } from "../models/Members";
import { Position } from "../models/Position";
export const DataContext = createContext({
  data: saveData,
  findMember: (memberId: string) => saveData.members[0],
  moveMember: (memberId: string, position: Position) => {},
  addMember: () => {},
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
  // TODO: Canvas内のすべてが再レンダリングされていまうのでメモ化する必要がある
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
  return (
    <DataContext.Provider
      value={{ data: dataState, moveMember, findMember: findMember, addMember }}
    >
      {children}
    </DataContext.Provider>
  );
};
