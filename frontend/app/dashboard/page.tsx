import React from 'react'
import { DashboardTable } from './components/dashboard.table'
import Header from './components/header'
import AuthRedirect from './auth-redirect'
import { SnackbarProvider } from 'notistack'

function Dashboard() {
  return (
    <div className="bg-purpleGuru h-screen">
      <Header />
      <AuthRedirect>
        <SnackbarProvider>
          <DashboardTable />
        </SnackbarProvider>
      </AuthRedirect>
    </div>
  )
}

export default Dashboard
