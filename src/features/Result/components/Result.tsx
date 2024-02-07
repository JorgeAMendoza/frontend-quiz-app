import type { Answer } from '@/routes/Test/context/reducer'
import { useNavigate } from 'react-router-dom'
import style from './result.module.css'

interface ResultProps {
  testType: string
  answerSheet: Answer[]
}

export const Result = ({ testType, answerSheet }: ResultProps) => {
  const totalQuestions = answerSheet.length
  const correctAnswers = answerSheet.filter((answer) => answer.isCorrect).length
  const navigate = useNavigate()
  return (
    <>
      <div className={style.result}>
        <h1>
          Quiz completed <br />
          <strong>You scored...</strong>
        </h1>
        <div className={style.testStats}>
          <div className={style.testName}>
            <span>
              <img src={`/test-icons/${testType}.svg`} alt="" />
            </span>
            <p>{testType}</p>
          </div>
          <p className={style.testResults}>
            <strong>{correctAnswers}</strong>
            <br /> out of {totalQuestions}
          </p>
        </div>
        <button
          data-cy="playAgain"
          type="button"
          onClick={() => {
            localStorage.removeItem('answerSheet')
            localStorage.removeItem('currentQuestion')
            localStorage.removeItem('testName')
            navigate('/', { replace: true })
          }}
        >
          Play again
        </button>
      </div>
    </>
  )
}
