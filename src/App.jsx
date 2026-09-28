import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Services from './components/Services'
import Projects from './components/Projects'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgressBar from './components/ScrollProgressBar'
import SEO from './components/SEO'
import GithubStats from './components/GithubStats'
import HowItWorks from './components/HowItWorks'
import FAQ from './components/FAQ'
import WhatsAppButton from './components/WhatsAppButton'

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <>
        <SEO />
        {loading && <Preloader onFinish={() => setLoading(false)} />}
        {/* ... baaki same */}
      </>
      {loading && <Preloader onFinish={() => setLoading(false)} />}

      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <ScrollProgressBar />
            <Navbar />
            <Hero />
            <Skills />
            <Services />
            <Projects />
            <HowItWorks />
            <About />
            <Testimonials />
            <FAQ />
            <Contact />
            <GithubStats />
            <Footer />
            <WhatsAppButton />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
