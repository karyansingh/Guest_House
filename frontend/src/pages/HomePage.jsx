import { Link } from 'react-router-dom'
import { BsArrowUpRight, BsCalendar2Check, BsChevronRight, BsDoorOpen, BsPlus, BsSearch } from 'react-icons/bs'
import { FaRegBell, FaRegBuilding } from 'react-icons/fa'
import { HiOutlineSparkles } from 'react-icons/hi2'
import { useDashboardController } from '../hooks/useDashboardController'

function MetricCard({ item }) {
  const Icon = item.icon
  return (
    <article className="overview-card">
      <div className={`overview-icon ${item.tone}`}><Icon /></div>
      <div className="overview-card-copy">
        <span>{item.label}</span><strong>{item.value}</strong><small>{item.note}</small>
      </div>
      <span className={`metric-change ${item.tone}`}>{item.change}</span>
    </article>
  )
}

function HomePage() {
  const { query, setQuery, period, setPeriod, cards, hasSearchMatch } = useDashboardController()

  return (
    <main className="main-container dashboard-page">
      <div className="dashboard-topline">
        <div className="breadcrumb">Workspace <span>/</span> Overview</div>
        <div className="dashboard-tools">
          <label className="dashboard-search"><BsSearch /><input aria-label="Search dashboard" placeholder="Search rooms, guests…" value={query} onChange={event => setQuery(event.target.value)} /></label>
          <button className="notification-button" type="button" aria-label="Notifications"><FaRegBell /><i /></button>
          <span className="today-date">Your guest house at a glance</span>
        </div>
      </div>

      <section className="welcome-card">
        <div className="welcome-copy">
          <span className="eyebrow"><HiOutlineSparkles /> GUEST HOUSE OVERVIEW</span>
          <h1>A better day starts here.</h1>
          <p>Everything you need to welcome guests and keep their stay running smoothly.</p>
          <Link className="welcome-action" to="/dashboard"><BsPlus /> Create a booking <BsArrowUpRight className="action-arrow" /></Link>
        </div>
        <div className="welcome-art" aria-hidden="true">
          <div className="sun-orb" /><div className="art-building"><span /><span /><span /><span /><b /></div>
          <div className="art-plant"><i /><i /><i /><b /></div>
          <div className="art-caption"><FaRegBuilding /> AIIMS Guwahati Guest House</div>
        </div>
        <div className="welcome-glow" aria-hidden="true" />
      </section>

      <div className="section-heading">
        <div><span className="eyebrow muted">AT A GLANCE</span><h2>Your overview</h2><p>Live highlights for your property</p></div>
        <div className="period-switch" role="group" aria-label="Overview period">
          {['Today', 'This week'].map(option => <button key={option} type="button" aria-pressed={period === option} className={period === option ? 'selected' : ''} onClick={() => setPeriod(option)}>{option}</button>)}
        </div>
      </div>

      {hasSearchMatch ? <section className="overview-grid" aria-label="Guest house overview">{cards.map(item => <MetricCard key={item.label} item={item} />)}</section> : (
        <div className="dashboard-empty"><BsSearch /><div><strong>No dashboard matches</strong><span>Try searching for rooms, guests, or arrivals.</span></div><button type="button" onClick={() => setQuery('')}>Clear search</button></div>
      )}

      <section className="dashboard-bottom-grid">
        <article className="focus-card">
          <div className="focus-icon"><BsCalendar2Check /></div>
          <div className="focus-copy"><span className="eyebrow muted">YOUR NEXT STEP</span><h2>Keep your day moving</h2><p>Review today’s arrivals and make sure every guest has a smooth welcome.</p>
            <Link to="/dashboard" className="text-link">View arrivals <BsChevronRight /></Link>
          </div>
          <div className="arrival-stats"><span>UP NEXT</span><strong>11:30 <small>AM</small></strong><i><b /></i><small>2 guests arriving</small></div>
        </article>
        <article className="tip-card"><div className="tip-sparkle"><HiOutlineSparkles /></div><div><span className="eyebrow">A LITTLE INSPIRATION</span><h2>Hospitality is in the details.</h2><p>A warm welcome makes every stay feel special.</p></div><span className="tip-decoration" aria-hidden="true">✦</span></article>
      </section>
    </main>
  )
}

export default HomePage
