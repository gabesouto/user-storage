import React from 'react'
import { DashboardTable } from './components/dashboard.table'
import Header from './components/header'

function Dashboard() {
  return (
    <div className="bg-purpleGuru h-screen">
      <Header />
      <DashboardTable />
    </div>
  )
}

export default Dashboard
