/// <reference types="cypress" />

describe('page load', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('page loads with right title and four test options', () => {
    cy.title().should('include', 'Frontend Quiz App')
    cy.get('h1').should('contain', 'Welcome to the Frontend Quiz!')
    cy.get('[data-cy="themeToggle"]').should('exist')

    cy.get('[data-cy="testList"]').children().should('have.length', 4)
  })

  it('clicking on the "HTML" quiz option navigates to the quiz page', () => {
    cy.get('[data-cy="testList"]')
      .find('a')
      .then((links) => {
        cy.wrap(links[0]).should('contain', 'HTML')
        cy.wrap(links[0]).click()
        cy.url().should('include', '/HTML/question/1')
      })
  })

  it('clicking on the "CSS" quiz option navigates to the quiz page', () => {
    cy.get('[data-cy="testList"]')
      .find('a')
      .then((links) => {
        cy.wrap(links[1]).should('contain', 'CSS')
        cy.wrap(links[1]).click()
        cy.url().should('include', '/CSS/question/1')
      })
  })

  it('clicking on the "JavaScript" quiz option navigates to the quiz page', () => {
    cy.get('[data-cy="testList"]')
      .find('a')
      .then((links) => {
        cy.wrap(links[2]).should('contain', 'JavaScript')
        cy.wrap(links[2]).click()
        cy.url().should('include', '/JavaScript/question/1')
      })
  })

  it('clicking on the "Accessibility" quiz option navigates to the quiz page', () => {
    cy.get('[data-cy="testList"]')
      .find('a')
      .then((links) => {
        cy.wrap(links[3]).should('contain', 'Accessibility')
        cy.wrap(links[3]).click()
        cy.url().should('include', '/Accessibility/question/1')
      })
  })
})
