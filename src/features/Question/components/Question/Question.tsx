import { useKeyboardNav } from '@/hooks/useKeyboardNav'
import { useTestData } from '@/routes/Test/context/useTestData'
import { useEffect, useState } from 'react'

interface QuestionProps {
  question: string
  questionNumber: string
  answer: string
  choices: string[]
  testStatus: string
  nextPageNav: () => void
  updateAnswerSheet: (answer: boolean, userChoice: string) => void
}

export const Question = ({
  question,
  questionNumber,
  answer,
  choices,
  testStatus,
  nextPageNav,
  updateAnswerSheet,
}: QuestionProps) => {
  const { testData } = useTestData()
  const ref = useKeyboardNav('ul li button', {
    lastElementQuery: '#submitOrNext',
  })
  const [userChoice, setUserChoice] = useState<string | null>(() => {
    const questionIndex = Number(questionNumber) - 1
    if (testData.answerSheet[questionIndex] === null) return null
    if (testData.answerSheet[questionIndex]?.userChoice === null) return null

    return testData.answerSheet[questionIndex]?.userChoice as string
  })
  const [isCorrect, setIsCorrect] = useState<boolean | null>(() => {
    const questionIndex = Number(questionNumber) - 1
    if (testData.answerSheet[questionIndex] === null) return null

    return testData.answerSheet[questionIndex]?.isCorrect as boolean
  })
  const [selectMessage, setSelectMessage] = useState<string>('')

  useEffect(() => {
    if (isCorrect === null) {
      const firstOption = ref.current?.querySelector(
        'ul li button:first-of-type',
      ) as HTMLButtonElement
      firstOption.focus()
    }
  }, [isCorrect, ref])

  return (
    <>
      <div>
        <p>{testStatus}</p>
        <h1>{question}</h1>
      </div>
      <div ref={ref}>
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
                  disabled={isCorrect !== null}
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
          id="submitOrNext"
          type="button"
          onClick={() => {
            if (isCorrect === true || isCorrect === false) {
              nextPageNav()
              setUserChoice(null)
              setIsCorrect(null)
            } else if (userChoice === null) {
              // message to user to select a choice
              setSelectMessage('Please select an answer')
            } else if (userChoice === answer) {
              // message to user that they are correct
              setIsCorrect(true)
              updateAnswerSheet(true, userChoice)
            } else {
              // message to user that they are incorrect
              setIsCorrect(false)
              updateAnswerSheet(false, userChoice)
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
