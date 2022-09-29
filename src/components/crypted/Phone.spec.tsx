import React from "react"
import { act, render, screen } from "@testing-library/react"
import CryptedPhone from "./Phone"

describe("CryptedPhone", () => {
  it("sets clipboard with phone number when the copy button is clicked", () => {
    const copyButtonTitle = "copy phone"

    Object.assign(global.navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    })

    render(
      <CryptedPhone
        country="+49"
        area="174"
        block0="123"
        block1="4567"
        copyTitle={copyButtonTitle}
      />
    )

    act(() => screen.getByTitle(copyButtonTitle).click())

    expect(global.navigator.clipboard.writeText).toHaveBeenLastCalledWith(
      "+491741234567"
    )
  })
})
