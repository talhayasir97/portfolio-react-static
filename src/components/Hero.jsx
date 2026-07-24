import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'
import HeroScene from './HeroScene'
import { profile } from '../data/profile'
import Counter from './Counter'

function Hero() {
  const sectionRef = useRef(null)

  const handleMouseMove = (e) => {
    const section = sectionRef.current
    if (!section) return
    const rect = section.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    section.style.setProperty('--x', `${x}px`)
    section.style.setProperty('--y', `${y}px`)
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen flex items-center px-4 md:px-10 relative overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-500 pt-24 pb-16"
      style={{
        backgroundImage:
          'radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(59,130,246,0.12), transparent 40%)',
      }}
    >
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 w-fit"
          >
            <span className={`w-2 h-2 rounded-full ${profile.isAvailable ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {profile.isAvailable ? 'Available for new projects' : 'Currently booked'}
            </span>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="block text-blue-500 dark:text-blue-400 text-sm tracking-[0.2em] font-medium"
          >
            {profile.label}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mt-3 mb-2 leading-tight"
          >
            Hi, I'm {profile.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-500 dark:text-blue-400 font-semibold mb-6 h-8"
          >
            <Typewriter
              words={profile.tagline.split(',').map((t) => t.trim())}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-md"
          >
            {profile.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59,130,246,0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition inline-block text-center"
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-gray-400 dark:border-gray-500 text-gray-900 dark:text-white px-6 py-3 rounded-full font-medium transition text-center"
            >
              Hire Me
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative flex justify-center mt-10 md:mt-0"
        >
          {/* 3D scene - hidden on mobile to avoid clutter/overflow */}
          <div className="absolute inset-0 scale-150 hidden md:block">
            <HeroScene />
          </div>

          <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600/30 via-purple-600/20 to-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl">
            {profile.profileImageUrl && (
              <img src={profile.profileImageUrl} alt={profile.name} className="w-full h-full object-cover" />
            )}
          </div>

          {/* Floating badge - top left */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-3 left-0 sm:-top-4 sm:-left-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg px-3 py-2 sm:px-4 sm:py-3 border border-gray-100 dark:border-gray-700"
          >
            <Counter value={profile.yearsExperience} suffix="+" className="text-lg sm:text-2xl font-bold text-blue-500" />
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Years Experience</p>
          </motion.div>

          {/* Floating badge - bottom right */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-3 right-0 sm:-bottom-4 sm:-right-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg px-3 py-2 sm:px-4 sm:py-3 border border-gray-100 dark:border-gray-700"
          >
            <Counter value={profile.projectsCount} suffix="+" className="text-lg sm:text-2xl font-bold text-blue-500" />
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Projects Delivered</p>
          </motion.div>

          {/* "Full Stack" circle badge - hidden on mobile, only shown from sm breakpoint */}
          <motion.div
            animate={{ x: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden sm:flex absolute top-1/2 -left-10 -translate-y-1/2 bg-blue-600 text-white rounded-full w-16 h-16 items-center justify-center text-xs font-semibold text-center shadow-lg"
          >
            Full Stack
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero