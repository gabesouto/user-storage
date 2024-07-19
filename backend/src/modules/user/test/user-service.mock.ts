import { randomUUID } from 'crypto'

const currentDate = new Date()

const baseMockUser = {
  id: randomUUID(),
  fullName: 'mock user',
  email: 'mock@gmail.com',
  age: 24,
  phoneNumber: '+8182728',
  createdAt: currentDate,
  updatedAt: currentDate,
}

const mockUser = {
  ...baseMockUser,
}

const mockUpdatedUser = {
  ...baseMockUser,
  fullName: 'updated mock user',
  age: 20,
}

const mockUsers = [
  {
    ...baseMockUser,
    id: randomUUID(),
    fullName: '1mock user',
    email: 'moc1@gmail.com',
  },
  {
    ...baseMockUser,
    id: randomUUID(),
    fullName: '2mock user',
    email: 'moc2@gmail.com',
  },
  {
    ...baseMockUser,
    id: randomUUID(),
    fullName: '3mock user',
    email: 'mock3@gmail.com',
  },
]

// To export or use the mocks
export { mockUser, mockUpdatedUser, mockUsers }
