import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
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

import AdminLayout from './admin/AdminLayout'
import Login from './admin/pages/Login'
import Dashboard from './admin/pages/Dashboard'
import ManageProjects from './admin/pages/ManageProjects'
import ManageSkills from './admin/pages/ManageSkills'
import ManageServices from './admin/pages/ManageServices'
import ManageExperience from './admin/pages/ManageExperience'
import ManageEducation from './admin/pages/ManageEducation'
import ManageTestimonials from './admin/pages/ManageTestimonials'
import ManageMessages from './admin/pages/ManageMessages'
import ManageProfile from './admin/pages/ManageProfile'
import ProtectedRoute from './admin/components/ProtectedRoute'
import ScrollProgressBar from './components/ScrollProgressBar'
import GithubStats from './components/GithubStats'

function PortfolioHome() {
  const [loading, setLoading] = useState(true)

  return (
    <>
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
            <About />
            <Testimonials />
            <Contact />
            <GithubStats />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function App() {
  return (
    <Routes>
      {/* Public portfolio */}
      <Route path="/" element={<PortfolioHome />} />

      {/* Admin login (public) */}
      <Route path="/admin/login" element={<Login />} />

      {/* Admin protected routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<ManageProjects />} />
        <Route path="skills" element={<ManageSkills />} />
        <Route path="services" element={<ManageServices />} />
        <Route path="experience" element={<ManageExperience />} />
        <Route path="education" element={<ManageEducation />} />
        <Route path="testimonials" element={<ManageTestimonials />} />
        <Route path="messages" element={<ManageMessages />} />
        <Route path="profile" element={<ManageProfile />} />
      </Route>
    </Routes>
  )
}

export default App