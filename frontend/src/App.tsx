import './App.css'
import MarketNews from './components/MarketNews'
import CoinPrices from './components/CoinPrices'
import DailyInsights from './components/DailyInsights'
import FunMeme from './components/FunMeme'
import { useUserPreferences } from './hooks/useUserPreferences'
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
  const { data: preferences, isLoading } = useUserPreferences()

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

  return (
    <main className="dashboard">
      <div className="dashboard-grid">
        {preferences?.map((preference) => {
          const Widget = WIDGET_COMPONENTS[preference]
          return <Widget key={preference} />
        })}
      </div>
    </main>
  )
}

export default App
