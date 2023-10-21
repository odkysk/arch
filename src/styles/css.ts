import { css, SerializedStyles } from "@emotion/react";
export const heading = css`
  font-size: 1.5em;
  line-height: 133%;
  cursor: default;
  user-select: none;
`;
export const body = css`
  font-size: 1em;
  line-height: 1.5em;
  cursor: default;
  user-select: none;
`;
export const caption = css`
  font-size: 0.86em;
  line-height: 150%;
  cursor: default;
  user-select: none;
`;
export const box = css`
  backdrop-filter: blur(16px) brightness(1.02) saturate(110%);
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
