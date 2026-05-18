import { Link } from 'react-router-dom'
import styles from './OnBoarding.module.css'

const OnBoarding = () => {
  return (
    <main className={styles.page}>
      <div className={styles.intro}>
        <h1>Welcome to your crypto dashboard</h1>
        <p className={styles.subtitle}>
          Personalize your feed with market news, live prices, daily insights,
          and a bit of fun. Here is how to get started.
        </p>
      </div>

      <ol className={styles.steps}>
        <li className={styles.step}>
          <span className={styles.stepNumber} aria-hidden="true">
            1
          </span>
          <div className={styles.stepContent}>
            <h3>Pick your widgets</h3>
            <p>
              Choose what matters most—news, prices, insights, or memes—and
              arrange your dashboard around them.
            </p>
          </div>
        </li>
        <li className={styles.step}>
          <span className={styles.stepNumber} aria-hidden="true">
            2
          </span>
          <div className={styles.stepContent}>
            <h3>Stay in the loop</h3>
            <p>
              Your dashboard updates with the latest market moves so you can
              scan everything in one place.
            </p>
          </div>
        </li>
        <li className={styles.step}>
          <span className={styles.stepNumber} aria-hidden="true">
            3
          </span>
          <div className={styles.stepContent}>
            <h3>Jump in anytime</h3>
            <p>
              Come back daily to check prices and news, or tweak your layout
              when your interests change.
            </p>
          </div>
        </li>
      </ol>

      <Link to="/" className={styles.cta}>
        Go to dashboard
      </Link>
    </main>
  )
}

export default OnBoarding
