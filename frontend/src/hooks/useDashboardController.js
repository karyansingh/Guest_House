import { useMemo, useState } from 'react'
import { dashboardActions, overviewByPeriod } from '../models/dashboardModel'

export function useDashboardController() {
  const [query, setQuery] = useState('')
  const [period, setPeriod] = useState('Today')
  const normalizedQuery = query.trim().toLowerCase()

  const cards = useMemo(() => overviewByPeriod[period], [period])
  const hasSearchMatch = !normalizedQuery || dashboardActions.some(item =>
    `${item.label} ${item.keywords}`.toLowerCase().includes(normalizedQuery),
  )

  return { query, setQuery, period, setPeriod, cards, hasSearchMatch }
}
