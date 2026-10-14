import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import HeaderComponent from './HeaderComponent'
import SidebarComponent from './SidebarComponent'

const desktopQuery = '(min-width: 821px)'

export default function DashboardComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(() => window.matchMedia(desktopQuery).matches)
  const toggleSidebar = () => setSidebarOpen(open => !open)
  const closeSidebarAfterNavigation = () => {
    if (window.matchMedia('(max-width: 820px)').matches) setSidebarOpen(false)
  }

  return (
    <div className={`dashboard-shell ${sidebarOpen ? 'sidebar-is-open' : 'sidebar-is-closed'}`}>
      {sidebarOpen && <button type="button" aria-label="Close navigation menu" onClick={() => setSidebarOpen(false)} className="dashboard-scrim" />}
      <SidebarComponent open={sidebarOpen} onClose={() => setSidebarOpen(false)} onNavigate={closeSidebarAfterNavigation} />
      <div className="dashboard-content">
        <HeaderComponent sidebarOpen={sidebarOpen} onMenuClick={toggleSidebar} />
        <main className="dashboard-main"><Outlet /></main>
        <footer className="dashboard-footer">AIIMS Guwahati · Guest House Management System</footer>
      </div>
    </div>
  )
}
