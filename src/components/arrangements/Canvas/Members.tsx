import { useContext } from "react";
import { DataContext } from "../../../contexts/dataContext";
import { Member } from "../../Member";

export const Members = () => {
  const dataContext = useContext(DataContext);
  const members = dataContext.data.members.map((member) => {
    return <Member key={member.id} id={member.id} />;
  });
  return <>{members}</>;
};
