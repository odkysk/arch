/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, useState } from "react";
import { systemColors } from "../../../styles/colors";
import { caption } from "../../../styles/css";
interface Props {
  title: string;
  canFold?: boolean;
  rightIcon?: ReactNode;
  onClickRightIcon?: () => void;
  children: ReactNode;
}
export const PanelSection = ({
  title,
  canFold = true,
  rightIcon,
  children,
}: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const handleClickFolder = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div css={panelSection}>
      <div css={head}>
        {canFold && (
          <FontAwesomeIcon
            onClick={handleClickFolder}
            css={
              isOpen &&
              css`
                transform: rotate(90deg);
              `
            }
            icon={faCaretRight}
            fontSize="0.75em"
            color={systemColors.grey}
          />
        )}
        <p css={[titleCss, caption]}>{title}</p>
        {rightIcon}
      </div>
      {isOpen && children}
    </div>
  );
};

const panelSection = css`
  padding: 0 6px;
`;
const head = css`
  padding: 0 0 0 6px;
  display: flex;
  align-items: center;
  gap: 3px;
  min-height: 24px;
`;
const titleCss = css`
  color: ${systemColors.grey};
  flex: 1;
`;
