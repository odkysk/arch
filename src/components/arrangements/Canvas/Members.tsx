import { useContext } from "react";
import { DataContext } from "../../../contexts/dataContext";
import { Member } from "../../canvas/Member";

interface Props {
  view: string;
}

export const Members = ({ view }: Props) => {
  const dataContext = useContext(DataContext);
  const members = dataContext.getMemberArrangements(view).map((arrangement) => {
    const memberId = arrangement.memberId;

    const visibilityByArrangement = arrangement.isVisible;

    const relatedRelations = dataContext.getRelationsRelatedToMember(
      arrangement.memberId
    );
    const relatedRelationVisibilities = relatedRelations.map(
      (relation) =>
        dataContext.getRelationVisibility(view, relation.id).isVisible
    );
    const visibilityByRelatedRelation =
      relatedRelationVisibilities.some((e) => e === true) ||
      relatedRelationVisibilities.length === 0;

    if (visibilityByArrangement && visibilityByRelatedRelation) {
      return <Member key={memberId} id={memberId} view={view} />;
    }
  });
  return <>{members}</>;
};
