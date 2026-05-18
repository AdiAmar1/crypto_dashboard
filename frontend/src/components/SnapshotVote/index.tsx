import { useGetSnapshotVote } from '../../hooks/useGetSnapshotVote'
import { useVoteSnapshot } from '../../hooks/useVoteSnapshot'
import VoteControls from '../VoteControls'

type SnapshotVoteProps = {
  snapshotId: string
  ariaLabel?: string
}

const SnapshotVote = ({
  snapshotId,
  ariaLabel = 'Rate this content',
}: SnapshotVoteProps) => {
  const { data: voteSnapshot } = useGetSnapshotVote(snapshotId)
  const { upvote, downvote, isPending, hasVoted } = useVoteSnapshot(snapshotId)

  if (!snapshotId) return null

  const hasUpvoted = voteSnapshot?.upvoted ?? false
  const hasDownvoted = (hasVoted || (voteSnapshot?.voted ?? false)) && !hasUpvoted

  return (
    <VoteControls
      hasUpvoted={hasUpvoted}
      hasDownvoted={hasDownvoted}
      onUpvote={upvote}
      onDownvote={downvote}
      isPending={isPending}
      ariaLabel={ariaLabel}
    />
  )
}

export default SnapshotVote
