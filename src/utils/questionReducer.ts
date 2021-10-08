import { QuestionState, Action } from '../Types'
export function questionReducer(state: QuestionState, action: Action) {
  switch (action.type) {
    case 'OPEN_CUESTION': {
      if (
        state.openQuestion?.id &&
        state.openQuestion.id === action.payload.id
      ) {
        return { openQuestion: undefined }
      }
      return { openQuestion: action.payload }
    }
    case 'SHOW_SOLUTION': {
      return state
    }
    default: {
      throw new Error(`Unhandled action type`)
    }
  }
}
