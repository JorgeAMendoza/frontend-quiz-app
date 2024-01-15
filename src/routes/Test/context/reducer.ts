import { Question } from '../types/reducer'

export interface TestDataState {
  questions: Question[]
  testType: string
  answerSheet: boolean[]
  currentQuestion: number
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

interface SetSavedCurrentQuestionAction {
  type: 'SET_SAVED_CURRENT_QUESTION'
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
      console.log('I am called')
      const { questionNumber, answer } = action.payload
      const answerSheet = [...state.answerSheet]
      answerSheet[questionNumber] = answer

      localStorage.setItem('answerSheet', JSON.stringify(answerSheet))
      localStorage.setItem(
        'currentQuestion',
        JSON.stringify(questionNumber + 1),
      )
      return {
        ...state,
        answerSheet,
        currentQuestion: questionNumber + 2,
      }
    }
    case 'SET_SAVED_ANSWER_SHEET': {
      const { answerSheet } = action.payload
      return {
        ...state,
        answerSheet,
      }
    }
    case 'SET_SAVED_CURRENT_QUESTION': {
      const { currentQuestion } = action.payload
      return {
        ...state,
        currentQuestion,
      }
    }
    default:
      return state
  }
}
