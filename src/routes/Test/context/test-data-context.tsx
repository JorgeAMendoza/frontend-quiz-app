import { createContext, useReducer } from 'react'
import { reducer, TestDataState, TestDataAction } from './reducer'
import type { Answer } from './reducer'

interface TestDataContextProps {
  testData: TestDataState
}

interface TestDataContextActions {
  dispatch: React.Dispatch<TestDataAction>
}

interface TestDataContextProviderProps {
  children: React.ReactNode
  testDataInit: TestDataState
}

export const TestDataContext = createContext<TestDataContextProps | null>(null)
export const TestDataContextActions =
  createContext<TestDataContextActions | null>(null)

const initializeTestData = (testDataInit: TestDataState) => {
  const savedAnswerSheet = localStorage.getItem('answerSheet')
  const savedNextQuestion = localStorage.getItem('nextQuestion')
  const modifiedTestDataInit = { ...testDataInit }
  if (savedAnswerSheet) {
    const parsedSavedAnswerSheet = JSON.parse(savedAnswerSheet) as Answer[]
    modifiedTestDataInit.answerSheet = parsedSavedAnswerSheet
  }

  if (savedNextQuestion) {
    const parsedSavedNextQuestion = JSON.parse(savedNextQuestion) as number
    modifiedTestDataInit.nextQuestion = parsedSavedNextQuestion
  }
  return modifiedTestDataInit
}

export const TestDataContextProvider = ({
  children,
  testDataInit,
}: TestDataContextProviderProps) => {
  const [testData, dispatch] = useReducer(
    reducer,
    testDataInit,
    initializeTestData,
  )

  return (
    <TestDataContextActions.Provider value={{ dispatch }}>
      <TestDataContext.Provider value={{ testData }}>
        {children}
      </TestDataContext.Provider>
    </TestDataContextActions.Provider>
  )
}
