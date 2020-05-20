import styled from "@emotion/styled"
import React from "react"

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

  @media (min-width: ${minFullWidth}px) {
    display: none;
  }
`

export default MenuButton
