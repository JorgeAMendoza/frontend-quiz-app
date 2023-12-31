import { Outlet, useLoaderData } from 'react-router-dom'
import { LoaderReturn } from './loader'
import { TestDataContextProvider } from './context/test-data-context'
import { useEffect } from 'react'

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
          answerSheet: new Array<boolean>(quizData.questions.length).fill(
            false,
          ),
        }}
      >
        <div>status bar</div>
        <Outlet />
      </TestDataContextProvider>
    </main>
  )
}
