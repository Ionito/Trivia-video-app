import React, { useState } from 'react'
import {
  Heading,
  Stack,
  Box,
  Divider,
  Flex,
  Button,
  Input,
  Text,
} from '@chakra-ui/react'
import { Question } from '../Types'
import AnswerItem from './AnswerItem'
import QuestionActionsButtons from './QuestionActionsButtons'
import useQuestion from '../Hooks/useQuestion'

interface QuestionItem extends Partial<Question> {
  isOpen?: boolean
  isNew?: boolean
  onOpen?: () => void
  onCloseNew?: () => void
}

const QuestionItem: React.FC<QuestionItem> = ({
  id,
  question = '',
  answerA = '',
  answerB = '',
  correctAnswer,
  isOpen,
  isNew,
  onOpen,
  onCloseNew,
}) => {
  const [editMode, setEditMode] = useState<boolean>(!!isNew)
  const { mutationDelete } = useQuestion()

  const handleEdit = (value: boolean) => {
    setEditMode(true)
  }
  const handleDelete = (e: React.MouseEvent) => {
    if (id) mutationDelete.mutate(id)
  }
  const handleOpen = (e: React.MouseEvent) => {
    if (onOpen) onOpen()
  }
  const handleSave = () => {}
  const handleDiscard = () => {
    if (isNew && onCloseNew) onCloseNew()
    setEditMode(false)
  }

  const handleInputChange = () => {}

  return (
    <Flex
      p="1"
      pr="2"
      border="1px"
      borderColor="gray.300"
      bg="white"
      borderRadius="4"
    >
      <Box
        w="2"
        h="auto"
        bg={isOpen ? 'blue.200' : 'transparent'}
        borderRadius="6"
      />

      <Flex p="4" w="full" direction="column">
        {editMode ? (
          <Stack w="full" mb={6}>
            <Text color="gray.400">Question</Text>
            <Input
              name="question"
              value={question}
              onChange={handleInputChange}
            />
          </Stack>
        ) : (
          <Heading size="sm" mb="4">
            {question}
          </Heading>
        )}

        <Stack>
          <AnswerItem
            label="A"
            editMode={editMode}
            answer={answerA}
            isCorrect={correctAnswer === 'A'}
          />
          <Divider />
          <AnswerItem
            label="B"
            editMode={editMode}
            answer={answerB}
            isCorrect={correctAnswer === 'B'}
          />
        </Stack>

        <Flex
          direction="row"
          justify={editMode ? 'flex-end' : 'space-between'}
          mt="6"
        >
          {!isNew && !editMode && (
            <Button variant="outline" onClick={handleOpen}>
              {isOpen ? 'Close' : 'Open'}
            </Button>
          )}

          <QuestionActionsButtons
            editMode={editMode}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onSave={handleSave}
            onDiscard={handleDiscard}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default QuestionItem
