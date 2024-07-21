import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'
import nookies from 'nookies'

interface AuthRedirectProps {
  children: ReactNode
}

const AuthRedirect: React.FC<AuthRedirectProps> = ({ children }) => {
  // Obtendo o token dos cookies
  const token = nookies.get()
  console.log(token)

  // Configurando o header da API com o token
  if (!token) {
    redirect('/login')
  }

  return <>{children}</>
}

export default AuthRedirect
