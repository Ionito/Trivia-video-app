import React from 'react'
import { QuestionContext } from '../Providers/QuestionProvider'
import { Question } from '../Types'

const useQuestionApp = () => {
  const context = React.useContext(QuestionContext)
  if (context === undefined) {
    throw new Error('useQuestionApp must be used within a QuestionAppProvider')
  }
  const { questionState, dispatch } = context

  const { openQuestion } = questionState
  const onOpenQuestion = (question: Question) =>
    dispatch({ type: 'OPEN_CUESTION', payload: question })

  return { openQuestion, onOpenQuestion }
}

export default useQuestionApp
