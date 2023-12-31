import { Question } from '../types/reducer'

export interface TestDataState {
  questions: Question[]
  testType: string
  answerSheet: boolean[]
}

interface UpdateAnswerSheetAction {
  type: 'UPDATE_ANSWER_SHEET'
  payload: {
    questionNumber: number
    answer: boolean
  }
}

interface SetSavedAnswerSheetAction {
  type: 'SET_SAVED_ANSWER_SHEET'
  payload: {
    answerSheet: boolean[]
  }
}

export type TestDataAction = UpdateAnswerSheetAction | SetSavedAnswerSheetAction

export const reducer = (state: TestDataState, action: TestDataAction) => {
  switch (action.type) {
    case 'UPDATE_ANSWER_SHEET': {
      const { questionNumber, answer } = action.payload
      const answerSheet = [...state.answerSheet]
      answerSheet[questionNumber] = answer

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
    default:
      return state
  }
}
