import React from 'react'
import { useLocation } from 'react-router-dom'

const ResetPassword = () => {
const location = useLocation();

console.log('Resetting password for:', location);

  return (
    <div>
      Reset Password
    </div>
  )
}

export default ResetPassword
