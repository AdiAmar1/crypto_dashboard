import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postVote } from '../api/postVote'
import type { VoteSnapshotResponse } from '../types/vote'
import { voteSnapshotQueryKey } from './useGetSnapshotVote'

export function useVoteSnapshot(snapshotId: string) {
  const queryClient = useQueryClient()
  const queryKey = [...voteSnapshotQueryKey, snapshotId] as const
  const [hasVoted, setHasVoted] = useState(false)

  useEffect(() => {
    setHasVoted(false)
  }, [snapshotId])

  const mutation = useMutation({
    mutationFn: (upvoted: boolean) => postVote({ snapshotId, upvoted }),
    onMutate: async (upvoted) => {
      await queryClient.cancelQueries({ queryKey })
      const previous = queryClient.getQueryData<VoteSnapshotResponse>(queryKey)
      queryClient.setQueryData(queryKey, {
        snapshotId,
        upvoted,
        voted: true,
      })
      setHasVoted(true)
      return { previous }
    },
    onError: (_error, _upvoted, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData(queryKey, context.previous)
      }
    },
    onSuccess: (result) => {
      queryClient.setQueryData(queryKey, {
        ...result,
        voted: true,
      })
    },
  })

  const setUpvoted = (upvoted: boolean) => {
    if (!snapshotId || mutation.isPending) return

    const current = queryClient.getQueryData<VoteSnapshotResponse>(queryKey)
    const hasUpvoted = current?.upvoted ?? false
    const hasExistingVote = hasVoted || (current?.voted ?? false)

    if (hasExistingVote && hasUpvoted === upvoted) return

    mutation.mutate(upvoted)
  }

  const toggleUpvote = () => {
    const current = queryClient.getQueryData<VoteSnapshotResponse>(queryKey)
    setUpvoted(!(current?.upvoted ?? false))
  }

  return {
    hasVoted,
    setUpvoted,
    upvote: () => setUpvoted(true),
    downvote: () => setUpvoted(false),
    toggleUpvote,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  }
}
