import { useMarketNews } from '../../hooks/useMarketNews'
import MarketNewsList from './MarketNewsList'
import styles from './MarketNews.module.css'

type MarketNewsProps = {
  coins: string[]
}

const MarketNews = ({ coins }: MarketNewsProps) => {
  const { data, isLoading, isError, error } = useMarketNews(coins)

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>Market News</h2>
        <p className={styles.subtitle}>Latest headlines for your tracked coins</p>
      </header>

      {isLoading && (
        <p className={styles.status} role="status" aria-live="polite">
          Loading news…
        </p>
      )}

      {isError && (
        <p className={styles.error} role="alert">
          {error instanceof Error ? error.message : 'Could not load market news'}
        </p>
      )}

      {data && data.length === 0 && (
        <p className={styles.status}>No news articles found for your coins.</p>
      )}

      {data && data.length > 0 && <MarketNewsList articles={data} />}
    </section>
  )
}

export default MarketNews
