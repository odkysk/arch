/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ChangeEvent, FormEvent, useContext } from "react";
import { DataContext } from "../../../contexts/dataContext";
import { colors } from "../../../styles/colors";
import { box } from "../../../styles/css";
export const TopPanel = () => {
  const dataContext = useContext(DataContext);
  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = event.target.files?.[0];
    reader.readAsText(file as File);
    reader.onload = () => {
      const json = JSON.parse(reader.result as string);
      dataContext.loadData(json);
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
      <a download="arch.json" href={window.URL.createObjectURL(saveData)}>
        <button css={button}>save</button>
      </a>
      <form onSubmit={handleSubmit}>
        <label>
          <p css={button}>load</p>
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
  display: flex;
  gap: 20px;
  align-items: center;
  background-color: ${colors.system.black};
  height: 44px;
`;
const button = css`
  font-size: 12px;
  background-color: lightgrey;
  border: solid 1px black;
  padding: 6px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
