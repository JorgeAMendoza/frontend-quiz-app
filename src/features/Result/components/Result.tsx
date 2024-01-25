import type { Answer } from '@/routes/Test/context/reducer'
import { useNavigate } from 'react-router-dom'

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
      <div>
        <h1>
          Quiz completed <span>You Scored...</span>
        </h1>
        <div>
          <div>
            <img src={'/dynamic-render-of-image'} alt="" />
            <p>{testType}</p>
          </div>
          <p>
            <span>{correctAnswers}</span> out of {totalQuestions}
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
