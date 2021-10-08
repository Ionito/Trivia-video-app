import { Question } from '../Types'

const QUESTIONS_RUTE = `${import.meta.env.VITE_APP_API_PORT}/questions`

export async function getQuestions() {
  return fetch(`${QUESTIONS_RUTE}`).then((res) => res.json())
}

export async function deleteQuestion(id: number) {
  return fetch(`${QUESTIONS_RUTE}/${id}`, {
    method: 'DELETE',
  }).then((res) => res.json())
}

export async function addQuestion(question: Question) {
  return fetch(`${QUESTIONS_RUTE}`, {
    method: 'POST',
    body: JSON.stringify(question),
  }).then((res) => res.json())
}

export async function editQuestion(question: Question) {
  return fetch(`${QUESTIONS_RUTE}/${question.id}`, {
    method: 'PUT',
    body: JSON.stringify(question),
  }).then((res) => res.json())
}
