import styles from './VoteControls.module.css'

type VoteControlsProps = {
  hasUpvoted: boolean
  hasDownvoted: boolean
  onUpvote: () => void
  onDownvote: () => void
  isPending?: boolean
  ariaLabel?: string
}

const ThumbUpIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
    <path
      fill="currentColor"
      d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"
    />
  </svg>
)

const ThumbDownIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
    <path
      fill="currentColor"
      d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"
    />
  </svg>
)

const VoteControls = ({
  hasUpvoted,
  hasDownvoted,
  onUpvote,
  onDownvote,
  isPending = false,
  ariaLabel = 'Rate this content',
}: VoteControlsProps) => (
  <div className={styles.controls} role="group" aria-label={ariaLabel}>
    <button
      type="button"
      className={styles.btn}
      data-active={hasUpvoted || undefined}
      aria-pressed={hasUpvoted}
      aria-label="Thumbs up"
      disabled={isPending}
      onClick={onUpvote}
    >
      <ThumbUpIcon />
    </button>
    <button
      type="button"
      className={`${styles.btn} ${styles.btnDown}`}
      data-active={hasDownvoted || undefined}
      aria-pressed={hasDownvoted}
      aria-label="Thumbs down"
      disabled={isPending}
      onClick={onDownvote}
    >
      <ThumbDownIcon />
    </button>
  </div>
)

export default VoteControls
