/// <reference types="cypress" />
describe('html test', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('a').contains('HTML').click()
    cy.get('[data-cy="submitOrNext"]').as('submitOrNextButton')
  })

  it('first question, submit answer without choosing option', () => {
    cy.url().should('include', '/HTML/question/1')
    cy.contains('Question 1 of 3')
    cy.get('[data-cy="questionText"]').should(
      'contain.text',
      'What does HTML stand for?',
    )
    cy.get('@submitOrNextButton').click()
    cy.contains('Please select an answer')
  })

  it('first question renders, choose wrong option', () => {
    cy.url().should('include', '/HTML/question/1')
    cy.contains('Question 1 of 3')
    cy.get('[data-cy="questionText"]').should(
      'contain.text',
      'What does HTML stand for?',
    )

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
  })

  it('first question renders, choose correct option', () => {
    cy.url().should('include', '/HTML/question/1')
    cy.contains('Question 1 of 3')
    cy.get('[data-cy="questionText"]').should(
      'contain.text',
      'What does HTML stand for?',
    )
    cy.get('[data-cy="answerOptions"]')
      .children()
      .then((answer) => {
        cy.wrap(answer[2]).find('button').click()
        cy.wrap(answer[2])
          .find('button')
          .should('have.attr', 'data-selected', 'true')
        cy.get('@submitOrNextButton').click()
        cy.get('@submitOrNextButton').should('have.text', 'Next Question')

        cy.wrap(answer[2])
          .find('button')
          .should('have.attr', 'data-correct', 'true')
        cy.wrap(answer[2])
          .find('button')
          .should('have.attr', 'data-incorrect', 'false')
      })

    cy.get('@submitOrNextButton').click()
    cy.url().should('include', '/HTML/question/2')
  })

  it('first question renders, going "back" redirects to the home page', () => {
    cy.url().should('include', '/HTML/question/1')
    cy.contains('Question 1 of 3')
    cy.go('back')
    cy.url().should('include', '/')
  })

  it('second question renders, going "back" redirects to the home page', () => {
    cy.url().should('include', '/HTML/question/1')
    cy.contains('Question 1 of 3')

    cy.get('[data-cy="answerOptions"]')
      .children()
      .then((answer) => {
        cy.wrap(answer[2]).find('button').click()
        cy.get('@submitOrNextButton').click()
      })

    cy.get('@submitOrNextButton').click()
    cy.url().should('include', '/HTML/question/2')
    cy.go('back')
    cy.url().should('include', '/')
  })

  it('get all three questions right, result of 3/3 displayed', () => {
    cy.url().should('include', '/HTML/question/1')
    cy.contains('Question 1 of 3')
    cy.get('[data-cy="questionText"]').should(
      'contain.text',
      'What does HTML stand for?',
    )

    cy.get('[data-cy="answerOptions"]')
      .children()
      .then((answer) => {
        cy.wrap(answer[2]).find('button').click()
        cy.get('@submitOrNextButton').click()
      })

    cy.get('@submitOrNextButton').click()

    // question 2
    cy.url().should('include', '/HTML/question/2')
    cy.contains('Question 2 of 3')
    cy.get('[data-cy="questionText"]').should(
      'contain.text',
      'Which of the following is the correct structure for an HTML document?',
    )

    cy.get('[data-cy="answerOptions"]')
      .children()
      .then((answer) => {
        cy.wrap(answer[0]).find('button').click()
        cy.get('@submitOrNextButton').click()
      })

    cy.get('@submitOrNextButton').click()

    // question 3
    cy.url().should('include', '/HTML/question/3')
    cy.contains('Question 3 of 3')
    cy.get('[data-cy="questionText"]').should(
      'contain.text',
      'Which HTML element is used to define the title of a document?',
    )

    cy.get('[data-cy="answerOptions"]')
      .children()
      .then((answer) => {
        cy.wrap(answer[1]).find('button').click()
        cy.get('@submitOrNextButton').click()
      })

    cy.get('@submitOrNextButton').click()
    cy.url().should('include', '/HTML/result')
    cy.contains('3 out of 3')
    cy.get('[data-cy="playAgain"]').click()
    cy.url().should('include', '/')
  })

  it.only('jump ahead in the quiz, error page displayed', () => {
    cy.visit('/HTML/question/2')
    cy.contains('Error')
    cy.contains('Please start the quiz from the beginning')
  })
})
