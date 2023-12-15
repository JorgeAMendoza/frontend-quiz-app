interface ResultProps {
  testType: string
  answerSheet: boolean[]
}

export const Result = ({ testType, answerSheet }: ResultProps) => {
  const totalQuestions = answerSheet.length
  const correctAnswers = answerSheet.filter((answer) => answer).length
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
      </div>
    </>
  )
}
