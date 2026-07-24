import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'
import { profile } from '../data/profile'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Skills', href: '#skills' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
]

function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [showOverlay, setShowOverlay] = useState(false)
  const [overlayPos, setOverlayPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.replace('#', ''))
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => sections.forEach((section) => observer.unobserve(section))
  }, [])

  const handleLinkClick = () => setIsOpen(false)

  const handleThemeToggle = (e) => {
    const x = (e.clientX / window.innerWidth) * 100
    const y = (e.clientY / window.innerHeight) * 100
    setOverlayPos({ x, y })
    setShowOverlay(true)
    toggleTheme()
    setTimeout(() => setShowOverlay(false), 700)
  }

  return (
    <>
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 40, opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="fixed rounded-full pointer-events-none z-[70]"
            style={{
              left: `${overlayPos.x}%`,
              top: `${overlayPos.y}%`,
              width: '20px',
              height: '20px',
              transform: 'translate(-50%, -50%)',
              border: `2px solid ${theme === 'dark' ? '#3b82f6' : '#a855f7'}`,
            }}
          />
        )}
      </AnimatePresence>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <a href="#home" className="text-xl font-bold text-gray-900 dark:text-white">
            {profile.name}
          </a>

          <div className="hidden md:flex items-center gap-8">
            <ul className="flex gap-1 relative">
              {navLinks.map((link) => {
                const id = link.href.replace('#', '')
                const isActive = activeSection === id
                return (
                  <li key={link.name} className="relative">
                    <a
                      href={link.href}
                      className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-blue-500 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <motion.div
                          layoutId="activeNavUnderline"
                          className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-blue-500 dark:bg-blue-400 rounded-full"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </a>
                  </li>
                )
              })}
            </ul>

            <button
              onClick={handleThemeToggle}
              className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:scale-110 transition"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={handleThemeToggle}
              className="w-9 h-9 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900 dark:text-white text-xl">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800"
            >
              <ul className="flex flex-col p-4 gap-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={handleLinkClick}
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}

export default Navbar