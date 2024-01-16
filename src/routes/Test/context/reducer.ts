import { Question } from '../types/reducer'

export interface TestDataState {
  questions: Question[]
  testType: string
  answerSheet: boolean[]
  nextQuestion: number | null
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
      const { questionNumber, answer } = action.payload
      const answerSheet = [...state.answerSheet]
      answerSheet[questionNumber] = answer

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
