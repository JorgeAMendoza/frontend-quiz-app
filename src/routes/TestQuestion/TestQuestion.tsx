import { Question } from '@/features/Question'
import { useParams, useNavigate } from 'react-router-dom'
import { useTestData } from '../Test/context/useTestData'

export const TestQuestion = () => {
  const { questionNumber } = useParams()
  const { testData, testDataDispatch } = useTestData()
  const navigate = useNavigate()

  if (!questionNumber) {
    throw new Error('Question number is not defined')
  }

  const nextPageNav = () => {
    if (Number(questionNumber) === testData.questions.length - 1) {
      navigate(`/${testData.testType}/result`, {
        state: { answers: testData.answerSheet },
      })
    } else {
      navigate(`/${testData.testType}/question/${Number(questionNumber) + 1}`)
    }
  }

  const updateAnswerSheet = (questionNumber: number, answer: boolean) => {
    const zeroIndexQuestionNumber = questionNumber - 1
    testDataDispatch.dispatch({
      type: 'UPDATE_ANSWER_SHEET',
      payload: {
        questionNumber: zeroIndexQuestionNumber,
        answer,
      },
    })
  }

  return (
    <Question
      question={testData.questions[Number(questionNumber)].question}
      answer={testData.questions[Number(questionNumber)].answer}
      choices={testData.questions[Number(questionNumber)].options}
      testStatus={`Question ${questionNumber} of ${testData.questions.length}`}
      nextPageNav={nextPageNav}
      updateAnswerSheet={(answer: boolean) =>
        updateAnswerSheet(Number(questionNumber), answer)
      }
    />
  )
}
