/// <reference types="cypress" />
describe('html test', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('a').contains('HTML').click()
  })

  it('first question, submit answer without choosing option', () => {
    cy.title().should('contain.text', 'HTML | Question 1 | Frontend Quiz App')
    cy.url().should('include', '/html/question/1')
    cy.contains('Question 1 of 3')
    cy.get('[data-cy="question"]').should(
      'contain.text',
      'What does HTML stand for?',
    )
    cy.get('[data-cy="submitAnswer]').click()
    cy.contains('Please select an answer')
  })

  it('first question renders, choose wrong option', () => {
    cy.title().should('contain.text', 'HTML | Question 1 | Frontend Quiz App')
    cy.url().should('include', '/html/question/1')
    cy.contains('Question 1 of 3')
    cy.get('[data-cy="question"]').should(
      'contain.text',
      'What does HTML stand for?',
    )
    cy.get('[data-cy="quizStatusBar"]')
      .find('div')
      .should('have.css', 'width', '0%')

    cy.get('[data-cy="answerOptions"]')
      .children()
      .then((answer) => {
        cy.wrap(answer[3]).click()
        cy.get('[data-cy="submitAnswer]').click()
        cy.wrap(answer[3]).should('have.class', 'wrong')
        cy.wrap(answer[0]).should('have.class', 'correct')
      })

    cy.get('[data-cy="nextQuestion"]').should('exist')
    cy.get('[data-cy="submitAnswer]').should('not.exist')
    cy.get('[data-cy="nextQuestion"]').click()

    cy.url().should('include', '/html/question/2')
  })

  it('first question renders, choose correct option', () => {
    cy.title().should('contain.text', 'HTML | Question 1 | Frontend Quiz App')
    cy.url().should('include', '/html/question/1')
    cy.contains('Question 1 of 3')
    cy.get('[data-cy="question"]').should(
      'contain.text',
      'What does HTML stand for?',
    )
    cy.get('[data-cy="quizStatusBar"]')
      .find('div')
      .should('have.css', 'width', '0%')

    cy.get('[data-cy="answerOptions"]')
      .children()
      .then((answer) => {
        cy.wrap(answer[0]).click()
        cy.get('[data-cy="submitAnswer]').click()
        cy.wrap(answer[0]).should('have.class', 'correct')
      })

    cy.get('[data-cy="nextQuestion"]').should('exist')
    cy.get('[data-cy="submitAnswer]').should('not.exist')
    cy.get('[data-cy="nextQuestion"]').click()

    cy.url().should('include', '/html/question/2')
  })

  it('first question renders, going "back" redirects to the home page', () => {
    cy.title().should('contain.text', 'HTML | Question 1 | Frontend Quiz App')
    cy.url().should('include', '/html/question/1')
    cy.contains('Question 1 of 3')
    cy.go('back')
    cy.url().should('include', '/')
  })

  it('second question renders, going "back" redirects to the home page', () => {
    cy.title().should('contain.text', 'HTML | Question 1 | Frontend Quiz App')
    cy.url().should('include', '/html/question/1')
    cy.contains('Question 1 of 3')

    cy.get('[data-cy="answerOptions"]')
      .children()
      .then((answer) => {
        cy.wrap(answer[3]).click()
        cy.get('[data-cy="submitAnswer]').click()
      })

    cy.get('[data-cy="nextQuestion"]').click()
    cy.url().should('include', '/html/question/2')
    cy.go('back')
    cy.url().should('include', '/')
  })

  it('get all three questions right, result of 3/3 displayed', () => {
    cy.title().should('contain.text', 'HTML | Question 1 | Frontend Quiz App')
    cy.url().should('include', '/html/question/1')
    cy.contains('Question 1 of 3')
    cy.get('[data-cy="question"]').should(
      'contain.text',
      'What does HTML stand for?',
    )
    cy.get('[data-cy="nextQuestion"]').should('have.attr', 'disabled')
    cy.get('[data-cy="quizStatusBar"]')
      .find('div')
      .should('have.css', 'width', '0%')

    cy.get('[data-cy="answerOptions"]')
      .children()
      .then((answer) => {
        cy.wrap(answer[3]).click()
        cy.get('[data-cy="submitAnswer]').click()
      })

    cy.get('[data-cy="nextQuestion"]').click()

    cy.url().should('include', '/html/question/2')

    // question 2
    cy.title().should('contain.text', 'HTML | Question 2 | Frontend Quiz App')
    cy.url().should('include', '/html/question/2')
    cy.contains('Question 2 of 3')
    cy.get('[data-cy="question"]').should(
      'contain.text',
      'Which of the following is the correct structure for an HTML document?',
    )
    cy.get('[data-cy="quizStatusBar"]')
      .find('div')
      .should('have.css', 'width', '33.33%')

    cy.get('[data-cy="answerOptions"]')
      .children()
      .then((answer) => {
        cy.wrap(answer[0]).click()
        cy.get('[data-cy="submitAnswer]').click()
        cy.wrap(answer[0]).should('have.class', 'correct')
      })

    cy.get('[data-cy="nextQuestion"]').click()
    cy.url().should('include', '/html/question/3')

    // question 3
    cy.title().should('contain.text', 'HTML | Question 3 | Frontend Quiz App')
    cy.url().should('include', '/html/question/3')
    cy.contains('Question 3 of 3')
    cy.get('[data-cy="question"]').should(
      'contain.text',
      'Which HTML element is used to define the title of a document?',
    )
    cy.get('[data-cy="nextQuestion"]').should('have.attr', 'disabled')
    cy.get('[data-cy="quizStatusBar"]')
      .find('div')
      .should('have.css', 'width', '66.67%')

    cy.get('[data-cy="answerOptions"]')
      .children()
      .then((answer) => {
        cy.wrap(answer[1]).click()
        cy.get('[data-cy="submitAnswer]').click()
        cy.wrap(answer[1]).should('have.class', 'correct')
      })

    cy.get('[data-cy="nextQuestion"]').click()
    cy.url().should('include', '/html/result')
    cy.contains('3/3')
    cy.get('[data-cy="playAgainButton]').click()
    cy.url().should('include', '/')
  })
})
