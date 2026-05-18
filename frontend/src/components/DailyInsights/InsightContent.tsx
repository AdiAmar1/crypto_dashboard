import type { ReactNode } from 'react'
import styles from './DailyInsights.module.css'

type InsightContentProps = {
  insight: string
}

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

function renderBlock(block: string, index: number): ReactNode {
  const trimmed = block.trim()
  if (!trimmed) {
    return null
  }

  const listItems = trimmed.split(/\n(?=\d+\.\s)/)
  if (listItems.length > 1 || /^\d+\.\s/.test(trimmed)) {
    return (
      <ol key={index} className={styles.list}>
        {listItems.map((item, itemIndex) => (
          <li key={itemIndex} className={styles.listItem}>
            {renderInline(item.replace(/^\d+\.\s*/, ''))}
          </li>
        ))}
      </ol>
    )
  }

  return (
    <p key={index} className={styles.paragraph}>
      {renderInline(trimmed)}
    </p>
  )
}

const InsightContent = ({ insight }: InsightContentProps) => {
  const blocks = insight.split(/\n\n+/)

  return (
    <div className={styles.insight}>
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  )
}

export default InsightContent
