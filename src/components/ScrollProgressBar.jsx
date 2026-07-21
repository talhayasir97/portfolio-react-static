import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(pct)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-transparent">
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export default ScrollProgressBar