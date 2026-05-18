import { useCoinsPrices } from '../../hooks/useCoinsPrices'
import SnapshotVote from '../SnapshotVote'
import CoinPricesChart from './CoinPricesChart'
import styles from './CoinPrices.module.css'

type CoinPricesProps = {
  coins: string[]
}

const CoinPrices = ({ coins }: CoinPricesProps) => {
  const { data, isLoading, isError, error } = useCoinsPrices(coins)

  return (
    <section className={styles.container}>
      {data?.snapshotId && (
        <SnapshotVote snapshotId={data.snapshotId} ariaLabel="Rate coin prices" />
      )}

      <header className={styles.header}>
        <h2 className={styles.title}>Coin Prices</h2>
        <p className={styles.subtitle}>Your tracked coins</p>
        <ul className={styles.legend} aria-label="Chart legend">
          <li className={styles.legendItem}>
            <span className={styles.legendSwatch} data-variant="up" />
            24h up
          </li>
          <li className={styles.legendItem}>
            <span className={styles.legendSwatch} data-variant="down" />
            24h down
          </li>
          <li className={styles.legendItem}>
            <span className={styles.legendSwatch} data-variant="neutral" />
            No data
          </li>
        </ul>
      </header>

      {isLoading && (
        <p className={styles.status} role="status" aria-live="polite">
          Loading prices…
        </p>
      )}

      {isError && (
        <p className={styles.error} role="alert">
          {error instanceof Error ? error.message : 'Could not load coin prices'}
        </p>
      )}

      {data && data.coins.length > 0 && <CoinPricesChart coins={data.coins} />}
    </section>
  )
}

export default CoinPrices
