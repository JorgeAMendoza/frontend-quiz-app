import { Outlet, useLoaderData } from 'react-router-dom'
import { LoaderReturn } from './loader'
import { TestDataContextProvider } from './context/test-data-context'
import { useEffect } from 'react'
import type { Answer } from './context/reducer'

export const Test = () => {
  const { quizData } = useLoaderData() as LoaderReturn

  useEffect(() => {
    localStorage.setItem('testName', quizData.title)
  }, [])

  return (
    <main>
      <TestDataContextProvider
        testDataInit={{
          questions: quizData.questions,
          testType: quizData.title,
          answerSheet: new Array<Answer | null>(quizData.questions.length).fill(
            null,
          ),
          currentQuestion: 1,
        }}
      >
        <Outlet />
      </TestDataContextProvider>
    </main>
  )
}
