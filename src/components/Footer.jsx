import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt, FaArrowUp } from 'react-icons/fa'
import { profile } from '../data/profile'

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-400 py-12 px-4 relative">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{profile.name}</h3>
          <p className="text-sm">{profile.label}</p>
        </div>

        <div className="flex gap-6">
          {profile.githubUrl && (
            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              <FaGithub className="text-xl" />
            </a>
          )}
          {profile.linkedinUrl && (
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              <FaLinkedin className="text-xl" />
            </a>
          )}
          {profile.email && (
            <a href={`mailto:${profile.email}`} className="hover:text-blue-400 transition">
              <FaEnvelope className="text-xl" />
            </a>
          )}
          {profile.phone && (
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="hover:text-blue-400 transition">
              <FaPhoneAlt className="text-xl" />
            </a>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-gray-800 mt-8 pt-6 text-center text-sm">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition"
      >
        <FaArrowUp />
      </button>
    </footer>
  )
}

export default Footer