import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaRegCalendarAlt,
  FaGithub, FaLinkedin, FaFileAlt, FaCommentDots, FaPaperPlane,
} from 'react-icons/fa'
import { sendContactMessage, getProfile } from '../api/services'
import { generatePortfolioPdf } from '../utils/generatePdf'
import { getSkills, getExperience, getEducation, getProjects } from '../api/services'
import { FaFileDownload } from 'react-icons/fa'

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    getProfile().then((res) => setProfile(res.data)).catch(() => { })
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleExportPdf = async () => {
    const [skillsRes, expRes, eduRes, projRes] = await Promise.all([
      getSkills(), getExperience(), getEducation(), getProjects(),
    ])
    generatePortfolioPdf({
      profile,
      skills: skillsRes.data,
      experience: expRes.data,
      education: eduRes.data,
      projects: projRes.data,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      await sendContactMessage(formData)
      setStatus('sent')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (err) {
      setStatus('error')
    } finally {
      setSending(false)
      setTimeout(() => setStatus(''), 4000)
    }
  }

  const contactInfo = [
    { icon: FaEnvelope, label: 'Email', value: profile?.email || 'hello@talhayasir.dev', href: `mailto:${profile?.email || 'hello@talhayasir.dev'}` },
    { icon: FaPhoneAlt, label: 'Phone', value: profile?.phone || '+92 300 1234567', href: `tel:${profile?.phone || ''}` },
    { icon: FaMapMarkerAlt, label: 'Location', value: profile?.location || 'Lahore, Pakistan', href: '' },
  ]

  const socialLinks = [
    { icon: FaGithub, href: profile?.githubUrl || '#' },
    { icon: FaLinkedin, href: profile?.linkedinUrl || '#' },
    { icon: FaFileAlt, href: profile?.resumeUrl || '/resume.pdf' },
    { icon: FaCommentDots, href: profile?.whatsappUrl || '#' },
  ]

  const subjectOptions = ['Project Inquiry', 'Job Opportunity', 'Freelance Work', 'Collaboration', 'General Question']

  return (
    <section id="contact" className="py-24 px-4 bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4"
        >
          Let's Talk
        </motion.h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-14">
          Have a project in mind? Let's build something great together.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="bg-gray-50 dark:bg-gray-950 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Name</label>
                <input
                  type="text" name="name" value={formData.name} onChange={handleChange} required
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Phone <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="tel" name="phone" value={formData.phone} onChange={handleChange}
                  placeholder="+92 300 1234567"
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Email</label>
              <input
                type="email" name="email" value={formData.email} onChange={handleChange} required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Subject</label>
              <select
                name="subject" value={formData.subject} onChange={handleChange} required
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition appearance-none cursor-pointer"
              >
                <option value="" disabled>Select a subject</option>
                {subjectOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Message</label>
              <textarea
                name="message" value={formData.message} onChange={handleChange} required rows="5"
                placeholder="Tell me about your project..."
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 transition resize-none"
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={sending}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 disabled:opacity-60 text-white py-3.5 rounded-xl font-medium transition-all"
            >
              <FaPaperPlane className="text-sm" />
              {sending ? 'Sending...' : 'Send Message'}
            </motion.button>

            {status === 'sent' && (
              <p className="text-green-500 text-center text-sm">Message sent! I'll get back to you soon.</p>
            )}
            {status === 'error' && (
              <p className="text-red-500 text-center text-sm">Something went wrong. Please try again.</p>
            )}
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gray-50 dark:bg-gray-950 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 flex flex-col"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>

            <div className="space-y-5 mb-8">
              {contactInfo.map((item) => {
                const Icon = item.icon
                const content = (
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0">
                      <Icon />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.value}</p>
                    </div>
                  </div>
                )
                return item.href ? (
                  <a key={item.label} href={item.href} className="block hover:opacity-80 transition">{content}</a>
                ) : (
                  <div key={item.label}>{content}</div>
                )
              })}
            </div>

            {profile?.calendlyUrl && (
              <motion.a
                href={profile.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 w-full border border-gray-300 dark:border-gray-700 hover:border-blue-500 text-gray-900 dark:text-white py-3 rounded-xl font-medium transition mb-6"
              >
                <FaRegCalendarAlt />
                Schedule a Meeting
              </motion.a>
            )}

            <motion.button
              onClick={handleExportPdf}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 w-full border border-gray-300 dark:border-gray-700 hover:border-blue-500 text-gray-900 dark:text-white py-3 rounded-xl font-medium transition mb-3"
            >
              <FaFileDownload />
              Export Portfolio Summary (PDF)
            </motion.button>

            <div className="flex gap-3 mt-auto">
              {socialLinks.map((s, i) => {
                const Icon = s.icon
                return (
                  <a
                    key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-blue-500 hover:text-white text-gray-600 dark:text-gray-300 flex items-center justify-center transition-colors"
                  >
                    <Icon className="text-sm" />
                  </a>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact