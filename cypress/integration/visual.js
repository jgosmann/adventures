describe('the subscribe page', function() {
  it('should match visually', function() {
    cy.visit('/subscribe')
    cy.matchImageSnapshot()
  })
})

describe('the subscription confirmation page', function() {
  it('should match visually', function() {
    cy.visit('/subscribe/confirm?email=test@mail.org&token=dummyToken')
    cy.matchImageSnapshot()
  })
})

describe('the legal pages', function() {
  describe('the privacy policy', function () {
    describe('in English', function() {
      it('should match visually', function() {
        cy.visit('/legal/privacy')
        cy.matchImageSnapshot()
      })
    })

    describe('in German', function() {
      it('should match visually', function() {
        cy.visit('/de/legal/privacy')
        cy.matchImageSnapshot()
      })
    })
  })

  describe('the legal disclosure', function () {
    describe('in English', function() {
      it('should match visually', function() {
        cy.visit('/legal/disclosure')
        cy.matchImageSnapshot()
      })
    })

    describe('in German', function() {
      it('should match visually', function() {
        cy.visit('/de/legal/disclosure')
        cy.matchImageSnapshot()
      })
    })
  })
})
