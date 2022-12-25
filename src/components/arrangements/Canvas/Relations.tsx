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
        start={{
          x: startMember.position.x + 60,
          y: startMember.position.y + 60,
        }}
        end={{
          x: endMember.position.x + 60,
          y: endMember.position.y,
        }}
      />
    );
  });
  return <>{relations}</>;
};
