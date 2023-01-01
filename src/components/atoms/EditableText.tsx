/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import { colors } from "../../styles/colors";
import { body, rounded } from "../../styles/css";
interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}
export const EditableText = ({ ...props }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleClickDisplay = () => {
    setIsFocused(true);
  };
  const handleOnBlur = () => {
    setIsFocused(false);
  };
  return (
    <div
      css={[editableText, rounded, isFocused && focused]}
      onClick={handleClickDisplay}
    >
      {isFocused ? (
        <input
          css={[input, body]}
          autoFocus
          type="text"
          {...props}
          onBlur={handleOnBlur}
        />
      ) : (
        <p css={[body, text]}>{props.value}</p>
      )}
    </div>
  );
};
const editableText = css`
  height: 2em;
  display: flex;
  align-items: center;
  padding: 0 6px;
`;
const input = css`
  background-color: rgba(0, 0, 0, 0);
  padding: 0;
  border: none;
  outline: none;
`;
const text = css`
  border: solid 1.5px rgba(0, 0, 0, 0);
`;
const focused = css`
  background-color: ${colors.system.white};
  border: solid 1.5px ${colors.system.greyBorder};
`;
