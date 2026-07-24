import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCopy, FaCheck } from 'react-icons/fa'

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="relative w-7 h-7 rounded-md flex items-center justify-center text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"
      title="Copy to clipboard"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            <FaCheck className="text-xs text-green-500" />
          </motion.span>
        ) : (
          <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            <FaCopy className="text-xs" />
          </motion.span>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-[10px] px-2 py-1 rounded-md whitespace-nowrap"
          >
            Copied!
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

export default CopyButton