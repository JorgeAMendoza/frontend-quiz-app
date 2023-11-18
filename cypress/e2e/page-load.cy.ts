/// <reference types="cypress" />

describe('page load', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('page loads with right title and four test options', () => {
    cy.title().should('include', 'Frontend Quiz App')
    cy.get('h1').should('contain', 'Welcome to the Frontend Quiz!')
    cy.get('[data-cy="themeToggle"]').should('exist')

    cy.get('[data-cy="quiz-options"]').should('have.length', 4)
  })

  it('clicking on the quiz option navigates to the quiz page', () => {
    cy.get('[data-cy="quiz-options"]')
      .find('a')
      .then((links) => {
        cy.wrap(links[0]).should('contain', 'HTML')
        cy.wrap(links[0]).click()
        cy.url().should('include', '/html')
        cy.visit('/')

        cy.wrap(links[1]).should('contain', 'CSS')
        cy.wrap(links[1]).click()
        cy.url().should('include', '/css')
        cy.visit('/')

        cy.wrap(links[2]).should('contain', 'JavaScript')
        cy.wrap(links[2]).click()
        cy.url().should('include', '/javascript')
        cy.visit('/')

        cy.wrap(links[3]).should('contain', 'Accessibility')
        cy.wrap(links[3]).click()
        cy.url().should('include', '/accessibility')
      })
  })
})
