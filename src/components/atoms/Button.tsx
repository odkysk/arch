/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ElementType, ReactNode } from "react";
import { systemColors } from "../../styles/colors";
import { rounded } from "../../styles/css";

interface Props {
  as?: ElementType;
  label: string;
  children?: ReactNode;
  [key: string]: any;
}

export const Button = ({
  as: Component = "button",
  label,
  ...props
}: Props) => {
  return (
    <Component css={button} {...props}>
      {label}
    </Component>
  );
};

const button = css`
  font-size: 12px;
  background-color: ${systemColors.greyBackground};
  border: solid 1px ${systemColors.greyBorder};
  text-decoration: none;
  padding: 6px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${rounded}
`;
