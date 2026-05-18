import { useState } from 'react'
import { useUser } from '../../contexts/UserContext'
import type { WidgetPreference } from '../../types/widgetPreference'
import { useSavePreferences } from '../../hooks/useSavePreferences'
import {
  CONTENT_OPTIONS,
  INVESTOR_TYPES,
  ONBOARDING_STEPS,
  POPULAR_COINS,
  type InvestorType,
} from './constants'
import {
  fromUserPreferences,
  initialOnboardingPreferences,
  toUserPreferences,
  type OnboardingPreferences,
} from './types'
import styles from './OnBoarding.module.css'

const STEP_COUNT = ONBOARDING_STEPS.length

const OnBoarding = () => {
  const { user } = useUser()
  const [step, setStep] = useState(0)
  const [preferences, setPreferences] = useState<OnboardingPreferences>(() =>
    user?.preferences
      ? fromUserPreferences(user.preferences)
      : initialOnboardingPreferences(),
  )
  const savePreferences = useSavePreferences()

  const isLastStep = step === STEP_COUNT - 1
  const isSubmitting = savePreferences.isPending
  const submitError = savePreferences.error?.message ?? null

  const canContinue = (() => {
    if (step === 0) return preferences.coins.length > 0
    if (step === 1) return preferences.investorType !== null
    return preferences.widgets.length > 0
  })()

  const toggleCoin = (symbol: string) => {
    setPreferences((prev) => ({
      ...prev,
      coins: prev.coins.includes(symbol)
        ? prev.coins.filter((coin) => coin !== symbol)
        : [...prev.coins, symbol],
    }))
  }

  const setInvestorType = (investorType: InvestorType) => {
    setPreferences((prev) => ({ ...prev, investorType }))
  }

  const toggleWidget = (widget: WidgetPreference) => {
    setPreferences((prev) => ({
      ...prev,
      widgets: prev.widgets.includes(widget)
        ? prev.widgets.filter((item) => item !== widget)
        : [...prev.widgets, widget],
    }))
  }

  const goBack = () => setStep((current) => Math.max(0, current - 1))
  const goNext = () => {
    if (!canContinue || isSubmitting) return
    setStep((current) => Math.min(STEP_COUNT - 1, current + 1))
  }

  const handleFinish = () => {
    if (!canContinue || isSubmitting) return
    savePreferences.mutate(toUserPreferences(preferences))
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <p className={styles.badge}>Step {step + 1} of {STEP_COUNT}</p>
        <h1 className={styles.title}>{ONBOARDING_STEPS[step]}</h1>
        <p className={styles.hint}>
          {step === 0 && 'Select one or more coins to personalize your feed.'}
          {step === 1 && 'Pick the style that best matches how you invest.'}
          {step === 2 && 'Choose the widgets you want on your dashboard.'}
        </p>

        {step === 0 ? (
          <div className={styles.optionGrid} role="group" aria-label="Crypto assets">
            {POPULAR_COINS.map((coin) => {
              const selected = preferences.coins.includes(coin.symbol)
              return (
                <button
                  key={coin.symbol}
                  type="button"
                  className={`${styles.option} ${selected ? styles.optionSelected : ''}`}
                  aria-pressed={selected}
                  onClick={() => toggleCoin(coin.symbol)}
                >
                  <span className={styles.optionSymbol}>{coin.symbol.toUpperCase()}</span>
                  <span className={styles.optionLabel}>{coin.name}</span>
                </button>
              )
            })}
          </div>
        ) : null}

        {step === 1 ? (
          <ul className={styles.investorList}>
            {INVESTOR_TYPES.map((type) => {
              const selected = preferences.investorType === type.id
              return (
                <li key={type.id}>
                  <button
                    type="button"
                    className={`${styles.investorOption} ${selected ? styles.optionSelected : ''}`}
                    aria-pressed={selected}
                    onClick={() => setInvestorType(type.id)}
                  >
                    <span className={styles.investorLabel}>{type.label}</span>
                    <span className={styles.investorDescription}>{type.description}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        ) : null}

        {step === 2 ? (
          <ul className={styles.contentList}>
            {CONTENT_OPTIONS.map((option) => {
              const selected = preferences.widgets.includes(option.id)
              return (
                <li key={option.id}>
                  <button
                    type="button"
                    className={`${styles.contentOption} ${selected ? styles.optionSelected : ''}`}
                    aria-pressed={selected}
                    onClick={() => toggleWidget(option.id)}
                  >
                    <span className={styles.contentLabel}>{option.label}</span>
                    <span className={styles.contentDescription}>{option.description}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        ) : null}

        {submitError ? (
          <p className={styles.error} role="alert">
            {submitError}
          </p>
        ) : null}

        <div className={styles.progress} aria-hidden="true">
          {ONBOARDING_STEPS.map((_, index) => (
            <span
              key={index}
              className={`${styles.progressDot} ${index <= step ? styles.progressDotActive : ''}`}
            />
          ))}
        </div>

        <div className={styles.actions}>
          {step > 0 ? (
            <button
              type="button"
              className={styles.secondary}
              onClick={goBack}
              disabled={isSubmitting}
            >
              Back
            </button>
          ) : (
            <span className={styles.actionsSpacer} />
          )}
          {isLastStep ? (
            <button
              type="button"
              className={styles.primary}
              disabled={!canContinue || isSubmitting}
              onClick={handleFinish}
            >
              {isSubmitting ? 'Saving…' : 'Go to dashboard'}
            </button>
          ) : (
            <button
              type="button"
              className={styles.primary}
              disabled={!canContinue || isSubmitting}
              onClick={goNext}
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </main>
  )
}

export default OnBoarding
