import { css, SerializedStyles } from "@emotion/react";
export const heading = css`
  font-size: 20px;
  line-height: 28px;
`;
export const body = css`
  font-size: 16px;
  line-height: 24px;
`;
export const caption = css`
  font-size: 12px;
  line-height: 18px;
`;
export const box = css`
  box-shadow: 0 12 48px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(24px);
`;
export const rounded = css`
  border-radius: 8px;
`;
export const onHover = (content: SerializedStyles) =>
  css`
    &:active {
      ${content}
    }
    @media (hover: hover) {
      &:hover {
        ${content}
      }
      &:focus {
        ${content}
      }
    }
  `;
