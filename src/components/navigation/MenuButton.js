import styled from "@emotion/styled"
import React, { useContext } from "react"

import MenuContext from "./MenuContext"

const MenuButton = styled(props => {
  const { active } = useContext(MenuContext)
  return <button tabIndex={active ? 0 : -1} {...props} />
})`
  background: none;
  padding: 8px;
  border: none;
  cursor: pointer;
`

export default MenuButton
