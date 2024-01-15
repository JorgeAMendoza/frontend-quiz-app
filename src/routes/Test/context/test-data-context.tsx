import { createContext, useReducer, useEffect } from 'react'
import { reducer, TestDataState, TestDataAction } from './reducer'

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

export const TestDataContextProvider = ({
  children,
  testDataInit,
}: TestDataContextProviderProps) => {
  const [testData, dispatch] = useReducer(reducer, testDataInit)

  useEffect(() => {
    const savedAnswerSheet = localStorage.getItem('answerSheet')
    const savedCurrentQuestion = localStorage.getItem('currentQuestion')
    if (savedAnswerSheet) {
      const parsedSavedAnswerSheet = JSON.parse(savedAnswerSheet) as boolean[]
      dispatch({
        type: 'SET_SAVED_ANSWER_SHEET',
        payload: {
          answerSheet: parsedSavedAnswerSheet,
        },
      })
    }

    if (savedCurrentQuestion) {
      const parsedSavedCurrentQuestion = JSON.parse(
        savedCurrentQuestion,
      ) as number
      dispatch({
        type: 'SET_SAVED_CURRENT_QUESTION',
        payload: {
          currentQuestion: parsedSavedCurrentQuestion,
        },
      })
    }
  }, [])

  return (
    <TestDataContextActions.Provider value={{ dispatch }}>
      <TestDataContext.Provider value={{ testData }}>
        {children}
      </TestDataContext.Provider>
    </TestDataContextActions.Provider>
  )
}
