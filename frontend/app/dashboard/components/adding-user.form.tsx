import React from 'react'

interface AddUserProps {
  editData: {
    fullName: string
    password: string
    phoneNumber: string
    age: string
    email: string
  }
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  setIsAdding: (isAdding: boolean) => void
  handleSubmit: () => void
}

const AddUserForm: React.FC<AddUserProps> = ({
  editData,
  handleChange,
  handleSubmit,
  setIsAdding,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-purpleGuru p-6 rounded-md shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-white">Edit User</h3>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={editData.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-3/4 py-1 px-4 border-gray-300 rounded-md shadow-sm focus:border-transparent focus:ring-indigo-500 sm:text-sm text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              Age
            </label>
            <input
              type="text"
              name="age"
              value={editData.age}
              onChange={handleChange}
              className="mt-1 block w-3/4 py-1 px-4 border-gray-300 rounded-md shadow-sm focus:border-transparent focus:ring-indigo-500 sm:text-sm text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={editData.fullName}
              onChange={handleChange}
              className="mt-1 block w-3/4 py-1 px-4 border-gray-300 rounded-md shadow-sm focus:border-transparent focus:ring-indigo-500 sm:text-sm text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={editData.email}
              onChange={handleChange}
              className="mt-1 block w-3/4 py-1 px-4 border-gray-300 rounded-md shadow-sm focus:non focus:border-transparent sm:text-sm text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              password
            </label>
            <input
              type="text"
              name="password"
              value={editData.password}
              onChange={handleChange}
              className="mt-1 block w-3/4 py-1 px-4 border-gray-300 rounded-md shadow-sm focus:non focus:border-transparent sm:text-sm text-black"
            />
          </div>

          <div className="flex gap-x-4">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddUserForm
