import { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaTimes, FaStar } from 'react-icons/fa'
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../../api/services'

const emptyForm = { name: '', role: '', quote: '', rating: 5, avatarInitials: '', displayOrder: 0 }

function ManageTestimonials() {
  const [items, setItems] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(true)

  const fetchItems = () => {
    getTestimonials().then((res) => setItems(res.data)).finally(() => setLoading(false))
  }

  useEffect(() => { fetchItems() }, [])

  const openAddModal = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowModal(true)
  }

  const openEditModal = (item) => {
    setForm({
      name: item.name,
      role: item.role,
      quote: item.quote,
      rating: item.rating,
      avatarInitials: item.avatarInitials,
      displayOrder: item.displayOrder,
    })
    setEditingId(item.id)
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingId) {
      await updateTestimonial(editingId, form)
    } else {
      await createTestimonial(form)
    }
    setShowModal(false)
    fetchItems()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return
    await deleteTestimonial(id)
    fetchItems()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Testimonials</h1>
          <p className="text-gray-500">Manage client testimonials</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition"
        >
          <FaPlus /> Add Testimonial
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-800/50 text-gray-400">
            <tr>
              <th className="text-left px-6 py-3 font-medium">Name</th>
              <th className="text-left px-6 py-3 font-medium">Role</th>
              <th className="text-left px-6 py-3 font-medium">Rating</th>
              <th className="text-left px-6 py-3 font-medium">Quote</th>
              <th className="text-right px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="text-center py-8 text-gray-500">Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan="5" className="text-center py-8 text-gray-500">No testimonials yet</td></tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-t border-gray-800">
                  <td className="px-6 py-4 text-white font-medium">{item.name}</td>
                  <td className="px-6 py-4 text-gray-400">{item.role}</td>
                  <td className="px-6 py-4 text-yellow-400 flex items-center gap-1">
                    <FaStar className="text-xs" /> {item.rating}
                  </td>
                  <td className="px-6 py-4 text-gray-400 max-w-xs truncate">{item.quote}</td>
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
              <h2 className="text-lg font-bold text-white">{editingId ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Name</label>
                  <input
                    type="text" required value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Avatar Initials</label>
                  <input
                    type="text" maxLength="3" required value={form.avatarInitials}
                    onChange={(e) => setForm({ ...form, avatarInitials: e.target.value.toUpperCase() })}
                    placeholder="AR"
                    className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Role</label>
                <input
                  type="text" required value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="e.g. Startup Founder"
                  className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Quote</label>
                <textarea
                  required rows="3" value={form.quote}
                  onChange={(e) => setForm({ ...form, quote: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Rating (1-5)</label>
                  <input
                    type="number" min="1" max="5" required value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
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
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition mt-2"
              >
                {editingId ? 'Update Testimonial' : 'Add Testimonial'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageTestimonials