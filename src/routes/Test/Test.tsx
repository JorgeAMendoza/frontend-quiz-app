import { Outlet, useLoaderData } from 'react-router-dom'
import { LoaderReturn } from './loader'
import { TestDataContextProvider } from './context/test-data-context'

export const Test = () => {
  const { quizData } = useLoaderData() as LoaderReturn
  // params will be used to grab the test data.
  // once grabbed, we pass it into the context provider, so it won't be null starting.
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
