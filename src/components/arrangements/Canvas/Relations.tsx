import { useContext } from "react";
import { DataContext } from "../../../contexts/dataContext";
import { Relation } from "../../Relation";

interface Props {
  view: string;
}

export const Relations = ({ view }: Props) => {
  const dataContext = useContext(DataContext);
  const relations = dataContext.data.relations.map((relation) => {
    const startMemberPosition = dataContext.getMemberPosition(
      view,
      relation.start
    );
    const endMemberPosition = dataContext.getMemberPosition(view, relation.end);
    return (
      <Relation
        id={relation.id}
        key={relation.id}
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
    );
  });
  return <>{relations}</>;
};
