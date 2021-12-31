import React from "react"
import { render, screen } from "@testing-library/react"
import CryptedEmail from "./Email"

describe("CryptedEmail", () => {
  it("sets clipboard with email when the copy button is clicked", () => {
    const copyButtonTitle = "copy email"

    Object.assign(global.navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    })

    render(
      <CryptedEmail
        name="name"
        domain="domain"
        tld="tld"
        copyTitle={copyButtonTitle}
      />
    )

    screen.getByTitle(copyButtonTitle).click()

    expect(global.navigator.clipboard.writeText).toHaveBeenLastCalledWith(
      "name@domain.tld"
    )
  })
})
