import { useState, useEffect } from 'react'
import { FaSave, FaUpload } from 'react-icons/fa'
import { getProfile, updateProfile, uploadImage } from '../../api/services'

const emptyForm = {
  name: '', label: '', tagline: '', bio: '', profileImageUrl: '', resumeUrl: '',
  yearsExperience: 0, projectsCount: 0, email: '', phone: '', location: '',
  githubUrl: '', linkedinUrl: '', whatsappUrl: '', calendlyUrl: '', isAvailable: true,
}

function ManageProfile() {
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [uploadingResume, setUploadingResume] = useState(false)

  useEffect(() => {
    getProfile()
      .then((res) => setForm({ ...emptyForm, ...res.data }))
      .catch(() => { }) // profile might not exist yet, that's fine
      .finally(() => setLoading(false))
  }, [])

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploadingResume(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await uploadImage(formData) // same upload endpoint, works for any file type we allow
      setForm((prev) => ({ ...prev, resumeUrl: res.data.url }))
    } catch (err) {
      alert('Resume upload failed')
    } finally {
      setUploadingResume(false)
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await uploadImage(formData)
      setForm((prev) => ({ ...prev, profileImageUrl: res.data.url }))
    } catch (err) {
      alert('Image upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateProfile(form)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-gray-500">Loading...</p>

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Profile</h1>
        <p className="text-gray-500">Manage your personal info shown on the portfolio</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-2xl space-y-5">
        <div className="flex items-center gap-4">
          {form.profileImageUrl && (
            <img src={form.profileImageUrl} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
          )}
          <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 text-sm cursor-pointer hover:bg-gray-700 transition">
            <FaUpload /> {uploading ? 'Uploading...' : 'Change Photo'}
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Name</label>
            <input
              type="text" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Label (small text above name)</label>
            <input
              type="text" value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
              placeholder="THE DEVELOPER"
              className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Tagline</label>
            <input
              type="text" value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              placeholder="Full Stack Developer"
              className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Bio</label>
          <textarea
            rows="3" value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
          ></textarea>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Resume / CV</label>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 text-sm cursor-pointer hover:bg-gray-700 transition">
              <FaUpload /> {uploadingResume ? 'Uploading...' : 'Choose PDF'}
              <input type="file" accept="application/pdf" onChange={handleResumeUpload} className="hidden" />
            </label>
            {form.resumeUrl && (
              <a
                href={form.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 text-sm hover:underline"
              >
                View current CV
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Years Experience</label>
            <input
              type="number" value={form.yearsExperience}
              onChange={(e) => setForm({ ...form, yearsExperience: Number(e.target.value) })}
              className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Projects Count</label>
            <input
              type="number" value={form.projectsCount}
              onChange={(e) => setForm({ ...form, projectsCount: Number(e.target.value) })}
              className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Email</label>
            <input
              type="email" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Phone</label>
            <input
              type="text" value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Location</label>
          <input
            type="text" value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="Lahore, Pakistan"
            className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">GitHub URL</label>
            <input
              type="text" value={form.githubUrl}
              onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">LinkedIn URL</label>
            <input
              type="text" value={form.linkedinUrl}
              onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">WhatsApp URL</label>
            <input
              type="text" value={form.whatsappUrl}
              onChange={(e) => setForm({ ...form, whatsappUrl: e.target.value })}
              placeholder="https://wa.me/923001234567"
              className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Calendly URL</label>
            <input
              type="text" value={form.calendlyUrl}
              onChange={(e) => setForm({ ...form, calendlyUrl: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <label className="flex items-center gap-3 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3">
            <input
              type="checkbox" checked={form.isAvailable}
              onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-300">Available for new projects</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition"
        >
          <FaSave /> {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Profile'}
        </button>
      </form >
    </div >
  )
}

export default ManageProfile