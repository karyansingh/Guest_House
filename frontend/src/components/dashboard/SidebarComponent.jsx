import { memo, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { BsGrid1X2Fill, BsChevronDown, BsDoorOpen, BsPeople, BsCalendar2Check } from 'react-icons/bs'
import { FaRegBuilding } from 'react-icons/fa'
import { IoCloseOutline } from 'react-icons/io5'
import logo from '../../assets/images/aiimsheaderbluenew.png'
import { useManu } from '../../hooks/useMenu'
import userAPI from '../../API/userAPI'

function SidebarComponent({ open, onClose, onNavigate }) {
  const [showMenu, setShowMenu] = useState(null)
  const [menuName, setMenuName] = useState('Overview')
  const navBar = useManu()
  const links = [
    { name: 'Overview', slug: '/dashboard', icon: <BsGrid1X2Fill /> },
    { name: 'Rooms', slug: '/dashboard', icon: <BsDoorOpen /> },
    { name: 'Guests', slug: '/dashboard', icon: <BsPeople /> },
    { name: 'Bookings', slug: '/dashboard', icon: <BsCalendar2Check /> },
  ]

  function toggleMenu(id) { setShowMenu(showMenu === id ? null : id) }

  return (
    <>
      <aside id="sidebar" className={open ? 'sidebar-responsive' : ''} aria-hidden={!open}>
        <div className="sidebar-top">
          <Link to="/dashboard" className="sidebar-brand" onClick={() => setMenuName('Overview')}>
            <img src={logo} alt="AIIMS Guwahati" />
            <span><strong>AIIMS Guwahati</strong><small>Guest House</small></span>
          </Link>
          <button className="sidebar-close" onClick={onClose} aria-label="Close navigation"><IoCloseOutline /></button>
        </div>
        <div className="sidebar-workspace"><span className="workspace-mark"><FaRegBuilding /></span><span><small>WORKSPACE</small><strong>Guest House</strong></span><BsChevronDown /></div>
        <div className="sidebar-section-label">MENU</div>
        <ul className="sidebar-list">
          {links.map(item => <li key={item.name}>
            <NavLink to={item.slug} end={item.name === 'Overview'} className={({ isActive }) => `sidebar-link ${item.name === menuName || (item.name === 'Overview' && isActive) ? 'active' : ''}`} onClick={() => { setMenuName(item.name); onNavigate() }}>
              <span className="sidebar-link-icon">{item.icon}</span><span>{item.name}</span>{item.name === 'Bookings' && <span className="nav-count">6</span>}
            </NavLink>
          </li>)}
          {navBar.filter(item => item.role.includes(userAPI.accessRole) && item.name !== 'Home').map((ele, index) => <li key={ele.id || index}>
            {ele.dropdown.length === 0 ? <NavLink to={ele.slug} className="sidebar-link" onClick={() => { setMenuName(ele.name); onNavigate() }}><span className="sidebar-link-icon">{ele.icon}</span><span>{ele.name}</span></NavLink> : <>
              <button className="sidebar-link sidebar-parent" onClick={() => toggleMenu(ele.id)}><span className="sidebar-link-icon">{ele.icon}</span><span>{ele.name}</span><BsChevronDown className={showMenu === ele.id ? 'chevron open' : 'chevron'} /></button>
              {showMenu === ele.id && <ul className="sidebar-submenu">{ele.dropdown.map((item, subIndex) => <li key={`${ele.id}-${subIndex}`}><NavLink to={item.slug} className="sidebar-link" onClick={() => { setMenuName(item.name); onNavigate() }}>{item.name}</NavLink></li>)}</ul>}
            </>}
          </li>)}
        </ul>
        <div className="sidebar-footer"><div className="sidebar-footer-mark">AG</div><div><strong>AIIMS Guwahati</strong><small>Guest house management</small></div></div>
      </aside>
    </>
  )
}

export default memo(SidebarComponent)
