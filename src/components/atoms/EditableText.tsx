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
  const initialValue = useRef("");
  const ref = useRef<HTMLInputElement>(null);
  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    props.onFocus && props.onFocus(event);
    initialValue.current = event.target.value;
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      ref.current?.blur();
    } else if (event.key === "Escape") {
      ref.current?.blur();
      if (ref.current) ref.current.value = initialValue.current;
    }
  };
  return (
    <input
      ref={ref}
      css={[input, body, rounded]}
      autoFocus
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
  &:focus {
    background-color: ${colors.system.white};
    border: solid 1.5px ${colors.system.greyBorder};
  }
  ${onHover(
    css`
      border: solid 1.5px ${colors.system.greyBorder};
    `
  )}
  transition:all 100ms ease-out;
`;
