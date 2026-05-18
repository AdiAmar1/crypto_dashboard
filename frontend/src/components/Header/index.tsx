import { useUser } from '../../contexts/UserContext'
import styles from './Header.module.css'

const Header = () => {
  const { user, isLoading, isError, logout } = useUser()
  const isSignedIn = !isLoading && !isError && Boolean(user)

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
      {isSignedIn && (
        <button
          type="button"
          className={styles.logout}
          onClick={logout}
        >
          Log out
        </button>
      )}
    </header>
  )
}

export default Header
