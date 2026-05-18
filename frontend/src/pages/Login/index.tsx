import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin'
import styles from '../Auth.module.css'

type FieldProps = {
  id: string
  label: string
  type: string
  name: string
  autoComplete: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

const Field = ({
  id,
  label,
  type,
  name,
  autoComplete,
  placeholder,
  value,
  onChange,
  disabled,
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
      value={value}
      onChange={(event) => onChange(event.target.value)}
      disabled={disabled}
      required
    />
  </div>
)

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = useLogin()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    login.mutate({ email, password })
  }

  const formError = login.error?.message ?? null
  const isSubmitting = login.isPending

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
            value={email}
            onChange={setEmail}
            disabled={isSubmitting}
          />
          <Field
            id="login-password"
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={setPassword}
            disabled={isSubmitting}
          />
          {formError ? (
            <p className={styles.error} role="alert">
              {formError}
            </p>
          ) : null}
          <button
            type="submit"
            className={styles.submit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in…' : 'Sign in'}
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
