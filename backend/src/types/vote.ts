export type Vote = {
  snapshotId: string
  userId: string
  upvoted: boolean
  timestamp: number
}

export type VoteRequest = {
  snapshotId: string
  upvoted: boolean
}

export type VoteResponse = {
  snapshotId: string
  upvoted: boolean
}

export type VoteSnapshotResponse = VoteResponse & {
  voted: boolean
}
