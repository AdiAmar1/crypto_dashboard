import { useUserData } from '../../hooks/useUserData'
import styles from './Header.module.css'

const Header = () => {
  const { data: user, isLoading, isError } = useUserData()

  return (
    <header className={styles.header}>
      <p className={styles.greeting}>
        {isLoading && (
          <span className={styles.loading} role="status" aria-live="polite">
            Loading…
          </span>
        )}
        {!isLoading && !isError && user && (
          <>
            Hello, <span className={styles.name}>{user.name}</span>
          </>
        )}
        {!isLoading && (isError || !user) && (
          <span className={styles.name}>Welcome</span>
        )}
      </p>
    </header>
  )
}

export default Header
