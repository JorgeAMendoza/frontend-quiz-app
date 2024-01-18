import { Question } from '../types/reducer'

export interface Answer {
  isCorrect: boolean
  userChoice: string
}

export interface TestDataState {
  questions: Question[]
  testType: string
  answerSheet: (Answer | null)[]
  nextQuestion: number | null
}

interface UpdateAnswerSheetAction {
  type: 'UPDATE_ANSWER_SHEET'
  payload: {
    questionNumber: number
    answer: boolean
    userChoice: string
  }
}

interface SetSavedAnswerSheetAction {
  type: 'SET_SAVED_ANSWER_SHEET'
  payload: {
    answerSheet: Answer[]
  }
}

interface SetSavedNextQuestionAction {
  type: 'SET_SAVED_NEXT_QUESTION'
  payload: {
    nextQuestion: number | null
  }
}

export type TestDataAction =
  | UpdateAnswerSheetAction
  | SetSavedAnswerSheetAction
  | SetSavedNextQuestionAction

export const reducer = (state: TestDataState, action: TestDataAction) => {
  switch (action.type) {
    case 'UPDATE_ANSWER_SHEET': {
      const { questionNumber, answer, userChoice } = action.payload
      const answerSheet = [...state.answerSheet]
      answerSheet[questionNumber] = {
        isCorrect: answer,
        userChoice,
      }

      localStorage.setItem('answerSheet', JSON.stringify(answerSheet))
      localStorage.setItem('nextQuestion', JSON.stringify(questionNumber + 2))
      return {
        ...state,
        answerSheet,
        nextQuestion: questionNumber + 2,
      }
    }
    case 'SET_SAVED_ANSWER_SHEET': {
      const { answerSheet } = action.payload
      return {
        ...state,
        answerSheet,
      }
    }
    case 'SET_SAVED_NEXT_QUESTION': {
      const { nextQuestion } = action.payload
      return {
        ...state,
        nextQuestion,
      }
    }
    default:
      return state
  }
}
