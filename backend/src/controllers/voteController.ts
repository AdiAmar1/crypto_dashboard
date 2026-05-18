import type { Request, Response } from 'express'
import type { VoteRequest } from '../types/vote.js'
import * as voteService from '../services/voteService.js'
import { getUserId } from '../utils/getUserId.js'

function parseSnapshotId(snapshotId: unknown): string | null {
  if (typeof snapshotId !== 'string') {
    return null
  }

  const trimmed = snapshotId.trim()
  return trimmed.length > 0 ? trimmed : null
}

function parseVoteBody(body: unknown): VoteRequest | null {
  if (!body || typeof body !== 'object') {
    return null
  }

  const { snapshotId, upvoted } = body as Record<string, unknown>
  const parsedSnapshotId = parseSnapshotId(snapshotId)

  if (!parsedSnapshotId || typeof upvoted !== 'boolean') {
    return null
  }

  return { snapshotId: parsedSnapshotId, upvoted }
}

export function getVote(req: Request, res: Response): void {
  const snapshotId = parseSnapshotId(req.query.snapshotId)

  if (!snapshotId) {
    res.status(400).json({ error: 'snapshotId query parameter is required' })
    return
  }

  const userId = getUserId(req)
  const result = voteService.getVote(userId, snapshotId)
  res.json(result)
}

export function postVote(req: Request, res: Response): void {
  const body = parseVoteBody(req.body)

  if (!body) {
    res
      .status(400)
      .json({ error: 'snapshotId (string) and upvoted (boolean) are required' })
    return
  }

  const userId = getUserId(req)
  const result = voteService.submitVote(userId, body)
  res.json(result)
}
