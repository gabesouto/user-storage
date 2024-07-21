'use client'

import { dashboardController } from '@/app/controller/dashboard.controller'
import React, { useEffect, useRef, useState } from 'react'
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
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
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
  const [homeUsers, setHomeUsers] = useState<HomeUsers>([])
  const [loading, setLoading] = useState(true)
  const initialLoadComplete = useRef(false)

  const handleEditClick = () => setIsEditing(true)
  const handleAddClick = () => setIsAdding(true)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewUser((prevData) => ({ ...prevData, [name]: value }))
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

  const handleEditUser = () => {
    setIsEditing(false)
    setEditData({
      email: '',
      fullName: '',
      phoneNumber: '',
    })
  }

  useEffect(() => {
    if (!initialLoadComplete.current) {
      fetchUsers(1)
    }
  }, [])

  useEffect(() => {
    if (initialLoadComplete.current) {
      fetchUsers(page)
    }
  }, [page])

  const fetchUsers = async (pageNumber: number) => {
    setLoading(true)
    try {
      const result = await dashboardController.get({ page: pageNumber })
      setHomeUsers(result.users)
      setTotalPages(result.page as number)
    } catch (err) {
      console.error('Failed to fetch users', err)
    } finally {
      setLoading(false)
      initialLoadComplete.current = true
    }
  }

  const filteredUsers = homeUsers.filter((user) => {
    const searchTermLower = searchTerm.toLowerCase()
    return searchBy === 'name'
      ? user.fullName.toLowerCase().includes(searchTermLower)
      : user.email.toLowerCase().includes(searchTermLower)
  })

  const hasMorePages = totalPages > page
  const hasNoUsers = homeUsers.length === 0 && !loading

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

      {/* Table */}
      <div className="flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="bg-purpleGuru overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="py-3 pl-5 text-sm font-bold text-white text-left">
                      ID
                    </th>
                    <th className="py-3 pl-4 text-sm font-bold text-white text-left">
                      Created At
                    </th>
                    <th className="px-2 py-3 pl-4 text-sm font-bold text-white text-left">
                      Phone Number
                    </th>
                    <th className="px-2 py-3 pl-4 text-sm font-bold text-white text-left">
                      User
                    </th>
                    <th className="px-2 py-3 pl-4 text-sm font-bold text-white text-left">
                      Updated At
                    </th>
                    <th className="relative px-4 py-3 text-sm font-bold text-white text-left">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-slate-50 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredUsers.map((user, index) => (
                    <tr key={index}>
                      <td className="px-4 py-4 text-sm font-medium text-blackGuru whitespace-nowrap">
                        {user.id.substring(0, 4)}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-blackGuru whitespace-nowrap">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-blackGuru whitespace-nowrap">
                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-blackGuru">
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
                      <td className="px-4 py-4 text-sm font-medium text-blackGuru whitespace-nowrap">
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
                  {loading && (
                    <tr>
                      <td colSpan={6} className="text-center py-4">
                        Carregando...
                      </td>
                    </tr>
                  )}
                  {hasNoUsers && (
                    <tr>
                      <td colSpan={6} className="text-center py-4 text-black">
                        Nenhum item encontrado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add User Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleAddClick}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Add User
        </button>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <EditUserForm
          editData={editData}
          handleChange={handleChange}
          setIsEditing={setIsEditing}
          handleSubmit={handleEditUser}
        />
      )}

      {/* Add User Form */}
      {isAdding && (
        <AddUserForm
          editData={newUser}
          handleChange={handleNewUserChange}
          setIsAdding={setIsAdding}
          handleSubmit={handleAddUser}
        />
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        {page > 1 && (
          <button
            onClick={() => {
              const prevPage = page - 1
              fetchUsers(prevPage)
              setPage(prevPage)
            }}
            className="flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blackGuru hover:bg-blackGuruDark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blackGuru"
          >
            Voltar
          </button>
        )}
        {hasMorePages && (
          <button
            onClick={() => {
              const nextPage = page + 1
              fetchUsers(nextPage)
              setPage(nextPage)
            }}
            className="flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blackGuru hover:bg-blackGuruDark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blackGuru"
          >
            Página {page}, Carregar mais
            <span
              style={{
                display: 'inline-block',
                marginLeft: '4px',
                fontSize: '1.2em',
              }}
              className="text-blackGuru"
            >
              ↓
            </span>
          </button>
        )}
      </div>
    </section>
  )
}
