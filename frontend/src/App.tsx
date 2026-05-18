import './App.css'
import { Navigate } from 'react-router-dom'
import MarketNews from './components/MarketNews'
import CoinPrices from './components/CoinPrices'
import DailyInsights from './components/DailyInsights'
import FunMeme from './components/FunMeme'
import { useUserData } from './hooks/useUserData'
import type { WidgetPreference } from './types/widgetPreference'

const WIDGET_COMPONENTS: Record<
  WidgetPreference,
  React.ComponentType
> = {
  MARKET_NEWS: MarketNews,
  COIN_PRICES: CoinPrices,
  DAILY_INSIGHTS: DailyInsights,
  FUN_MEME: FunMeme,
}

const App = () => {
  const { data: user, isLoading } = useUserData()

  if (isLoading) {
    return (
      <main className="dashboard">
        <div className="dashboard-loading" role="status" aria-live="polite">
          <div className="loading-spinner" aria-hidden="true" />
          <p className="loading-text">Loading your dashboard…</p>
        </div>
      </main>
    )
  }

  if (user?.preferences === null) {
    return <Navigate to="/onboarding" replace />
  }

  return (
    <main className="dashboard">
      <div className="dashboard-grid">
        {user?.preferences.widgets.map((preference) => {
          if (preference === 'COIN_PRICES') {
            return (
              <CoinPrices
                key={preference}
                coins={user.preferences.coins}
              />
            )
          }

          const Widget = WIDGET_COMPONENTS[preference]
          return <Widget key={preference} />
        })}
      </div>
    </main>
  )
}

export default App
