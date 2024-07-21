import React from 'react'
import { DashboardTable } from './components/dashboard.table'
import Header from './components/header'
import AuthRedirect from './auth-redirect'

function Dashboard() {
  return (
    <div className="bg-purpleGuru h-screen">
      <Header />
      <AuthRedirect>
        <DashboardTable />
      </AuthRedirect>
    </div>
  )
}

export default Dashboard
