import React from "react"
import IconListItemComponent from "./IconListItem"
import {
  faAddressBook,
  faAirFreshener,
} from "@fortawesome/free-solid-svg-icons"

export default {
  title: "Controls/Icon List Item",
  component: IconListItemComponent,
}

export const IconListItem = () => (
  <ul>
    <IconListItemComponent icon={faAddressBook}>
      Address book
    </IconListItemComponent>
    <IconListItemComponent icon={faAirFreshener} title="The title text.">
      Air freshener
    </IconListItemComponent>
  </ul>
)
