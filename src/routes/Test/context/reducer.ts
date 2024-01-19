import { Question } from '../types/reducer'

export interface Answer {
  isCorrect: boolean
  userChoice: string
}

export interface TestDataState {
  questions: Question[]
  testType: string
  answerSheet: (Answer | null)[]
  currentQuestion: number
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

interface SetSavedCurrentQuestionAction {
  type: 'SET_CURRENT_QUESTION'
  payload: {
    currentQuestion: number
  }
}

export type TestDataAction =
  | UpdateAnswerSheetAction
  | SetSavedAnswerSheetAction
  | SetSavedCurrentQuestionAction

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
      return {
        ...state,
        answerSheet,
      }
    }
    case 'SET_SAVED_ANSWER_SHEET': {
      const { answerSheet } = action.payload
      return {
        ...state,
        answerSheet,
      }
    }
    case 'SET_CURRENT_QUESTION': {
      const { currentQuestion } = action.payload
      localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion))
      return {
        ...state,
        currentQuestion,
      }
    }
    default:
      return state
  }
}
