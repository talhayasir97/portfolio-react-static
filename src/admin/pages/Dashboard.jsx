import { useEffect, useState } from 'react'
import { FaProjectDiagram, FaTools, FaCogs, FaEnvelope } from 'react-icons/fa'
import { getProjects, getSkills, getServices, getMessages } from '../../api/services'

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
        style={{ backgroundColor: `${color}20`, color }}
      >
        <Icon className="text-lg" />
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  )
}

function Dashboard() {
  const [stats, setStats] = useState({ projects: 0, skills: 0, services: 0, messages: 0 })

  useEffect(() => {
    Promise.all([getProjects(), getSkills(), getServices(), getMessages()])
      .then(([p, s, sv, m]) => {
        setStats({
          projects: p.data.length,
          skills: s.data.length,
          services: sv.data.length,
          messages: m.data.filter((msg) => !msg.isRead).length,
        })
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
      <p className="text-gray-500 mb-8">Overview of your portfolio content</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={FaProjectDiagram} label="Total Projects" value={stats.projects} color="#3b82f6" />
        <StatCard icon={FaTools} label="Total Skills" value={stats.skills} color="#22c55e" />
        <StatCard icon={FaCogs} label="Total Services" value={stats.services} color="#a855f7" />
        <StatCard icon={FaEnvelope} label="Unread Messages" value={stats.messages} color="#ef4444" />
      </div>
    </div>
  )
}

export default Dashboard