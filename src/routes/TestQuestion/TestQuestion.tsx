import { Question } from '@/features/Question'
import { useParams } from 'react-router-dom'
import { useTestData } from '../Test/context/useTestData'

export const TestQuestion = () => {
  const { questionNumber } = useParams()
  const { testData } = useTestData()

  if (!questionNumber) {
    throw new Error('Question number is not defined')
  }

  return (
    <Question
      question={testData.questions[Number(questionNumber)].question}
      answer={testData.questions[Number(questionNumber)].answer}
      choices={testData.questions[Number(questionNumber)].options}
      testStatus={`Question ${questionNumber} of ${testData.questions.length}`}
    />
  )
}
