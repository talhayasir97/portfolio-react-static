import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Preloader({ onFinish }) {
  const [progress, setProgress] = useState(0)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 30)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        setIsDone(true)
        onFinish()
      }, 400)
      return () => clearTimeout(timeout)
    }
  }, [progress, onFinish])

  const handleSkip = () => {
    setIsDone(true)
    onFinish()
  }

  const radius = 78
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white overflow-hidden px-6"
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          ></div>

          <div className="relative w-64 h-64 flex items-center justify-center z-10">
            <motion.svg
              className="absolute w-full h-full"
              viewBox="0 0 200 200"
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            >
              <circle
                cx="100"
                cy="100"
                r="95"
                fill="none"
                stroke="rgba(255,255,255,0.7)"
                strokeWidth="2"
                strokeDasharray="2 8"
                strokeLinecap="round"
              />
            </motion.svg>

            <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="3"
              />
              <motion.circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ filter: 'drop-shadow(0 0 8px rgba(59,130,246,0.9))' }}
              />
            </svg>

            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-32 h-32 rounded-full"
              style={{
                background: 'conic-gradient(from 180deg, #ec4899, #a855f7, #6366f1, #ec4899)',
                boxShadow: '0 0 60px rgba(168,85,247,0.6)',
              }}
            >
              <div className="absolute inset-[10px] rounded-full bg-black"></div>
            </motion.div>
          </div>

          <div className="flex items-center gap-4 mt-12 z-10 w-full max-w-md">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-purple-500/50"></div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-sm md:text-base tracking-[0.3em] font-light whitespace-nowrap"
            >
              SYSTEM INITIALIZING
            </motion.p>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-purple-500/50 to-purple-500/50"></div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs tracking-[0.2em] text-gray-500 mt-4 z-10"
          >
            INTELLIGENCE <span className="text-purple-500">&#9670;</span> DESIGN{' '}
            <span className="text-purple-500">&#9670;</span> INNOVATION
          </motion.p>

          <div className="w-full max-w-sm flex items-center gap-3 mt-10 z-10">
            <div className="flex-1 h-px bg-gray-800 relative">
              <motion.div
                className="absolute top-0 left-0 h-px bg-gradient-to-r from-purple-500 to-blue-500"
                style={{ width: `${progress}%` }}
              ></motion.div>
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.6)]"
                style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
              ></motion.div>
            </div>
            <span className="text-xs text-gray-400 w-10 text-right">{progress}%</span>
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={handleSkip}
            className="mt-10 z-10 text-xs tracking-[0.2em] border border-gray-700 hover:border-gray-400 text-gray-300 hover:text-white px-6 py-2.5 rounded-full transition-colors"
          >
            SKIP INTRO
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Preloader