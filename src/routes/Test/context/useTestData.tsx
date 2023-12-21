import { useContext } from 'react'
import { TestDataContext, TestDataContextActions } from './test-data-context'

export const useTestData = () => {
  const testData = useContext(TestDataContext)
  const testDataDispatch = useContext(TestDataContextActions)
  if (testData === null || testDataDispatch === null) {
    throw new Error('useTestData must be used within a TestDataContextProvider')
  }
  return { ...testData, testDataDispatch }
}
