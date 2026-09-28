import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaArrowRight } from 'react-icons/fa'
import { projects, categories } from '../data/projects'
import ProjectModal from './ProjectModal'

function ProjectRow({ project, index, onOpenModal }) {
  const isReversed = index % 2 !== 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`flex flex-col ${
        isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
      } items-center gap-10 md:gap-16 py-16 border-b border-gray-200 dark:border-gray-800 last:border-none`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="w-full md:w-1/2 group relative"
      >
        <div className="relative rounded-2xl overflow-hidden aspect-video bg-gradient-to-br from-blue-600/30 via-purple-600/20 to-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg">
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              onError={(e) => (e.target.style.display = 'none')}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          )}
          <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-500"></div>
          <span className="absolute top-4 left-4 text-xs font-semibold bg-black/60 backdrop-blur-sm text-blue-300 px-3 py-1 rounded-full">
            {project.category}
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: isReversed ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full md:w-1/2"
      >
        <span className="text-blue-500 text-sm font-semibold tracking-wide">
          0{index + 1} —
        </span>
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4 }}
              className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 hover:border-blue-500 px-5 py-2.5 rounded-full transition-colors"
            >
              <FaGithub /> Source Code
            </motion.a>
          )}
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4 }}
              className="flex items-center gap-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-full transition-colors"
            >
              Live Demo <FaArrowRight />
            </motion.a>
          )}
          <motion.button
            onClick={() => onOpenModal(project)}
            whileHover={{ x: 4 }}
            className="flex items-center gap-2 text-sm font-medium text-blue-500 hover:text-blue-600 px-5 py-2.5 rounded-full transition-colors"
          >
            View Case Study
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const filteredProjects =
    activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="projects" className="py-24 px-4 bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4"
        >
          Selected Work
        </motion.h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-10">
          Real-world products built with thoughtful design, clean engineering, and business goals in mind.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div>
          {filteredProjects.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              onOpenModal={setSelectedProject}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}

export default Projects
