import type {
  Vote,
  VoteRequest,
  VoteResponse,
  VoteSnapshotResponse,
} from '../types/vote.js'

const votes = new Map<string, Vote>()

function voteKey(userId: string, snapshotId: string): string {
  return `${userId}:${snapshotId}`
}

export function getVote(
  userId: string,
  snapshotId: string,
): VoteSnapshotResponse {
  const vote = votes.get(voteKey(userId, snapshotId))

  if (!vote) {
    return { snapshotId, upvoted: false, voted: false }
  }

  return { snapshotId, upvoted: vote.upvoted, voted: true }
}

export function submitVote(
  userId: string,
  { snapshotId, upvoted }: VoteRequest,
): VoteResponse {
  const key = voteKey(userId, snapshotId)
  const vote: Vote = {
    snapshotId,
    userId,
    upvoted,
    timestamp: Date.now(),
  }

  votes.set(key, vote)

  return { snapshotId, upvoted }
}
