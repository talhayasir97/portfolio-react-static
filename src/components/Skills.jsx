import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { getSkills } from '../api/services'
import * as FaIcons from 'react-icons/fa'
import * as SiIcons from 'react-icons/si'
import SectionHeading from './SectionHeading'

const iconMap = { ...FaIcons, ...SiIcons }

function SkillCard({ skill, index }) {
  const Icon = iconMap[skill.iconKey] || FaIcons.FaCode
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [animatedLevel, setAnimatedLevel] = useState(0)

  const radius = 26
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (animatedLevel / 100) * circumference

  useEffect(() => {
    if (!isInView) return
    const timeout = setTimeout(() => {
      setAnimatedLevel(skill.proficiencyLevel)
    }, index * 50)
    return () => clearTimeout(timeout)
  }, [isInView, skill.proficiencyLevel, index])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
    >
      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.2}
        glareColor="#3b82f6"
        scale={1.04}
        transitionSpeed={1200}
        tiltMaxAngleX={12}
        tiltMaxAngleY={12}
        className="rounded-2xl"
      >
        <div className="relative rounded-2xl p-[2px] overflow-hidden group">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-[-50%] z-0"
            style={{
              background: `conic-gradient(from 0deg, transparent 0%, ${skill.color} 15%, transparent 30%)`,
            }}
          ></motion.div>

          <div className="relative z-10 flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white dark:bg-gray-900 overflow-hidden">
            <div
              className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
              style={{ backgroundColor: skill.color }}
            ></div>

            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r={radius} fill="none" stroke="currentColor" className="text-gray-100 dark:text-gray-800" strokeWidth="3" />
                <circle
                  cx="32" cy="32" r={radius} fill="none" stroke={skill.color}
                  strokeWidth="3" strokeLinecap="round"
                  strokeDasharray={circumference} strokeDashoffset={offset}
                  style={{ transition: 'stroke-dashoffset 1.2s ease-out' }}
                />
              </svg>
              <Icon className="text-2xl relative z-10 group-hover:scale-110 transition-transform duration-300" style={{ color: skill.color }} />
            </div>

            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 text-center">
              {skill.name}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {animatedLevel}%
            </span>
          </div>
        </div>
      </Tilt>
    </motion.div>
  )
}

function Skills() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('All')

  useEffect(() => {
    getSkills()
      .then((res) => setSkills(res.data))
      .catch((err) => console.error('Failed to load skills:', err))
      .finally(() => setLoading(false))
  }, [])

  const categories = ['All', ...new Set(skills.map((s) => s.category))]
  const filteredSkills =
    activeTab === 'All' ? skills : skills.filter((s) => s.category === activeTab)

  if (loading) {
    return (
      <section id="skills" className="py-24 text-center text-gray-400">
        Loading skills...
      </section>
    )
  }

  return (
    <section id="skills" className="py-24 px-4 bg-gray-50 dark:bg-gray-950 transition-colors duration-500 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Skills &"
          highlight="Technologies"
          subtitle="Technologies I work with to build scalable applications"
        />

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
          {filteredSkills.map((skill, index) => (
            <SkillCard key={skill.id} skill={skill} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills