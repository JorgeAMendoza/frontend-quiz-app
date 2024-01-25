/// <reference types="cypress" />

describe('test route errors', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('a').contains('HTML').click()
    cy.get('[data-cy="submitOrNext"]').as('submitOrNextButton')
  })

  it('jump ahead to question 2, errorElement page is rendered, return to home', () => {
    cy.visit('/HTML/question/2')
    cy.contains('Something went wrong!')
    cy.contains('Question Skipped. No cheating!')
    cy.get('[data-cy="homeLink"]').click()
    cy.url().should('include', '/')
  })

  it('jump ahead to results, errorElement page is rendered, return to home', () => {
    cy.visit('/HTML/result')
    cy.contains('Something went wrong!')
    cy.contains("You didn't finish the test!")
    cy.get('[data-cy="homeLink"]').click()
    cy.url().should('include', '/')
  })

  it('jump back to question 1, errorElement page is rendered, return to home', () => {
    cy.get('[data-cy="answerOptions"]')
      .children()
      .then((answer) => {
        cy.wrap(answer[3]).find('button').click()
        cy.wrap(answer[3])
          .find('button')
          .should('have.attr', 'data-selected', 'true')
        cy.get('@submitOrNextButton').click()
        cy.get('@submitOrNextButton').should('have.text', 'Next Question')

        cy.wrap(answer[3])
          .find('button')
          .should('have.attr', 'data-correct', 'false')
        cy.wrap(answer[3])
          .find('button')
          .should('have.attr', 'data-incorrect', 'true')
      })

    cy.get('@submitOrNextButton').click()
    cy.url().should('include', '/HTML/question/2')

    cy.visit('/HTML/question/1')
    cy.contains('Something went wrong!')
    cy.contains('Question already answered. No cheating!')
    cy.get('[data-cy="homeLink"]').click()
    cy.url().should('include', '/')
  })

  it('route to invalid question number, errorElement page is rendered, return to home', () => {
    cy.visit('/HTML/question/3ds')
    cy.contains('Something went wrong!')
    cy.contains('Invalid Question')
    cy.get('[data-cy="homeLink"]').click()
    cy.url().should('include', '/')
  })

  it('overall route error renders an error element, return to home', () => {
    cy.visit('/HT/invalid')
    cy.contains('Something went wrong!')
    cy.contains('Invalid Route')
    cy.get('[data-cy="homeLink"]').click()
    cy.url().should('include', '/')
  })
})
