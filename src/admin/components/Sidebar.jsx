import { NavLink } from 'react-router-dom'
import {
  FaTachometerAlt, FaProjectDiagram, FaTools, FaCogs, FaBriefcase,
  FaGraduationCap, FaStar, FaEnvelope, FaUserCircle, FaSignOutAlt,
} from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { name: 'Dashboard', to: '/admin', icon: FaTachometerAlt, end: true },
  { name: 'Projects', to: '/admin/projects', icon: FaProjectDiagram },
  { name: 'Skills', to: '/admin/skills', icon: FaTools },
  { name: 'Services', to: '/admin/services', icon: FaCogs },
  { name: 'Experience', to: '/admin/experience', icon: FaBriefcase },
  { name: 'Education', to: '/admin/education', icon: FaGraduationCap },
  { name: 'Testimonials', to: '/admin/testimonials', icon: FaStar },
  { name: 'Messages', to: '/admin/messages', icon: FaEnvelope },
  { name: 'Profile', to: '/admin/profile', icon: FaUserCircle },
]

function Sidebar() {
  const { logoutAdmin } = useAuth()

  return (
    <aside className="w-64 min-h-screen bg-gray-900 border-r border-gray-800 flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-lg font-bold text-white">Portfolio Admin</h1>
        <p className="text-xs text-gray-500 mt-1">Talha Yasir</p>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.name}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <Icon className="text-base" />
              {item.name}
            </NavLink>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={logoutAdmin}
          className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar