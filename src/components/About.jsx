import { motion } from 'framer-motion'
import { education } from '../data/education'
import { experience } from '../data/experience'
import { profile } from '../data/profile'

function About() {
  return (
    <section id="about" className="py-24 px-4 bg-gray-50 dark:bg-gray-950 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4">
          About Me
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-16">
          {profile.bio}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <motion.h3 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-2xl font-bold text-blue-500 mb-8 flex items-center gap-2">
              🎓 Education
            </motion.h3>
            <div className="relative border-l-2 border-blue-500/30 pl-8 space-y-10">
              {education.map((item, index) => (
                <motion.div key={item.degree} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="relative">
                  <span className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-gray-50 dark:border-gray-950"></span>
                  <span className="text-xs font-semibold text-blue-500">{item.duration}</span>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mt-1">{item.degree}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{item.institute}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <motion.h3 initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-2xl font-bold text-blue-500 mb-8 flex items-center gap-2">
              💼 Experience
            </motion.h3>
            <div className="relative border-l-2 border-blue-500/30 pl-8 space-y-10">
              {experience.map((item, index) => (
                <motion.div key={item.role + item.company} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="relative">
                  <span className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-gray-50 dark:border-gray-950"></span>
                  <span className="text-xs font-semibold text-blue-500">{item.duration}</span>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mt-1">{item.role}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-0.5">{item.company} — {item.location}</p>
                  <ul className="mt-3 space-y-1.5">
                    {item.points.map((point, i) => (
                      <li key={i} className="text-gray-600 dark:text-gray-400 text-sm flex gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="text-center mt-16">
          <a href={profile.resumeUrl} download className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition">
            Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default About