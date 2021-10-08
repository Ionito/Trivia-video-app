import React from 'react'
import { useQuery, useMutation } from 'react-query'
import {
  getQuestions,
  deleteQuestion,
  addQuestion,
  editQuestion,
} from '../Crud/questions'
import queryClient from '../utils/queryClient'

const useQuestion = () => {
  const questions = useQuery('questions', getQuestions)

  const mutationDelete = useMutation(deleteQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries('questions')
    },
  })

  const mutationAdd = useMutation(addQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries('questions')
    },
  })

  const mutationEdit = useMutation(editQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries('questions')
    },
  })

  return { questions, mutationDelete, mutationAdd, mutationEdit }
}

export default useQuestion
