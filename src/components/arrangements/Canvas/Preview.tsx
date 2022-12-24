import { useContext } from "react";
import { PreviewContext } from "../../../contexts/previewContext";
import { Relation } from "../../Relation";
export const Preview = () => {
  const previewContext = useContext(PreviewContext);
  const relationStart = previewContext.relationPreviewStart;
  const relationEnd = previewContext.relationPreviewEnd;
  return (
    <>
      <Relation start={relationStart} end={relationEnd} />
    </>
  );
};
