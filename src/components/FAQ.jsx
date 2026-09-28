import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { faqs } from '../data/siteContent'

function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className="py-24 px-4 bg-gray-50 dark:bg-gray-950 transition-colors duration-500">
      <div className="max-w-3xl mx-auto">
        <p className="text-center text-xs font-semibold tracking-[0.3em] text-blue-500 mb-3">FAQ</p>
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4">Questions, <span className="text-blue-500">answered</span></h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-12">Everything you need to know before getting started.</p>
        <div className="space-y-3">
          {faqs.map((item, index) => (
            <div key={item.question} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
              <button onClick={() => setOpen(open === index ? -1 : index)} className="w-full flex items-center justify-between gap-4 text-left p-5 text-gray-900 dark:text-white font-semibold">
                {item.question}<FaChevronDown className={`text-blue-500 text-sm transition-transform ${open === index ? 'rotate-180' : ''}`} />
              </button>
              {open === index && <p className="px-5 pb-5 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{item.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
