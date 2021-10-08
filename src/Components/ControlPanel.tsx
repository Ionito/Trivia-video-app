import React, { useState } from 'react'
import { Heading, Stack, Text, Button } from '@chakra-ui/react'
import QuestionItem from './QuestionItem'
import useQuestion from '../Hooks/useQuestion'
import { Question } from '../Types'
import useQuestionApp from '../Hooks/useQuestionApp'

const ControlPanel: React.FC = () => {
  const [newQuestion, setNewQuestion] = useState(false)
  const { questions } = useQuestion()
  const { openQuestion, onOpenQuestion } = useQuestionApp()

  const { isLoading, error, data } = questions

  const handleAddQuestion = () => {
    setNewQuestion(!newQuestion)
  }
  const handleOpen = (question: Question) => () => {
    onOpenQuestion(question)
  }

  if (isLoading) return <Text>'Loading...'</Text>

  if (error) return <Text>An error has occurred</Text>

  return (
    <Stack spacing="4">
      <Heading textAlign="left" size="sm">
        Trivia Question
      </Heading>

      {data.map((question: Question) => (
        <QuestionItem
          key={question.id}
          {...question}
          isOpen={openQuestion && openQuestion.id === question.id}
          onOpen={handleOpen(question)}
        />
      ))}

      {newQuestion && (
        <QuestionItem isNew onCloseNew={() => setNewQuestion(false)} />
      )}

      <Button
        disabled={newQuestion}
        variant="outline"
        mt="10"
        onClick={handleAddQuestion}
      >
        Add Question
      </Button>
    </Stack>
  )
}

export default ControlPanel
