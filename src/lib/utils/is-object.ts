export function isObject(obj: unknown): obj is boolean {
  return typeof obj === 'object' && !Array.isArray(obj)
}
