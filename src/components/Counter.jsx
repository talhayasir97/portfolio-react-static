import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function Counter({ value, suffix = '', duration = 1.5, className = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!isInView) return

    let startTime = null
    const target = Number(value) || 0

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }

    requestAnimationFrame(step)
  }, [isInView, value, duration])

  return (
    <motion.span ref={ref} className={className}>
      {count}{suffix}
    </motion.span>
  )
}

export default Counter