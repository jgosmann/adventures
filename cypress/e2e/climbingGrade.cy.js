describe("The climbing grade display", function () {
  beforeEach(function () {
    cy.clearLocalStorage()
    cy.visit("/posts/190716-squamish/")
  })

  it("allows to select a climbing grade conversion with the mouse", function () {
    cy.get(".climbingGrade")
      .first()
      .within(elem => {
        const value = elem.text()
        elem.click()
        cy.get("form").should("have.css", "opacity", "1")
        cy.get("form input").eq(1).click()
        expect(elem.text()).to.equal(value)
      })

    cy.get("body").click()
    cy.get(".climbingGrade")
      .first()
      .within(elem => {
        elem.click()
        cy.get("form").should("have.css", "opacity", "1")
      })
    cy.get("body").click()
    cy.get(".climbingGrade form").should("have.css", "opacity", "0")
    cy.get(".climbingGrade")
      .invoke("text")
      .then(text => expect(text).to.match(/^UIAA/))
  })
})
