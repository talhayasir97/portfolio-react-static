import { FaWhatsapp } from 'react-icons/fa'
import { profile } from '../data/profile'

function WhatsAppButton() {
  return (
    <a href={profile.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-lg shadow-green-500/30 transition-transform hover:scale-110">
      <FaWhatsapp className="text-2xl" />
    </a>
  )
}

export default WhatsAppButton
