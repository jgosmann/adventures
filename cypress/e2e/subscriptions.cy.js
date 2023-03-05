describe("The subscription process", function () {
  it("successfully loads", function () {
    const email = "foobar@example.com"

    cy.on("window:before:load", win => {
      const originalFetch = win.fetch
      win.fetch = (url, options) => {
        return originalFetch(
          url.replace(
            "https://doveseed.adventures.jgosmann.de",
            "http://127.0.0.1:5000"
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

    cy.get("form.email-submission-form").within(() => {
      cy.get('input[type="email"]').type(email)
      cy.root().submit()
      cy.get("button svg").should("have.attr", "data-icon", "check")
    })

    cy.task("mail:receive", email).then(content => {
      const m = content
        .replaceAll(/=\r?\n/g, "")
        .replaceAll(/=3[dD]/g, "=")
        .match(/<link>(?<link>.*)<\/link>/)
      cy.visit(m.groups.link)
    })

    cy.get('form.email-submission-form input[type="email"]').should(
      "have.value",
      email
    )
    cy.get("form.email-submission-form").within(() => {
      cy.root().submit()
      cy.get("button svg").should("have.attr", "data-icon", "check")
    })

    cy.visit("/unsubscribe")
    cy.window()
      .its("onRecaptchaLoad")
      .then(fn => fn())

    cy.get("form.email-submission-form").within(() => {
      cy.get('input[type="email"]').type(email)
      cy.root().submit()
      cy.get("button svg").should("have.attr", "data-icon", "check")
    })

    cy.task("mail:receive", email).then(content => {
      const m = content
        .replaceAll(/=\r?\n/g, "")
        .replaceAll(/=3[dD]/g, "=")
        .match(/<link>(?<link>.*)<\/link>/)
      cy.visit(m.groups.link)
    })

    cy.get('form.email-submission-form input[type="email"]').should(
      "have.value",
      email
    )
    cy.get("form.email-submission-form").within(() => {
      cy.root().submit()
      cy.get("button svg").should("have.attr", "data-icon", "check")
    })
  })
})
