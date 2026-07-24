import { motion } from 'framer-motion'
import { FaStar } from 'react-icons/fa'
import { testimonials } from '../data/testimonials'

function Testimonials() {
  const half = Math.ceil(testimonials.length / 2)
  const rowOne = testimonials.slice(0, half)
  const rowTwo = testimonials.slice(half)
  const loopRowOne = [...rowOne, ...rowOne, ...rowOne]
  const loopRowTwo = [...rowTwo, ...rowTwo, ...rowTwo]

  const TestimonialCard = ({ t, index }) => (
    <div key={`${t.id}-${index}`} className="w-80 flex-shrink-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar key={i} className={`text-sm ${i < t.rating ? 'text-yellow-400' : 'text-gray-200 dark:text-gray-700'}`} />
        ))}
      </div>
      <p className="text-gray-700 dark:text-gray-300 text-sm mb-6 min-h-[70px]">{t.quote}</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">{t.avatar}</div>
        <div>
          <p className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</p>
          <p className="text-gray-500 dark:text-gray-400 text-xs">{t.role}</p>
        </div>
      </div>
    </div>
  )

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-950 transition-colors duration-500 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
          What People Say
        </motion.h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-16">Feedback from clients and collaborators</p>
      </div>

      <div className="relative mb-6 mask-fade">
        <div className="flex gap-6 animate-marquee w-max">
          {loopRowOne.map((t, index) => <TestimonialCard t={t} index={index} key={`row1-${t.id}-${index}`} />)}
        </div>
      </div>

      <div className="relative mask-fade">
        <div className="flex gap-6 animate-marquee-reverse w-max">
          {loopRowTwo.map((t, index) => <TestimonialCard t={t} index={index} key={`row2-${t.id}-${index}`} />)}
        </div>
      </div>
    </section>
  )
}

export default Testimonials