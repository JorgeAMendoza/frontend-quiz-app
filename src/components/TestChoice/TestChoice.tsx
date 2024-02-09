import { Link } from 'react-router-dom'
import style from './test-choice.module.css'

interface TestChoiceProps {
  testName: string
  testIcon: string
  setTestName: React.Dispatch<string>
}

export const TestChoice = ({
  testName,
  testIcon,
  setTestName,
}: TestChoiceProps) => {
  return (
    <li className={style.testChoice}>
      <Link
        to={`/${testName}/question/1`}
        onClick={() => setTestName(testName)}
        className={style.testName}
      >
        <span className={style.testIcon}>
          <img src={testIcon} alt="" />
        </span>
        <span>{testName}</span>
      </Link>
    </li>
  )
}
