export default function cloneDeep<T>(value: T): T {
  // Check for null and not an object
  if (value === null || typeof value !== 'object') {
    return value
  }

  // Handle Array cases
  if (Array.isArray(value)) {
    return value.map(item => cloneDeep(item)) as T
  }

  // Handle Object cases
  const result: { [key in keyof T]: T[key] } = {} as {
    [key in keyof T]: T[key]
  }

  for (const key of Object.keys(value) as Array<keyof T>) {
    result[key] = cloneDeep(value[key])
  }

  return result
}
