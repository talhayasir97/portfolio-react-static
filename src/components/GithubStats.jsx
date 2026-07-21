import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaCodeBranch, FaStar, FaUsers } from 'react-icons/fa'
import { getProfile } from '../api/services'

function extractUsername(githubUrl) {
  if (!githubUrl) return null
  const match = githubUrl.match(/github\.com\/([^/]+)/)
  return match ? match[1] : null
}

function GithubStats() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProfile().then(async (res) => {
      const username = extractUsername(res.data.githubUrl)
      if (!username) {
        setLoading(false)
        return
      }
      try {
        const userRes = await fetch(`https://api.github.com/users/${username}`)
        const userData = await userRes.json()

        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
        const reposData = await reposRes.json()

        const totalStars = Array.isArray(reposData)
          ? reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0)
          : 0

        setStats({
          username,
          repos: userData.public_repos || 0,
          followers: userData.followers || 0,
          stars: totalStars,
          avatar: userData.avatar_url,
        })
      } catch (err) {
        console.error('Failed to load GitHub stats:', err)
      } finally {
        setLoading(false)
      }
    })
  }, [])

  if (loading || !stats) return null

  const items = [
    { icon: FaCodeBranch, label: 'Public Repos', value: stats.repos },
    { icon: FaStar, label: 'Total Stars', value: stats.stars },
    { icon: FaUsers, label: 'Followers', value: stats.followers },
  ]

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <FaGithub className="text-2xl text-gray-900 dark:text-white" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              GitHub Activity — @{stats.username}
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {items.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="text-center p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                  <Icon className="text-blue-500 text-xl mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{item.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.label}</p>
                </div>
              )
            })}
          </div>

          <img
            src={`https://ghchart.rshah.org/3b82f6/${stats.username}`}
            alt="GitHub contribution chart"
            className="w-full rounded-lg"
          />
        </motion.div>
      </div>
    </section>
  )
}

export default GithubStats