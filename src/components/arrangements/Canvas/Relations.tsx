import { useContext } from "react";
import { DataContext } from "../../../contexts/dataContext";
import { Relation } from "../../Relation";

export const Relations = () => {
  const dataContext = useContext(DataContext);
  const relations = dataContext.data.relations.map((relation) => {
    const startMember = dataContext.findMember(relation.start);
    const endMember = dataContext.findMember(relation.end);
    console.log(dataContext.data.relations);
    return (
      <Relation
        key={relation.id}
        start={startMember.position}
        end={endMember.position}
      />
    );
  });
  return <>{relations}</>;
};
