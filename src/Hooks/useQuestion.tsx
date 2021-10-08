import React from 'react'
import { useQuery, useMutation } from 'react-query'
import {
  getQuestions,
  deleteQuestion,
  addQuestion,
  editQuestion,
} from '../Crud/questions'
import { Question } from '../Types'
import queryClient from '../utils/queryClient'

const useQuestion = () => {
  const questions = useQuery('questions', getQuestions)

  const mutationDelete = useMutation(deleteQuestion, {
    onSuccess: (_, idQuestion) => {
      queryClient.invalidateQueries('questions')
      queryClient.setQueryData('questions', (old: any) => {
        if (old) return old.filter((q: Question) => q.id !== idQuestion)
        return old
      })
    },
  })

  const mutationAdd = useMutation(addQuestion, {
    onSuccess: (newQuestion) => {
      queryClient.invalidateQueries('questions')
      queryClient.setQueryData('questions', (old: any) => [...old, newQuestion])
    },
  })

  const mutationEdit = useMutation(editQuestion, {
    onSuccess: (editedQuestion) => {
      queryClient.invalidateQueries('questions')
      queryClient.setQueryData('questions', (old: any) => {
        const index = old.findIndex((q: Question) => q.id === editedQuestion.id)
        const questions = [...old]
        questions[index] = editedQuestion
        return questions
      })
    },
  })

  return { questions, mutationDelete, mutationAdd, mutationEdit }
}

export default useQuestion
