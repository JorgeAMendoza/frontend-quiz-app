import { useLocation } from 'react-router-dom'
import { Result } from '@/features/Result'
import { LocationState } from './types'

export const Results = () => {
  const location = useLocation()
  const testInformation = location.state as LocationState
  return (
    <>
      <Result
        testType={testInformation.testType}
        answerSheet={testInformation.answerSheet}
      />
    </>
  )
}
