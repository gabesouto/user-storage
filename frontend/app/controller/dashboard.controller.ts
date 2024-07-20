import { dashboardRepository } from '../repository/dashboard.repository'

interface TodoControllerGetParams {
  page?: number
  limit?: number
}

async function get({ page }: TodoControllerGetParams) {
  return await dashboardRepository.get({
    page,
    limit: 5,
  })
}

export const dashboardController = {
  get,
}
