import { motion } from 'framer-motion'

function SectionHeading({ eyebrow, title, highlight, subtitle }) {
  return (
    <div className="text-center mb-14">
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold tracking-[0.3em] text-blue-500 mb-3"
        >
          {eyebrow}
        </motion.p>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative inline-block text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
      >
        {title} {highlight && <span className="text-blue-500">{highlight}</span>}

        {/* Animated underline draw */}
        <svg
          className="absolute left-0 -bottom-2 w-full h-3 overflow-visible"
          viewBox="0 0 200 12"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M2 8 Q 50 2, 100 6 T 198 6"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeInOut' }}
          />
        </svg>
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto mt-6"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

export default SectionHeading