/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  DetailedHTMLProps,
  FocusEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  useRef,
} from "react";
import { colors } from "../../styles/colors";
import { body, onHover, rounded } from "../../styles/css";
interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onDiscard?: (event: any) => void;
}
export const EditableText = ({ onDiscard, ...props }: Props) => {
  const valueOnFocus = useRef("");
  const ref = useRef<HTMLInputElement>(null);
  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    props.onFocus && props.onFocus(event);
    valueOnFocus.current = event.target.value;
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      //日本語変換完了のEnter (keyCode === 229) との判別
      if (event.keyCode !== 229) ref.current?.blur();
    } else if (event.key === "Escape") {
      //discard機能
      ref.current?.blur();
      if (ref.current) ref.current.value = valueOnFocus.current;
    }
  };
  return (
    <input
      ref={ref}
      css={[input, body, rounded]}
      type="text"
      {...props}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
    />
  );
};
const input = css`
  width: 100%;
  height: 2em;
  padding: 0 6px;
  font-size: 14px !important;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  outline: none;
  border: solid 1.5px rgba(0, 0, 0, 0);
  ${onHover(
    css`
      border: solid 1.5px ${colors.system.greyBorder};
    `
  )}
  &:focus {
    background-color: ${colors.system.white};
    border: solid 1.5px ${colors.system.greyBorder};
  }
  transition: all 100ms ease-out;
`;
