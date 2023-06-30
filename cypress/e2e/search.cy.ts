describe("The search", function () {
  it("finds entries", function () {
    cy.on("window:before:load", win => {
      const originalFetch = win.fetch
      win.fetch = (url: string, options) => {
        return originalFetch(
          url.replace(
            "https://search.adventures.jgosmann.de",
            "http://127.0.0.1:4000"
          ),
          options
        )
      }
    })

    cy.visit("/")
    cy.get('input[type="search"]').first().type("Zugspitz")
    cy.get('button[type="submit"]').first().click()

    cy.get("main ol li:first-child h2").should("have.text", "Zugspitz crossing")
  })
})
