'use client'

import { dashboardController } from '@/app/controller/dashboard.controller'
import React, { useEffect, useState } from 'react'
import EditUserForm from './editing-user.form'
import AddUserForm from './adding-user.form'

export interface HomeUser {
  id: string
  fullName: string
  email: string
  phoneNumber: string
  updatedAt: Date
  createdAt: Date
}

type HomeUsers = HomeUser[]

export function DashboardTable() {
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [editData, setEditData] = useState({
    phoneNumber: '',
    fullName: '',
    email: '',
  })

  const [newUser, setNewUser] = useState({
    email: '',
    fullName: '',
    password: '',
    phoneNumber: '',
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [searchBy, setSearchBy] = useState<'name' | 'email'>('name')

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleAddClick = () => {
    setIsAdding(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewUser((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleAddUser = () => {
    setIsAdding(false)
    setNewUser({
      email: '',
      fullName: '',
      password: '',
      phoneNumber: '',
    })
  }

  const handlEditUser = () => {
    setIsEditing(false)
    setEditData({
      email: '',
      fullName: '',
      phoneNumber: '',
    })
  }

  const [homeUsers, setHomeUsers] = useState<HomeUsers>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dashboardController.get({ page: 1 })
        setHomeUsers(result.data)
      } catch (err) {
        throw new Error('failed to fetch users')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <p>Loading...</p>

  const filteredUsers = homeUsers.filter((user) => {
    if (searchBy === 'name') {
      return user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    } else {
      return user.email.toLowerCase().includes(searchTerm.toLowerCase())
    }
  })

  return (
    <section className="container px-4 mx-auto">
      {/* Search Bar */}
      <div className="mb-4 flex items-center gap-x-4">
        <input
          type="text"
          placeholder={`Search by ${searchBy === 'name' ? 'name' : 'email'}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-3/4 py-3 border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <select
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value as 'name' | 'email')}
          className="border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>
      </div>

      <div className="flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="bg-purpleGuru overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 pl-5 ml-2 text-sm font-bold text-white text-left"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="py-3 pl-4 ml-2 text-sm font-bold text-white text-left"
                    >
                      Created At
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 pl-4 text-sm font-bold text-white text-left"
                    >
                      Phone Number
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 pl-4  text-sm font-bold text-white text-left"
                    >
                      User
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 pl-4 text-sm font-bold text-white text-left"
                    >
                      Updated At
                    </th>
                    <th
                      scope="col"
                      className="relative px-4 py-3 pl-2 text-sm font-bold text-white text-left"
                    >
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-grayGuru divide-y divide-gray-200 dark:divide-gray-700 ">
                  {filteredUsers.map((user, index) => (
                    <tr key={index}>
                      <td className="px-4 py-4 text-sm font-medium text-blackGuru whitespace-nowrap ">
                        {user.id.substring(0, 4)}
                      </td>
                      <td className="px-4 py-4 text-sm  font-medium text-blackGuru whitespace-nowrap">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-blackGuru whitespace-nowrap">
                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2  text-blackGuru">
                          <h2 className="text-sm font-medium">
                            {user.phoneNumber}
                          </h2>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        <div className="flex items-center gap-x-2">
                          <div>
                            <h2 className="text-sm font-medium text-blackGuru">
                              {user.fullName}
                            </h2>
                            <p className="text-xs font-medium text-blackGuru">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm  font-medium text-blackGuru whitespace-nowrap">
                        {new Date(user.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="relative px-4 py-4 text-right text-sm font-medium whitespace-nowrap">
                        <button
                          onClick={handleEditClick}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleAddClick}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Add User
          </button>
        </div>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <EditUserForm
          editData={editData}
          handleChange={handleChange}
          setIsEditing={setIsEditing}
          handleSubmit={handlEditUser}
        />
      )}

      {isAdding && (
        <AddUserForm
          editData={newUser}
          handleChange={handleNewUserChange}
          setIsAdding={setIsAdding}
          handleSubmit={handleAddUser}
        />
      )}

      {/* Add Form */}
    </section>
  )
}
