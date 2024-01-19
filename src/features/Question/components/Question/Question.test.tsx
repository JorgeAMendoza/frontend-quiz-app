import { screen } from '@testing-library/react'
import { Question } from './Question'
import { fn } from 'jest-mock'
import { render } from '@test/utilities'
import { TestDataContextProvider } from '@/routes/Test/context/test-data-context'
import type { Answer } from '@/routes/Test/context/reducer'

const questionData = {
  question: 'What does HTML stand for?',
  answer: 'Hyper Text Markup Language',
  options: [
    'Hyper Text Preprocessor',
    'Hyper Text Markup Language',
    'Hyper Text Multiple Language',
    'Hyper Tool Multi Language',
  ],
}

const testDataInit = {
  questions: [questionData],
  testType: 'HTML',
  answerSheet: new Array<Answer | null>(1).fill(null),
  currentQuestion: 1,
}

const renderQuestion = () => {
  const mockNav = fn()
  const mockAnswerupdate = fn()
  return render(
    <Question
      questionNumber="1"
      question={questionData.question}
      answer={questionData.answer}
      choices={questionData.options}
      testStatus="Question 1 of 1"
      nextPageNav={mockNav}
      updateAnswerSheet={mockAnswerupdate}
    />,
    {
      wrapper: ({ children }) => (
        <TestDataContextProvider testDataInit={testDataInit}>
          {children}
        </TestDataContextProvider>
      ),
    },
  )
}

it('it should render the component', () => {
  renderQuestion()
})

test('should render the question', () => {
  renderQuestion()
  const question = screen.getByText(questionData.question)
  expect(question.textContent).toBe(questionData.question)
})

test('should be able to select a choice', async () => {
  const { user } = renderQuestion()
  const choiceButton = screen.getByRole('button', {
    name: `a${questionData.options[0]}`,
  })
  await user.click(choiceButton)
  expect(choiceButton.getAttribute('data-selected')).toBe('true')
})

test('should not display "next question" button if no initial choice is selected', async () => {
  const { user } = renderQuestion()
  const submitButton = screen.getByRole('button', { name: 'Submit' })
  await user.click(submitButton)
  screen.getByText('Please select an answer')
  expect(submitButton?.textContent).toBe('Submit')
})

test('should insert data attribute on the correct selected choice', async () => {
  const { user } = renderQuestion()
  const choiceButton = screen.getByRole('button', {
    name: `b${questionData.options[1]}`,
  })
  const submitButton = screen.getByRole('button', { name: 'Submit' })
  await user.click(choiceButton)
  await user.click(submitButton)
  expect(choiceButton.getAttribute('data-selected')).toBe('true')
  expect(choiceButton.getAttribute('data-correct')).toBe('true')
  expect(submitButton.textContent).toBe('Next Question')
})

test('should insert data attribute to the incorrect selected choice', async () => {
  const { user } = renderQuestion()
  const optionA = screen.getByRole('button', {
    name: `a${questionData.options[0]}`,
  })
  const optionB = screen.getByRole('button', {
    name: `b${questionData.options[1]}`,
  })
  const optionC = screen.getByRole('button', {
    name: `c${questionData.options[2]}`,
  })
  const optionD = screen.getByRole('button', {
    name: `d${questionData.options[3]}`,
  })
  const submitButton = screen.getByRole('button', { name: 'Submit' })
  await user.click(optionA)
  await user.click(submitButton)
  expect(optionA.getAttribute('data-selected')).toBe('true')
  expect(optionA.getAttribute('data-incorrect')).toBe('true')
  expect(optionB.getAttribute('data-correct')).toBe('true')
  expect(optionC.getAttribute('data-incorrect')).toBe('false')
  expect(optionD.getAttribute('data-incorrect')).toBe('false')
  expect(submitButton.textContent).toBe('Next Question')
})
