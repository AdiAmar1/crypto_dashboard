import { fetchApi } from './fetchApi'
import type { FunMemeResult } from '../types/funMeme'

export async function getFunMeme(): Promise<FunMemeResult> {
  const response = await fetchApi('http://localhost:3000/api/fun-meme')

  if (!response.ok) {
    throw new Error('Failed to fetch fun meme')
  }

  return response.json() as Promise<FunMemeResult>
}
