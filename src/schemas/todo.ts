import * as yup from 'yup'

export const todoSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().max(200, 'Description must be at most 200 characters'),
  category: yup.string().required('Category is required')
})