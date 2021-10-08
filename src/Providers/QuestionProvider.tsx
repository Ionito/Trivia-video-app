import React from 'react'
import { Dispatch, QuestionState } from '../Types'
import { questionReducer } from '../utils/questionReducer'

export const QuestionContext = React.createContext<
  { questionState: QuestionState; dispatch: Dispatch } | undefined
>(undefined)

const QuestionAppProvider: React.FC = ({ children }) => {
  const [questionState, dispatch] = React.useReducer(questionReducer, {
    openQuestion: undefined,
  })
  const value = { questionState, dispatch }
  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  )
}

export { QuestionAppProvider }
