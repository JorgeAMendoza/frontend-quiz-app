import { useState } from 'react'

interface QuestionProps {
  question: string
  answer: string
  choices: string[]
  testStatus: string
  nextPageNav: () => void
  updateAnswerSheet: (answer: boolean) => void
}

export const Question = ({
  question,
  answer,
  choices,
  testStatus,
  nextPageNav,
  updateAnswerSheet,
}: QuestionProps) => {
  const [userChoice, setUserChoice] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [selectMessage, setSelectMessage] = useState<string>('')
  return (
    <>
      <div>
        <p>{testStatus}</p>
        <h1>{question}</h1>
      </div>
      <div>
        <ul>
          {choices.map((choice, index) => {
            return (
              <li key={choice}>
                <button
                  data-selected={choice === userChoice}
                  data-correct={isCorrect !== null && choice === answer}
                  data-incorrect={isCorrect === false && choice === userChoice}
                  type="button"
                  onClick={() => {
                    setUserChoice(choice)
                  }}
                >
                  <span>
                    {String.fromCharCode(97 + index)}
                    {choice}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
        <button
          type="button"
          onClick={() => {
            if (isCorrect === true || isCorrect === false) {
              nextPageNav()
              updateAnswerSheet(isCorrect)
              setUserChoice(null)
              setIsCorrect(null)
            } else if (userChoice === null) {
              // message to user to select a choice
              setSelectMessage('Please select an answer')
            } else if (userChoice === answer) {
              // message to user that they are correct
              setIsCorrect(true)
            } else {
              // message to user that they are incorrect
              setIsCorrect(false)
            }
          }}
        >
          {isCorrect === null ? 'Submit' : 'Next Question'}
        </button>
        {selectMessage ? <p>{selectMessage}</p> : null}
      </div>
    </>
  )
}
