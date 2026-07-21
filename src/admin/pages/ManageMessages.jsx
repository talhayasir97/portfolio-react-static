import { useState, useEffect } from 'react'
import { FaTrash, FaEnvelopeOpen, FaEnvelope as FaEnvelopeIcon } from 'react-icons/fa'
import { getMessages, markMessageRead, deleteMessage } from '../../api/services'

function ManageMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchMessages = () => {
    getMessages().then((res) => setMessages(res.data)).finally(() => setLoading(false))
  }

  useEffect(() => { fetchMessages() }, [])

  const handleMarkRead = async (id) => {
    await markMessageRead(id)
    fetchMessages()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return
    await deleteMessage(id)
    fetchMessages()
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Messages</h1>
        <p className="text-gray-500">Contact form submissions from your portfolio</p>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : messages.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center text-gray-500">
          No messages yet
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-gray-900 border rounded-2xl p-6 ${
                msg.isRead ? 'border-gray-800' : 'border-blue-500/50'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    {msg.name}
                    {!msg.isRead && (
                      <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full">NEW</span>
                    )}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {msg.email} {msg.phone && `• ${msg.phone}`}
                  </p>
                  {msg.subject && (
                    <p className="text-xs text-blue-400 mt-1 font-medium">{msg.subject}</p>
                  )}
                </div>
                <div className="flex gap-3">
                  {!msg.isRead && (
                    <button
                      onClick={() => handleMarkRead(msg.id)}
                      title="Mark as read"
                      className="text-green-400 hover:text-green-300"
                    >
                      <FaEnvelopeOpen />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(msg.id)}
                    title="Delete"
                    className="text-red-400 hover:text-red-300"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{msg.message}</p>
              <p className="text-xs text-gray-600 mt-3">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ManageMessages