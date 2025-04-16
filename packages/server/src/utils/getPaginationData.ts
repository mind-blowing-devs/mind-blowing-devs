export function getPaginationData(total: number, page: number, limit: number) {
  return { total, page, limit, totalPages: Math.ceil(total / limit) }
}
