import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSignup } from '../../hooks/useSignup'
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

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)

  const signup = useSignup()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setValidationError(null)

    if (password !== confirmPassword) {
      setValidationError('Passwords do not match.')
      return
    }

    signup.mutate({ name, email, password })
  }

  const formError = validationError ?? signup.error?.message ?? null
  const isSubmitting = signup.isPending

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <span className={styles.badge}>Get started</span>
        <h1 className={styles.title}>Create your account</h1>
        <p className={styles.subtitle}>
          Set up your personalized crypto dashboard in a few seconds.
        </p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <Field
            id="signup-name"
            label="Name"
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Alex"
            value={name}
            onChange={setName}
            disabled={isSubmitting}
          />
          <Field
            id="signup-email"
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
            id="signup-password"
            label="Password"
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="••••••••"
            value={password}
            onChange={setPassword}
            disabled={isSubmitting}
          />
          <Field
            id="signup-confirm-password"
            label="Confirm password"
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={setConfirmPassword}
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
            {isSubmitting ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className={styles.footer}>
          Already have an account?{' '}
          <Link to="/login" className={styles.link}>
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}

export default Signup
