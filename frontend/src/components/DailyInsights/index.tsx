import { useDailyInsights } from '../../hooks/useDailyInsights'
import SnapshotVote from '../SnapshotVote'
import InsightContent from './InsightContent'
import styles from './DailyInsights.module.css'

type DailyInsightsProps = {
  coins: string[]
}

function formatGeneratedAt(iso: string): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(iso))
}

const DailyInsights = ({ coins }: DailyInsightsProps) => {
  const { data, isLoading, isError, error } = useDailyInsights(coins)

  return (
    <section className={styles.container}>
      {data?.snapshotId && (
        <SnapshotVote
          snapshotId={data.snapshotId}
          ariaLabel="Rate daily insights"
        />
      )}

      <header className={styles.header}>
        <h2 className={styles.title}>Daily Insights</h2>
        <p className={styles.subtitle}>AI-generated market summary for your tracked coins</p>
      </header>

      {isLoading && (
        <p className={styles.status} role="status" aria-live="polite">
          Generating today&apos;s insight…
        </p>
      )}

      {isError && (
        <p className={styles.error} role="alert">
          {error instanceof Error ? error.message : 'Could not load daily insights'}
        </p>
      )}

      {data && (
        <>
          <InsightContent insight={data.insight} />
          <footer className={styles.footer}>
            <span className={styles.meta}>
              {data.coins.map((coin) => coin.toUpperCase()).join(' · ')}
            </span>
            <time className={styles.meta} dateTime={data.generatedAt}>
              {formatGeneratedAt(data.generatedAt)}
            </time>
          </footer>
        </>
      )}
    </section>
  )
}

export default DailyInsights
