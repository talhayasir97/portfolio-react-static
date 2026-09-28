import { motion } from 'framer-motion'
import { FaComments, FaClipboardList, FaCode, FaRocket } from 'react-icons/fa'
import { processSteps } from '../data/siteContent'

const iconMap = { comments: FaComments, plan: FaClipboardList, code: FaCode, launch: FaRocket }

function HowItWorks() {
  return (
    <section className="py-24 px-4 bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-xs font-semibold tracking-[0.3em] text-blue-500 mb-3">HOW IT WORKS</p>
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4">From idea to <span className="text-blue-500">launch</span></h2>
        <p className="text-center text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-14">A simple, transparent process designed to keep your project moving and your goals at the center.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {processSteps.map((step, index) => {
            const Icon = iconMap[step.icon]
            return (
              <motion.div key={step.number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
                <span className="text-sm font-bold text-blue-500">{step.number}</span>
                <div className="w-11 h-11 mt-4 mb-5 rounded-xl bg-blue-100 dark:bg-blue-500/10 text-blue-500 flex items-center justify-center"><Icon /></div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{step.text}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
