import { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa'
import { getExperience, createExperience, updateExperience, deleteExperience } from '../../api/services'

const emptyForm = { role: '', company: '', location: '', duration: '', points: [''], displayOrder: 0 }

function ManageExperience() {
  const [items, setItems] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(true)

  const fetchItems = () => {
    getExperience().then((res) => setItems(res.data)).finally(() => setLoading(false))
  }

  useEffect(() => { fetchItems() }, [])

  const openAddModal = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowModal(true)
  }

  const openEditModal = (item) => {
    setForm({
      role: item.role,
      company: item.company,
      location: item.location || '',
      duration: item.duration,
      points: item.points.length ? item.points : [''],
      displayOrder: item.displayOrder,
    })
    setEditingId(item.id)
    setShowModal(true)
  }

  const updatePoint = (index, value) => {
    const newPoints = [...form.points]
    newPoints[index] = value
    setForm({ ...form, points: newPoints })
  }

  const addPoint = () => setForm({ ...form, points: [...form.points, ''] })

  const removePoint = (index) => {
    setForm({ ...form, points: form.points.filter((_, i) => i !== index) })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const cleanedForm = { ...form, points: form.points.filter((p) => p.trim() !== '') }

    if (editingId) {
      await updateExperience(editingId, cleanedForm)
    } else {
      await createExperience(cleanedForm)
    }
    setShowModal(false)
    fetchItems()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this experience entry?')) return
    await deleteExperience(id)
    fetchItems()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Experience</h1>
          <p className="text-gray-500">Manage your work experience</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition"
        >
          <FaPlus /> Add Experience
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-800/50 text-gray-400">
            <tr>
              <th className="text-left px-6 py-3 font-medium">Role</th>
              <th className="text-left px-6 py-3 font-medium">Company</th>
              <th className="text-left px-6 py-3 font-medium">Duration</th>
              <th className="text-right px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="text-center py-8 text-gray-500">Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan="4" className="text-center py-8 text-gray-500">No experience entries yet</td></tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-t border-gray-800">
                  <td className="px-6 py-4 text-white font-medium">{item.role}</td>
                  <td className="px-6 py-4 text-gray-400">{item.company}</td>
                  <td className="px-6 py-4 text-gray-400">{item.duration}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => openEditModal(item)} className="text-blue-400 hover:text-blue-300 mr-4">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-300">
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
              <h2 className="text-lg font-bold text-white">{editingId ? 'Edit Experience' : 'Add Experience'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Role</label>
                  <input
                    type="text" required value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Company</label>
                  <input
                    type="text" required value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Location</label>
                  <input
                    type="text" value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="Lahore, Pakistan"
                    className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Duration</label>
                  <input
                    type="text" required value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    placeholder="2023 – 2024"
                    className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Bullet Points</label>
                <div className="space-y-2">
                  {form.points.map((point, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text" value={point}
                        onChange={(e) => updatePoint(index, e.target.value)}
                        placeholder="Describe a responsibility or achievement..."
                        className="flex-1 px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
                      />
                      {form.points.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePoint(index)}
                          className="text-red-400 hover:text-red-300 px-2"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addPoint}
                  className="text-blue-400 hover:text-blue-300 text-xs font-medium mt-2 flex items-center gap-1"
                >
                  <FaPlus className="text-[10px]" /> Add point
                </button>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Order</label>
                <input
                  type="number" value={form.displayOrder}
                  onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition mt-2"
              >
                {editingId ? 'Update Experience' : 'Add Experience'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageExperience