import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

function Form() {
  const formStyle = {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '20%',
  }

  const schema = yup.object().shape({
    fullName: yup.string().required('Your Full Name is Required!'),
    email: yup.string().email().required('Enter a valid email address'),
    age: yup
      .number()
      .positive()
      .integer()
      .min(18)
      .required('Age must be older than 17'),
    password: yup
      .string()
      .min(4)
      .max(20)
      .required('Provide a stronger password'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], " Passwords don't match")
      .required(),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form style={formStyle} onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Full Name..." {...register('fullName')} />
      <p>{errors.fullName?.message}</p>
      <input type="email" placeholder="Email..." {...register('email')} />
      <p>{errors.email?.message}</p>
      <input type="number" placeholder="Age..." {...register('age')} />
      <p>{errors.age?.message}</p>
      <input
        type="password"
        placeholder="Password..."
        {...register('password')}
      />
      <p>{errors.password?.message}</p>
      <input
        type="password"
        placeholder="Confirm Password..."
        {...register('confirmPassword')}
      />
      <p>{errors.confirmPassword?.message}</p>
      <input type="submit" />
    </form>
  )
}

export default Form
