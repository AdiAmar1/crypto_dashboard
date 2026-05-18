import { useMemo } from 'react'
import { Chart } from 'react-charts'
import type { AxisOptions, DatumStyles } from 'react-charts'
import { usePrefersDarkScheme } from '../../hooks/usePrefersDarkScheme'
import type { CoinPrice } from '../../types/coinPrice'
import { formatPercent, formatUsdCompact } from './formatters'
import styles from './CoinPrices.module.css'

type ChartDatum = {
  label: string
  marketCap: number
  priceChangePercentage24h: number | null
}

function toChartDatum(coin: CoinPrice): ChartDatum {
  return {
    label: coin.symbol.toUpperCase(),
    marketCap: coin.marketCap,
    priceChangePercentage24h: coin.priceChangePercentage24h,
  }
}

function barColor(change: number | null): string {
  if (change === null) return 'var(--chart-neutral)'
  if (change > 0) return 'var(--chart-positive)'
  if (change < 0) return 'var(--chart-negative)'
  return 'var(--chart-neutral)'
}

type CoinPricesChartProps = {
  coins: CoinPrice[]
}

const CoinPricesChart = ({ coins }: CoinPricesChartProps) => {
  const isDark = usePrefersDarkScheme()

  const sortedCoins = useMemo(
    () => [...coins].sort((a, b) => b.marketCap - a.marketCap),
    [coins],
  )

  const data = useMemo(
    () => [
      {
        label: 'Market cap',
        data: sortedCoins.map(toChartDatum),
      },
    ],
    [sortedCoins],
  )

  const primaryAxis = useMemo<AxisOptions<ChartDatum>>(
    () => ({
      getValue: (datum) => datum.label,
      scaleType: 'band',
      position: 'left',
      minTickPaddingForRotation: 8,
    }),
    [],
  )

  const secondaryAxes = useMemo<AxisOptions<ChartDatum>[]>(
    () => [
      {
        getValue: (datum) => datum.marketCap,
        elementType: 'bar',
        position: 'bottom',
        min: 0,
        showGrid: true,
        formatters: {
          scale: (value: number) => formatUsdCompact(value),
          tooltip: (value: number) => formatUsdCompact(value),
        },
      },
    ],
    [],
  )

  const getDatumStyle = useMemo(
    () =>
      (datum: { originalDatum: ChartDatum }): DatumStyles => ({
        rectangle: {
          fill: barColor(datum.originalDatum.priceChangePercentage24h),
          rx: 3,
        },
      }),
    [],
  )

  return (
    <div className={styles.chartWrap}>
      <Chart
        className={styles.chart}
        options={{
          data,
          primaryAxis,
          secondaryAxes,
          getDatumStyle,
          dark: isDark,
          padding: { left: 4, right: 16, top: 12, bottom: 28 },
          tooltip: {
            render: ({ focusedDatum }) => {
              if (!focusedDatum) return null
              const coin = sortedCoins[focusedDatum.index]
              if (!coin) return null
              const { marketCap, priceChangePercentage24h } =
                focusedDatum.originalDatum
              return (
                <div className={styles.tooltip}>
                  <strong>{coin.name}</strong>
                  <span className={styles.tooltipSymbol}>
                    {coin.symbol.toUpperCase()}
                  </span>
                  <span>Market cap: {formatUsdCompact(marketCap)}</span>
                  <span>
                    24h: {formatPercent(priceChangePercentage24h)}
                  </span>
                </div>
              )
            },
          },
        }}
      />
    </div>
  )
}
export default CoinPricesChart
