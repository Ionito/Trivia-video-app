import React, { useState, useRef, useEffect } from 'react'
import {
  Heading,
  Stack,
  Box,
  Divider,
  Flex,
  Button,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react'
import { Question } from '../Types'
import AnswerItem from './AnswerItem'
import QuestionActionsButtons from './QuestionActionsButtons'
import useQuestion from '../Hooks/useQuestion'
import { Formik } from 'formik'
import * as Yup from 'yup'

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
  correctAnswer = 'A',
  isOpen,
  isNew,
  onOpen,
  onCloseNew,
}) => {
  const [editMode, setEditMode] = useState<boolean>(!!isNew)
  const { mutationDelete, mutationEdit, mutationAdd } = useQuestion()
  const formikRef = useRef<any>()
  const toast = useToast()

  const initialValues = {
    question,
    answerA,
    answerB,
    correctAnswer,
  }
  const onSubmit = (values: any) => {
    if (isNew) {
      mutationAdd.mutate(values)
    } else {
      mutationEdit.mutate({ ...values, id })
    }
  }

  const handleEdit = (value: boolean) => {
    setEditMode(true)
  }
  const handleDelete = () => {
    if (id) mutationDelete.mutate(id)
  }
  const handleOpen = (e: React.MouseEvent) => {
    if (onOpen) onOpen()
  }
  const handleSave = () => {
    formikRef.current.submitForm()
  }
  const handleDiscard = () => {
    formikRef.current.resetForm()
    if (isNew && onCloseNew) onCloseNew()
    setEditMode(false)
  }

  useEffect(() => {
    if ((mutationEdit.isSuccess || mutationAdd.isSuccess) && editMode) {
      toast({
        title: 'Question Saved',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      handleDiscard()
    }
  }, [mutationEdit.isSuccess, mutationAdd.isSuccess])

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize={true}
      validationSchema={Yup.object().shape({
        question: Yup.string().required('Required'),
        answerA: Yup.string().required('Required'),
        answerB: Yup.string().required('Required'),
      })}
    >
      {(props) => (
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
                  value={props.values.question}
                  onChange={props.handleChange}
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
                isLoading={
                  mutationEdit.isLoading ||
                  mutationAdd.isLoading ||
                  mutationDelete.isLoading
                }
                editMode={editMode}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onSave={handleSave}
                onDiscard={handleDiscard}
              />
            </Flex>
          </Flex>
        </Flex>
      )}
    </Formik>
  )
}

export default QuestionItem
