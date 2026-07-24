import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaGithub, FaExternalLinkAlt } from 'react-icons/fa'


function ProjectModal({ project, onClose }) {
  if (!project) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[80] flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition z-10"
          >
            <FaTimes />
          </button>

          <div className="aspect-video bg-gradient-to-br from-blue-600/30 via-purple-600/20 to-gray-900 rounded-t-2xl overflow-hidden">
            {project.image && (
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            )}
          </div>

          <div className="p-8">
            <span className="text-xs font-semibold text-blue-500 tracking-wide">{project.category}</span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-1 mb-4">{project.title}</h2>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t) => (
                <span key={t} className="text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full">
                  {t}
                </span>
              ))}
            </div>

            {project.problem && (
              <div className="mb-5">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1.5">The Problem</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{project.problem}</p>
              </div>
            )}

            {project.solution && (
              <div className="mb-5">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1.5">The Solution</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{project.solution}</p>
              </div>
            )}

            {project.challenges && (
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1.5">Challenges</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{project.challenges}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 hover:border-blue-500 px-5 py-2.5 rounded-full transition-colors">
                  <FaGithub /> Source Code
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-full transition-colors">
                  <FaExternalLinkAlt /> Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ProjectModal