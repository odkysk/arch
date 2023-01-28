/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { CanvasColor } from "../../models/Color";
import { canvasColors, systemColors } from "../../styles/colors";

interface Props extends RadixCheckbox.CheckboxProps {
  canvasColor?: CanvasColor;
}
export const Checkbox = ({ canvasColor, ...props }: Props) => {
  const backgroundColor = canvasColor
    ? canvasColors[canvasColor].background
    : systemColors.greyBackground;
  const checkedBackgroundColor = canvasColor
    ? canvasColors[canvasColor].main
    : systemColors.grey;
  const borderColor = canvasColor
    ? canvasColors[canvasColor].border
    : systemColors.greyBorder;
  return (
    <RadixCheckbox.Root
      className="RadixCheckboxRoot"
      defaultChecked
      id="c1"
      css={[
        css`
          width: 16px;
          height: 16px;
          background-color: ${backgroundColor};
          border: solid 1.5px ${borderColor};
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          &:disabled {
            opacity: 0.2;
          }
        `,
        props.checked &&
          css`
            background-color: ${checkedBackgroundColor};
          `,
      ]}
      {...props}
    >
      <RadixCheckbox.Indicator>
        <FontAwesomeIcon
          icon={faCheck}
          fontSize="0.75em"
          color={systemColors.white}
        />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
};
