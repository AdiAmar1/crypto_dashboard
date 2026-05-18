import styles from './CoinPrices.module.css'

const CoinPrices = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Coin Prices</h2>
      <p className={styles.placeholder}>Live coin prices will appear here.</p>
    </section>
  )
}

export default CoinPrices
