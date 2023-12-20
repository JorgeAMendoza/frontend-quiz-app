import { screen } from '@testing-library/react'
import { Question } from './Question'
import { fn } from 'jest-mock'
import { render } from '@test/utilities'

const questionData = {
  question: 'What does HTML stand for?',
  answer: 'Hyper Text Markup Language',
  choices: [
    'Hyper Text Preprocessor',
    'Hyper Text Markup Language',
    'Hyper Text Multiple Language',
    'Hyper Tool Multi Language',
  ],
  testStatus: 'Question 1 of 1',
}

it('it should render the component', () => {
  const mockNav = fn()
  const mockAnswerupdate = fn()
  render(
    <Question
      question={questionData.question}
      answer={questionData.answer}
      choices={questionData.choices}
      testStatus="Question 1 of 1"
      nextPageNav={mockNav}
      updateAnswerSheet={mockAnswerupdate}
    />,
  )
})

it('should render the question', () => {
  const mockNav = fn()
  const mockAnswerupdate = fn()
  render(
    <Question
      question={questionData.question}
      answer={questionData.answer}
      choices={questionData.choices}
      testStatus="Question 1 of 1"
      nextPageNav={mockNav}
      updateAnswerSheet={mockAnswerupdate}
    />,
  )
  const question = screen.getByText(questionData.question)
  expect(question.textContent).toBe(questionData.question)
})

// it('should be able to select a choice', () => {
//   const mockNav = fn()
//   const mockAnswerupdate = fn()
//   render(
//     <Question
//       question={questionData.question}
//       answer={questionData.answer}
//       choices={questionData.choices}
//       testStatus="Question 1 of 1"
//       nextPageNav={mockNav}
//       updateAnswerSheet={mockAnswerupdate}
//     />,
//   )
//   const choice = screen.getByText(questionData.choices[0])
//   userEvent.click(choice)
//   expect(choice.textContent).toBe(questionData.choices[0])
// })
