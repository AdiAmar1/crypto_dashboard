export function fetchApi(input: RequestInfo | URL, init?: RequestInit) {
  return fetch(input, { credentials: 'include', ...init })
}
