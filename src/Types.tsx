export type Action =
  | { type: 'OPEN_CUESTION'; payload: Question }
  | { type: 'SHOW_SOLUTION' }
export type Dispatch = (action: Action) => void
export type QuestionState = { openQuestion: Question | undefined }
export type Choices = 'A' | 'B'
export interface Question {
  id: number
  question: string
  answerA: string
  answerB: string
  correctAnswer: Choices
}
