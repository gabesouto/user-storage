import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'
import nookies from 'nookies'

interface AuthRedirectProps {
  children: ReactNode
}

const AuthRedirect: React.FC<AuthRedirectProps> = ({ children }) => {
  const token = nookies.get()
  console.log(token)
  if (!token) {
    redirect('/login')
  }

  return <>{children}</>
}

export default AuthRedirect
