import { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa'
import { getServices, createService, updateService, deleteService } from '../../api/services'

const emptyForm = { title: '', description: '', iconKey: '', displayOrder: 0 }

function ManageServices() {
  const [services, setServices] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(true)

  const fetchServices = () => {
    getServices().then((res) => setServices(res.data)).finally(() => setLoading(false))
  }

  useEffect(() => { fetchServices() }, [])

  const openAddModal = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowModal(true)
  }

  const openEditModal = (service) => {
    setForm({
      title: service.title,
      description: service.description,
      iconKey: service.iconKey,
      displayOrder: service.displayOrder,
    })
    setEditingId(service.id)
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingId) {
      await updateService(editingId, form)
    } else {
      await createService(form)
    }
    setShowModal(false)
    fetchServices()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this service?')) return
    await deleteService(id)
    fetchServices()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Services</h1>
          <p className="text-gray-500">Manage the services you offer</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition"
        >
          <FaPlus /> Add Service
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-800/50 text-gray-400">
            <tr>
              <th className="text-left px-6 py-3 font-medium">Title</th>
              <th className="text-left px-6 py-3 font-medium">Description</th>
              <th className="text-left px-6 py-3 font-medium">Icon Key</th>
              <th className="text-right px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="text-center py-8 text-gray-500">Loading...</td></tr>
            ) : services.length === 0 ? (
              <tr><td colSpan="4" className="text-center py-8 text-gray-500">No services added yet</td></tr>
            ) : (
              services.map((service) => (
                <tr key={service.id} className="border-t border-gray-800">
                  <td className="px-6 py-4 text-white font-medium">{service.title}</td>
                  <td className="px-6 py-4 text-gray-400 max-w-xs truncate">{service.description}</td>
                  <td className="px-6 py-4 text-gray-500">{service.iconKey}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => openEditModal(service)} className="text-blue-400 hover:text-blue-300 mr-4">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(service.id)} className="text-red-400 hover:text-red-300">
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
              <h2 className="text-lg font-bold text-white">{editingId ? 'Edit Service' : 'Add Service'}</h2>
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
                  placeholder="e.g. Web Development"
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
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Icon Key <span className="text-gray-600">(react-icons name)</span>
                </label>
                <input
                  type="text" required value={form.iconKey}
                  onChange={(e) => setForm({ ...form, iconKey: e.target.value })}
                  placeholder="FaCode"
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
                {editingId ? 'Update Service' : 'Add Service'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageServices