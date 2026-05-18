import { useFunMeme } from '../../hooks/useFunMeme'
import SnapshotVote from '../SnapshotVote'
import styles from './FunMeme.module.css'

const FunMeme = () => {
  const { data, isLoading, isError, error } = useFunMeme()

  return (
    <section className={styles.container}>
      {data?.snapshotId && (
        <SnapshotVote snapshotId={data.snapshotId} ariaLabel="Rate this meme" />
      )}

      <header className={styles.header}>
        <h2 className={styles.title}>Fun Meme</h2>
        <p className={styles.subtitle}>A random crypto meme for your day</p>
      </header>

      {isLoading && (
        <p className={styles.status} role="status" aria-live="polite">
          Loading meme…
        </p>
      )}

      {isError && (
        <p className={styles.error} role="alert">
          {error instanceof Error ? error.message : 'Could not load meme'}
        </p>
      )}

      {data && (
        <figure className={styles.figure}>
          <img
            className={styles.image}
            src={data.url}
            alt="Crypto meme"
            loading="lazy"
            decoding="async"
          />
        </figure>
      )}
    </section>
  )
}

export default FunMeme
