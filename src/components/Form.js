import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from './UserContext'
import ErrorsDetails from './ErrorsDetails'

const Form = () => {
  const [inputFields, setInputFields] = useState({
    username: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [errorsVisibility, setErrorsVisibility] = useState(false)
  const navigate = useNavigate()
  const { fetchData } = useContext(UserContext)

  const validateValues = (inputValues) => {
    // ^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$
    // ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$
    const errors = {}
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&#^]{8,}$/
    if (!inputValues.username) {
      errors.username = 'Username is required'
    } else errors.username = ''
    if (!inputValues.password) {
      errors.password = 'Password is required'
    } else if (!passwordPattern.test(inputValues.password)) {
      errors.password = 'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.'
    } else errors.password = ''
    return errors
  }

  const handleChange = (e) => {
    setInputFields((prevInputs) => ({ ...prevInputs, [e.target.name]: e.target.value }))
  }

  const navigateTable = async () => {
    if (errors.username === '' && errors.password === '' && inputFields.username !== '' && inputFields.password !== '') {
      navigate('/table')
      try {
        await fetchData()
      } catch (err) {
        console.error(err)
      }
    }
  }

  const handleErrors = () => {
    setErrors(validateValues(inputFields))
    setErrorsVisibility(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    handleErrors()
    await navigateTable()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='name' name='username' value={inputFields.username} placeholder='username' onChange={handleChange} onKeyUp={handleErrors} />
      <ErrorsDetails errorsText={errors.username} errorsVisibility={errorsVisibility} />
      <input type='password' name='password' value={inputFields.password} placeholder='password' onChange={handleChange} onKeyUp={handleErrors} pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&#^]{8,}$' />
      <ErrorsDetails errorsText={errors.password} errorsVisibility={errorsVisibility} />
      <button type='submit'>Login</button>
    </form>
  )
}

export default Form
