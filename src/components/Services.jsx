import { motion } from 'framer-motion'
import { services } from '../data/services'

function Services() {
  return (
    <section id="services" className="py-24 px-4 bg-gray-50 dark:bg-gray-950 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center text-xs font-semibold tracking-[0.3em] text-blue-500 mb-3">
          SERVICES
        </motion.p>

        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4">
          What I <span className="text-blue-500">deliver</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-center text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-16">
          From concept to deployment — full stack services that turn ideas into reliable, scalable products.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
                whileHover={{ y: -4 }}
                className="group p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-500 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                  <Icon className="text-lg" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{service.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services