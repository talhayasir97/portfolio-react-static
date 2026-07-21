import { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa'
import { getSkills, createSkill, updateSkill, deleteSkill } from '../../api/services'

const emptyForm = { name: '', category: '', proficiencyLevel: 80, iconKey: '', color: '#3b82f6', displayOrder: 0 }

function ManageSkills() {
  const [skills, setSkills] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(true)

  const fetchSkills = () => {
    getSkills().then((res) => setSkills(res.data)).finally(() => setLoading(false))
  }

  useEffect(() => { fetchSkills() }, [])

  const openAddModal = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowModal(true)
  }

  const openEditModal = (skill) => {
    setForm({
      name: skill.name,
      category: skill.category,
      proficiencyLevel: skill.proficiencyLevel,
      iconKey: skill.iconKey,
      color: skill.color,
      displayOrder: skill.displayOrder,
    })
    setEditingId(skill.id)
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingId) {
      await updateSkill(editingId, form)
    } else {
      await createSkill(form)
    }
    setShowModal(false)
    fetchSkills()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return
    await deleteSkill(id)
    fetchSkills()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Skills</h1>
          <p className="text-gray-500">Manage your technology skills</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition"
        >
          <FaPlus /> Add Skill
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-800/50 text-gray-400">
            <tr>
              <th className="text-left px-6 py-3 font-medium">Name</th>
              <th className="text-left px-6 py-3 font-medium">Category</th>
              <th className="text-left px-6 py-3 font-medium">Level</th>
              <th className="text-left px-6 py-3 font-medium">Icon Key</th>
              <th className="text-right px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="text-center py-8 text-gray-500">Loading...</td></tr>
            ) : skills.length === 0 ? (
              <tr><td colSpan="5" className="text-center py-8 text-gray-500">No skills added yet</td></tr>
            ) : (
              skills.map((skill) => (
                <tr key={skill.id} className="border-t border-gray-800">
                  <td className="px-6 py-4 text-white font-medium flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: skill.color }}></span>
                    {skill.name}
                  </td>
                  <td className="px-6 py-4 text-gray-400">{skill.category}</td>
                  <td className="px-6 py-4 text-gray-400">{skill.proficiencyLevel}%</td>
                  <td className="px-6 py-4 text-gray-500">{skill.iconKey}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => openEditModal(skill)} className="text-blue-400 hover:text-blue-300 mr-4">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(skill.id)} className="text-red-400 hover:text-red-300">
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
              <h2 className="text-lg font-bold text-white">{editingId ? 'Edit Skill' : 'Add Skill'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Name</label>
                <input
                  type="text" required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Laravel"
                  className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Category</label>
                <input
                  type="text" required value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="e.g. Backend"
                  className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Level (%)</label>
                  <input
                    type="number" min="0" max="100" required value={form.proficiencyLevel}
                    onChange={(e) => setForm({ ...form, proficiencyLevel: Number(e.target.value) })}
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

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Icon Key <span className="text-gray-600">(react-icons name, e.g. FaLaravel)</span>
                </label>
                <input
                  type="text" required value={form.iconKey}
                  onChange={(e) => setForm({ ...form, iconKey: e.target.value })}
                  placeholder="FaLaravel"
                  className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Color</label>
                <input
                  type="color" value={form.color}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                  className="w-full h-10 rounded-lg bg-gray-800 border border-gray-700 cursor-pointer"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition mt-2"
              >
                {editingId ? 'Update Skill' : 'Add Skill'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageSkills