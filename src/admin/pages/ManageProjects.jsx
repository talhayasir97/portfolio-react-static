import { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaTimes, FaUpload } from 'react-icons/fa'
import { getProjects, createProject, updateProject, deleteProject, uploadImage } from '../../api/services'

const emptyForm = {
  title: '', category: '', description: '', imageUrl: '',
  githubUrl: '', demoUrl: '', techStack: '', displayOrder: 0, isFeatured: true,
}

function ManageProjects() {
  const [projects, setProjects] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  const fetchProjects = () => {
    getProjects().then((res) => setProjects(res.data)).finally(() => setLoading(false))
  }

  useEffect(() => { fetchProjects() }, [])

  const openAddModal = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowModal(true)
  }

  const openEditModal = (project) => {
    setForm({
      title: project.title,
      category: project.category,
      description: project.description,
      imageUrl: project.imageUrl || '',
      githubUrl: project.githubUrl || '',
      demoUrl: project.demoUrl || '',
      techStack: project.techStack,
      displayOrder: project.displayOrder,
      isFeatured: project.isFeatured,
    })
    setEditingId(project.id)
    setShowModal(true)
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await uploadImage(formData)
      setForm((prev) => ({ ...prev, imageUrl: res.data.url }))
    } catch (err) {
      alert('Image upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingId) {
      await updateProject(editingId, form)
    } else {
      await createProject(form)
    }
    setShowModal(false)
    fetchProjects()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return
    await deleteProject(id)
    fetchProjects()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Projects</h1>
          <p className="text-gray-500">Manage your portfolio projects</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition"
        >
          <FaPlus /> Add Project
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-800/50 text-gray-400">
            <tr>
              <th className="text-left px-6 py-3 font-medium">Image</th>
              <th className="text-left px-6 py-3 font-medium">Title</th>
              <th className="text-left px-6 py-3 font-medium">Category</th>
              <th className="text-right px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="text-center py-8 text-gray-500">Loading...</td></tr>
            ) : projects.length === 0 ? (
              <tr><td colSpan="4" className="text-center py-8 text-gray-500">No projects added yet</td></tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id} className="border-t border-gray-800">
                  <td className="px-6 py-4">
                    {project.imageUrl ? (
                      <img src={project.imageUrl} alt={project.title} className="w-14 h-10 object-cover rounded-lg" />
                    ) : (
                      <div className="w-14 h-10 rounded-lg bg-gray-800"></div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-white font-medium">{project.title}</td>
                  <td className="px-6 py-4 text-gray-400">{project.category}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => openEditModal(project)} className="text-blue-400 hover:text-blue-300 mr-4">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(project.id)} className="text-red-400 hover:text-red-300">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg p-6 my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-white">{editingId ? 'Edit Project' : 'Add Project'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Title</label>
                <input
                  type="text" required value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Category</label>
                <input
                  type="text" required value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="e.g. Laravel"
                  className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Description</label>
                <textarea
                  required rows="3" value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Project Image</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 text-sm cursor-pointer hover:bg-gray-700 transition">
                    <FaUpload /> {uploading ? 'Uploading...' : 'Choose Image'}
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                  {form.imageUrl && (
                    <img src={form.imageUrl} alt="Preview" className="w-14 h-10 object-cover rounded-lg" />
                  )}
                </div>
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
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Demo URL</label>
                  <input
                    type="text" value={form.demoUrl}
                    onChange={(e) => setForm({ ...form, demoUrl: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Tech Stack <span className="text-gray-600">(comma separated)</span>
                </label>
                <input
                  type="text" required value={form.techStack}
                  onChange={(e) => setForm({ ...form, techStack: e.target.value })}
                  placeholder="Laravel, MySQL, Tailwind CSS"
                  className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 items-end">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Order</label>
                  <input
                    type="number" value={form.displayOrder}
                    onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <label className="flex items-center gap-2 text-sm text-gray-300 mb-2.5">
                  <input
                    type="checkbox" checked={form.isFeatured}
                    onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                    className="w-4 h-4"
                  />
                  Featured
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition mt-2"
              >
                {editingId ? 'Update Project' : 'Add Project'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageProjects