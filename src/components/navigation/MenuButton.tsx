import styled from "@emotion/styled"

import colors from "../../colors"
import { minFullWidth } from "./sizes"

const MenuButton = styled("button")`
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 2;
  padding: 12px 20px;

  outline: none;

  &:focus,
  &:hover {
    color: ${colors.accent};
  }

  @media (min-width: ${minFullWidth}px) {
    display: none;
  }
`

export default MenuButton
