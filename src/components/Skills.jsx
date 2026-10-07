import { useState } from 'react'
import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { skillCategories, allSkillIcons } from '../data/skills'
import * as FaIcons from 'react-icons/fa'
import * as SiIcons from 'react-icons/si'
import SectionHeading from './SectionHeading'

const iconMap = { ...FaIcons, ...SiIcons }

function SkillCard({ skill, index }) {
  const Icon = skill.icon || iconMap[skill.iconKey] || FaIcons.FaCode

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
    >
      <Tilt glareEnable glareMaxOpacity={0.2} glareColor="#3b82f6" scale={1.04} transitionSpeed={1200} tiltMaxAngleX={12} tiltMaxAngleY={12} className="rounded-2xl">
        <div className="relative rounded-2xl p-[2px] overflow-hidden group">
          {/* Rotating gradient border using the skill brand color */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-[-50%] z-0"
            style={{ background: `conic-gradient(from 0deg, transparent 0%, ${skill.color} 15%, transparent 30%)` }}
          ></motion.div>

          <div className="relative z-10 flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white dark:bg-gray-900 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" style={{ backgroundColor: skill.color }}></div>

            {/* Small badge for the main stack */}
            {skill.core && (
              <span className="absolute top-2 right-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
                Core
              </span>
            )}

            {/* Static ring instead of the old percentage progress ring */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="absolute w-full h-full" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="26" fill="none" stroke={skill.color} strokeOpacity="0.35" strokeWidth="3" />
              </svg>
              <Icon className="text-2xl relative z-10 group-hover:scale-110 transition-transform duration-300" style={{ color: skill.color }} />
            </div>

            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 text-center">{skill.name}</span>
          </div>
        </div>
      </Tilt>
    </motion.div>
  )
}

function Skills() {
  const [activeTab, setActiveTab] = useState('All')
  const categories = ['All', ...skillCategories.map((c) => c.title)]

  const filteredSkills =
    activeTab === 'All' ? allSkillIcons : skillCategories.find((c) => c.title === activeTab)?.skills || []

  return (
    <section id="skills" className="py-24 px-4 bg-gray-50 dark:bg-gray-950 transition-colors duration-500 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="Skills &" highlight="Technologies" subtitle="Core stack: Laravel, React, and Python, backed by the tools I use to ship and deploy" />

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

        <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredSkills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills