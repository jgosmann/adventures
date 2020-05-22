import randomEmail from "random-email"

describe("The subscription process", function() {
  it("successfully loads", function() {
    const email = randomEmail()

    cy.on("window:before:load", win => {
      const originalFetch = win.fetch
      win.fetch = (url, options) => {
        return originalFetch(
          url.replace(
            "https://doveseed.adventures.jgosmann.de",
            "http://localhost:5000"
          ),
          options
        )
      }

      let captchaSuccessCallback
      win.grecaptcha = {
        execute: () => captchaSuccessCallback("dummyCaptcha"),
        render: (elem, { callback }) => {
          captchaSuccessCallback = callback
          return "widgetId"
        },
      }
    })

    cy.visit("/subscribe")
    cy.window()
      .its("onRecaptchaLoad")
      .then(fn => fn())

    cy.get("form.email-submission-form").within(form => {
      cy.get('input[type="email"]').type(email)
      cy.root().submit()
      cy.get("button svg").should("have.attr", "data-icon", "check")
    })

    cy.readFile("../doveseed/doveseed-db.dev.json").then(content => {
      const entity = Object.values(content._default).filter(
        x => x.email === email
      )[0]
      const encodedEmail = encodeURIComponent(entity.email)
      const token = encodeURIComponent(entity.confirm_token.data)
      cy.visit(`/subscribe/confirm?email=${encodedEmail}&token=${token}`)
    })

    cy.get("form.email-submission-form").within(form => {
      cy.root().submit()
      cy.get("button svg").should("have.attr", "data-icon", "check")
    })

    cy.readFile("../doveseed/doveseed-db.dev.json").then(content => {
      const entity = Object.values(content._default).filter(
        x => x.email == email
      )[0]
      expect(entity.state).to.equal("subscribed")
    })

    cy.visit("/unsubscribe")
    cy.window()
      .its("onRecaptchaLoad")
      .then(fn => fn())

    cy.get("form.email-submission-form").within(form => {
      cy.get('input[type="email"]').type(email)
      cy.root().submit()
      cy.get("button svg").should("have.attr", "data-icon", "check")
    })

    cy.readFile("../doveseed/doveseed-db.dev.json").then(content => {
      const entity = Object.values(content._default).filter(
        x => x.email === email
      )[0]
      const encodedEmail = encodeURIComponent(entity.email)
      const token = encodeURIComponent(entity.confirm_token.data)
      cy.visit(`/subscribe/confirm?email=${encodedEmail}&token=${token}`)
    })

    cy.get("form.email-submission-form").within(form => {
      cy.root().submit()
      cy.get("button svg").should("have.attr", "data-icon", "check")
    })

    cy.readFile("../doveseed/doveseed-db.dev.json").then(content => {
      const entity = Object.values(content._default).filter(
        x => x.email == email
      )[0]
      expect(entity).to.be.undefined
    })
  })
})
