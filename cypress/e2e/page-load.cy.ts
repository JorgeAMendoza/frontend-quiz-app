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

describe('theme toggle', () => {
  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win, 'matchMedia')
          .withArgs('(prefers-color-scheme: dark)')
          .returns({
            matches: false,
            addEventListener: () => {},
          })
      },
    })
  })

  it.only('should start with the theme toggle set to light mode', () => {
    cy.get('[data-cy="themeToggle"]')
      .find('label:first-of-type input')
      .should('be.checked')

    cy.get('body').should('have.attr', 'data-theme', 'light')
  })

  it.only('should switch to dark mode', () => {
    cy.get('[data-cy="themeToggle"]').find('label:last-of-type input').click()

    cy.get('body').should('have.attr', 'data-theme', 'dark')
  })
})
