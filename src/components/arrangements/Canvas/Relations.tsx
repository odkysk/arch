import { useContext } from "react";
import { DataContext } from "../../../contexts/dataContext";
import { Relation } from "../../Relation";

interface Props {
  view: string;
}

export const Relations = ({ view }: Props) => {
  const dataContext = useContext(DataContext);
  const relations = dataContext.data.relations.map((relation) => {
    const startMemberArrangement = dataContext.getMemberArrangement(
      view,
      relation.startMemberId
    );
    const endMemberArrangement = dataContext.getMemberArrangement(
      view,
      relation.endMemberId
    );
    const visibility = dataContext.getRelationVisibility(view, relation.id);
    const startMemberPosition = startMemberArrangement.position;
    const endMemberPosition = endMemberArrangement.position;
    return visibility.isVisible &&
      startMemberArrangement.isVisible &&
      endMemberArrangement.isVisible ? (
      <Relation
        key={relation.id}
        id={relation.id}
        relation={relation}
        start={{
          x: startMemberPosition.x + 60,
          y: startMemberPosition.y + 55,
        }}
        end={{
          x: endMemberPosition.x + 60,
          y: endMemberPosition.y + 5,
        }}
      />
    ) : (
      <></>
    );
  });
  return <>{relations}</>;
};
