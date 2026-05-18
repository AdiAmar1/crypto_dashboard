import { API_BASE_URL } from '../config/api'
import { fetchApi } from './fetchApi'
import type { FunMemeResult } from '../types/funMeme'

export async function getFunMeme(): Promise<FunMemeResult> {
  const response = await fetchApi(`${API_BASE_URL}/api/fun-meme`)

  if (!response.ok) {
    throw new Error('Failed to fetch fun meme')
  }

  return response.json() as Promise<FunMemeResult>
}
