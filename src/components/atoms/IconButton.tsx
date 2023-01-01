/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import { colors } from "../../styles/colors";
import { onHover, rounded } from "../../styles/css";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: ReactNode;
}
export const IconButton = ({ icon, ...props }: Props) => {
  return (
    <button {...props} css={[button, rounded]}>
      {icon}
    </button>
  );
};
const button = css`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  ${onHover(css`
    background-color: ${colors.system.greyBackground};
    border: solid 1.5px ${colors.system.greyBorder};
  `)}
`;
