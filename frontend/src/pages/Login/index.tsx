import { Link } from 'react-router-dom'
import styles from '../Auth.module.css'

type FieldProps = {
  id: string
  label: string
  type: string
  name: string
  autoComplete: string
  placeholder: string
}

const Field = ({
  id,
  label,
  type,
  name,
  autoComplete,
  placeholder,
}: FieldProps) => (
  <div className={styles.field}>
    <label htmlFor={id} className={styles.label}>
      {label}
    </label>
    <input
      id={id}
      className={styles.input}
      type={type}
      name={name}
      autoComplete={autoComplete}
      placeholder={placeholder}
    />
  </div>
)

const Login = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <span className={styles.badge}>Crypto dashboard</span>
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>
          Sign in to pick up where you left off with prices, news, and insights.
        </p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <Field
            id="login-email"
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
          />
          <Field
            id="login-password"
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="••••••••"
          />
          <button type="submit" className={styles.submit}>
            Sign in
          </button>
        </form>

        <p className={styles.footer}>
          New here?{' '}
          <Link to="/signup" className={styles.link}>
            Create an account
          </Link>
        </p>
      </div>
    </main>
  )
}

export default Login
