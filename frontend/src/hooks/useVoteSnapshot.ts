import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { postVote } from '../api/postVote'

export const voteSnapshotQueryKey = ['votes', 'snapshot'] as const

export function useVoteSnapshot(snapshotId: string) {
  const queryClient = useQueryClient()
  const queryKey = [...voteSnapshotQueryKey, snapshotId] as const
  const [hasVoted, setHasVoted] = useState(false)

  useEffect(() => {
    setHasVoted(false)
  }, [snapshotId])

  const { data: hasUpvoted = false } = useQuery({
    queryKey,
    queryFn: () => false,
    enabled: snapshotId.length > 0,
    staleTime: Number.POSITIVE_INFINITY,
  })

  const mutation = useMutation({
    mutationFn: (upvoted: boolean) => postVote({ snapshotId, upvoted }),
    onMutate: async (upvoted) => {
      await queryClient.cancelQueries({ queryKey })
      const previous = queryClient.getQueryData<boolean>(queryKey)
      queryClient.setQueryData(queryKey, upvoted)
      setHasVoted(true)
      return { previous }
    },
    onError: (_error, _upvoted, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData(queryKey, context.previous)
      }
    },
    onSuccess: (result) => {
      queryClient.setQueryData(queryKey, result.upvoted)
    },
  })

  const setUpvoted = (upvoted: boolean) => {
    if (!snapshotId || mutation.isPending || hasUpvoted === upvoted) return
    mutation.mutate(upvoted)
  }

  const toggleUpvote = () => {
    setUpvoted(!hasUpvoted)
  }

  return {
    hasUpvoted,
    hasDownvoted: hasVoted && !hasUpvoted,
    setUpvoted,
    upvote: () => setUpvoted(true),
    downvote: () => setUpvoted(false),
    toggleUpvote,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  }
}
