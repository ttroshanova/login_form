import React from 'react'
import { HiExclamationCircle } from 'react-icons/hi2'

const ErrorsDetails = ({ errorsText, errorsVisibility }) => {
  return (
    <div className={(errorsText && errorsVisibility) ? 'error-details visible' : 'error-details'}>
      <span><HiExclamationCircle /></span>
      <p>{errorsText}</p>
    </div>
  )
}

export default ErrorsDetails
