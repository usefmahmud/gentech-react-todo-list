import * as yup from 'yup'

export const loginFormSchema = yup.object().shape({
  email: yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 chars')
    .required('Password is required')
})

export const signupFormSchema = yup.object().shape({
  first_name: yup.string()
    .required('First name is required'),
  last_name: yup.string()
    .required('Last name is required'),
  email: yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(12, 'Password must be at most 12 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special symbol')
    .required('Password is required'),
  c_password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(12, 'Password must be at most 12 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special symbol')
    .oneOf([yup.ref('password')], 'Passwords don\'t match')
    .required('Password confirmation is required')
})