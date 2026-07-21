import { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa'
import { getEducation, createEducation, updateEducation, deleteEducation } from '../../api/services'

const emptyForm = { degree: '', institute: '', duration: '', displayOrder: 0 }

function ManageEducation() {
  const [items, setItems] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(true)

  const fetchItems = () => {
    getEducation().then((res) => setItems(res.data)).finally(() => setLoading(false))
  }

  useEffect(() => { fetchItems() }, [])

  const openAddModal = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowModal(true)
  }

  const openEditModal = (item) => {
    setForm({
      degree: item.degree,
      institute: item.institute,
      duration: item.duration,
      displayOrder: item.displayOrder,
    })
    setEditingId(item.id)
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingId) {
      await updateEducation(editingId, form)
    } else {
      await createEducation(form)
    }
    setShowModal(false)
    fetchItems()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this education entry?')) return
    await deleteEducation(id)
    fetchItems()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Education</h1>
          <p className="text-gray-500">Manage your education history</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition"
        >
          <FaPlus /> Add Entry
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-800/50 text-gray-400">
            <tr>
              <th className="text-left px-6 py-3 font-medium">Degree</th>
              <th className="text-left px-6 py-3 font-medium">Institute</th>
              <th className="text-left px-6 py-3 font-medium">Duration</th>
              <th className="text-right px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="text-center py-8 text-gray-500">Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan="4" className="text-center py-8 text-gray-500">No education entries yet</td></tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-t border-gray-800">
                  <td className="px-6 py-4 text-white font-medium">{item.degree}</td>
                  <td className="px-6 py-4 text-gray-400">{item.institute}</td>
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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-white">{editingId ? 'Edit Entry' : 'Add Entry'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Degree</label>
                <input
                  type="text" required value={form.degree}
                  onChange={(e) => setForm({ ...form, degree: e.target.value })}
                  placeholder="e.g. Bachelor of Computer Science (BSCS)"
                  className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Institute</label>
                <input
                  type="text" required value={form.institute}
                  onChange={(e) => setForm({ ...form, institute: e.target.value })}
                  placeholder="e.g. Superior University, Lahore"
                  className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Duration</label>
                <input
                  type="text" required value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  placeholder="e.g. 2020 – 2024"
                  className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
                />
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
                {editingId ? 'Update Entry' : 'Add Entry'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageEducation