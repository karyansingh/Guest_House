import { BsJustify } from 'react-icons/bs'
import { FaRegBuilding } from 'react-icons/fa'

function HeaderComponent({ onMenuClick }) {
  return (
    <header className="header">
      <button className="menu-icon" onClick={onMenuClick} aria-label="Toggle navigation"><BsJustify /></button>
      <div className="header-identity"><span className="header-seal"><FaRegBuilding /></span><div className="header-left"><strong>All India Institute of Medical Sciences</strong><span>Guwahati <i /> Guest House Management</span></div></div>
      <div className="header-tag">AIIMS <span>GUWAHATI</span></div>
    </header>
  )
}

export default HeaderComponent
