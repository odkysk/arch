/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useState,
} from "react";
import { CanvasColor } from "../../models/Color";
import { canvasColors, systemColors } from "../../styles/colors";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  canvasColor?: CanvasColor;
}
export const Checkbox = ({ canvasColor, ...props }: Props) => {
  const [isChecked, setIsChecked] = useState(props.checked);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };
  return (
    <label>
      <div
        css={[
          css`
            width: 16px;
            height: 16px;
            background-color: ${systemColors.greyBackground};
            border: solid 1.5px ${systemColors.greyBorder};
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
          `,
          canvasColor &&
            css`
              background-color: ${canvasColors[canvasColor].background};
              border-color: ${canvasColors[canvasColor].border};
            `,
          isChecked &&
            css`
              background-color: ${systemColors.black};
            `,
          isChecked &&
            canvasColor &&
            css`
              background-color: ${canvasColors[canvasColor].main};
            `,
        ]}
      >
        {isChecked && (
          <FontAwesomeIcon
            icon={faCheck}
            fontSize="0.75em"
            color={systemColors.white}
          />
        )}
      </div>
      <input
        type="checkbox"
        onChange={handleChange}
        css={css`
          display: none;
        `}
        {...props}
      />
    </label>
  );
};
