import { createContext, useReducer } from 'react'
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

  return (
    <TestDataContextActions.Provider value={{ dispatch }}>
      <TestDataContext.Provider value={{ testData }}>
        {children}
      </TestDataContext.Provider>
    </TestDataContextActions.Provider>
  )
}