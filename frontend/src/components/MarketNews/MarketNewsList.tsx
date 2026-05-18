import type { MarketNewsArticle } from '../../types/marketNews'
import styles from './MarketNews.module.css'

type MarketNewsListProps = {
  articles: MarketNewsArticle[]
}

const MarketNewsList = ({ articles }: MarketNewsListProps) => {
  return (
    <ul className={styles.list}>
      {articles.map((article) => (
        <li key={article.id} className={styles.item}>
          <a
            className={styles.articleLink}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {article.imageUrl ? (
              <img
                className={styles.thumbnail}
                src={article.imageUrl}
                alt=""
                loading="lazy"
              />
            ) : (
              <div className={styles.thumbnailPlaceholder} aria-hidden="true">
                <span className={styles.placeholderLabel}>News</span>
              </div>
            )}
            <span className={styles.articleTitle}>{article.title}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

export default MarketNewsList
