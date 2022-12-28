import { useContext } from "react";
import { DataContext } from "../../../contexts/dataContext";
import { Member } from "../../Member";

interface Props {
  view: string;
}

export const Members = ({ view }: Props) => {
  const dataContext = useContext(DataContext);
  const members = dataContext.getMemberArrangements(view).map((arrangement) => {
    const memberId = arrangement.member;
    if (arrangement.visible) {
      return <Member key={memberId} id={memberId} view={view} />;
    }
  });
  return <>{members}</>;
};
