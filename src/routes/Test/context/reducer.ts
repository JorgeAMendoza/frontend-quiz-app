import { Question } from '../types/reducer'

export interface TestDataState {
  testData: Question[]
  testType: string
  answerSheet: boolean[]
}

interface UpdateAnswerSheetAction {
  type: 'UPDATE_ANSWER_SHEET'
  payload: {
    answerSheet: boolean[]
  }
}

export type TestDataAction = UpdateAnswerSheetAction

export const reducer = (state: TestDataState, action: TestDataAction) => {
  switch (action.type) {
    case 'UPDATE_ANSWER_SHEET':
      return {
        ...state,
        answerSheet: action.payload.answerSheet,
      }
    default:
      return state
  }
}
