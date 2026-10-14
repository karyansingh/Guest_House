import { BsCalendar2Check, BsDoorOpen, BsPeople } from 'react-icons/bs'

export const overviewByPeriod = {
  Today: [
    { label: 'Rooms available', value: '24', note: 'Ready for guests', icon: BsDoorOpen, tone: 'mint', change: '+2 today' },
    { label: 'Guests staying', value: '18', note: 'Across 12 rooms', icon: BsPeople, tone: 'lavender', change: '72% occupancy' },
    { label: 'Arrivals today', value: '06', note: 'Next arrival at 11:30', icon: BsCalendar2Check, tone: 'peach', change: '2 expected soon' },
  ],
  'This week': [
    { label: 'Rooms available', value: '24', note: 'Ready for guests', icon: BsDoorOpen, tone: 'mint', change: '+2 today' },
    { label: 'Guests staying', value: '18', note: 'Across 12 rooms', icon: BsPeople, tone: 'lavender', change: '72% occupancy' },
    { label: 'Arrivals this week', value: '32', note: 'Expected this week', icon: BsCalendar2Check, tone: 'peach', change: '+8 vs last week' },
  ],
}

export const dashboardActions = [
  { label: 'Rooms', keywords: 'rooms available occupancy' },
  { label: 'Guests', keywords: 'guests staying residents' },
  { label: 'Arrivals today', keywords: 'arrivals bookings reservations' },
]
