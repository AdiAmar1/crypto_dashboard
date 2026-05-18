import { useQuery } from '@tanstack/react-query'
import { getVoteSnapshot } from '../api/getVoteSnapshot'

export const voteSnapshotQueryKey = ['votes', 'snapshot'] as const

export function useGetSnapshotVote(snapshotId: string) {
  return useQuery({
    queryKey: [...voteSnapshotQueryKey, snapshotId],
    queryFn: () => getVoteSnapshot(snapshotId),
    enabled: snapshotId.length > 0,
    staleTime: Number.POSITIVE_INFINITY,
  })
}
