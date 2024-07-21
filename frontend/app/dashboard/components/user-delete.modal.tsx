import React from 'react'

interface DeleteUserConfirmationProps {
  userId: string
  onConfirm: () => void
  onCancel: () => void
}

const DeleteUserConfirmation: React.FC<DeleteUserConfirmationProps> = ({
  userId,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg dark:bg-gray-800">
        <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
        <p className="mb-4 text-gray-700 dark:text-gray-400">
          Are you sure you want to delete the user <strong>{userId}</strong>?
          This action cannot be undone.
        </p>
        <div className="flex gap-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteUserConfirmation
