/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import {
  DataContext,
  DataDispatchContext,
} from "../../../contexts/dataContext";
import { systemColors } from "../../../styles/colors";
import { box } from "../../../styles/css";
import { Button } from "../../atoms/Button";
import { EditableText } from "../../atoms/EditableText";
export const TopPanel = () => {
  const dataContext = useContext(DataContext);
  const dataDispatchContext = useContext(DataDispatchContext);
  const [fileName, setFileName] = useState("file name");
  const handleChangeFileNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };
  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = event.target.files?.[0];
    reader.readAsText(file as File);
    reader.onload = () => {
      const json = JSON.parse(reader.result as string);
      dataDispatchContext.loadData(json);
    };
    //同じファイルだとonChangeが発火しないので空にする
    event.target.value = "";
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const saveData = new Blob([JSON.stringify(dataContext.data)], {
    type: "text/json",
  });
  return (
    <div css={[navigation, box]}>
      <div
        css={css`
          width: 120px;
        `}
      >
        <EditableText
          value={fileName}
          color="red"
          onChange={handleChangeFileNameInput}
        />
      </div>
      <a
        download={`${fileName}.json`}
        href={window.URL.createObjectURL(saveData)}
        css={css`
          text-decoration: none !important;
        `}
      >
        <Button label="save" />
      </a>
      <form onSubmit={handleSubmit}>
        <label>
          <Button as="a" label="load" />
          <input
            type="file"
            id="file"
            accept=".json"
            onChange={handleUpload}
            css={css`
              display: none;
            `}
          />
        </label>
      </form>
    </div>
  );
};
const navigation = css`
  height: 100%;
  display: flex;
  gap: 12px;
  padding: 0 8px;
  align-items: center;
  background-color: ${systemColors.greyBackground};
  border-bottom: solid 1.5px ${systemColors.greyBorder};
  ${box}
`;
