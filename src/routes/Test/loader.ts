import testData from '@assets/data.json'
import type { LoaderFunctionArgs } from 'react-router-dom'

export const testLoader = ({ params }: LoaderFunctionArgs) => {
  const quizDataNames = testData.quizzes.map((quiz) => quiz.title)
  const paramQuiz = params.test ? params.test : ''

  if (quizDataNames.includes(paramQuiz)) {
    const index = quizDataNames.indexOf(paramQuiz)
    return { quizData: testData.quizzes[index] }
  } else throw new Error('Quiz not found')
}

export type LoaderReturn = ReturnType<typeof testLoader>
