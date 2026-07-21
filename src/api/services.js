import api from './axiosInstance'

// Public
export const getProfile = () => api.get('/profile')
export const getProjects = () => api.get('/projects')
export const getSkills = () => api.get('/skills')
export const getServices = () => api.get('/services')
export const getExperience = () => api.get('/experience')
export const getEducation = () => api.get('/education')
export const getTestimonials = () => api.get('/testimonials')
export const sendContactMessage = (data) => api.post('/contact', data)

// Auth
export const login = (data) => api.post('/auth/login', data)

// Admin - Profile
export const updateProfile = (data) => api.put('/profile', data)

// Admin - Projects
export const createProject = (data) => api.post('/projects', data)
export const updateProject = (id, data) => api.put(`/projects/${id}`, data)
export const deleteProject = (id) => api.delete(`/projects/${id}`)

// Admin - Skills
export const createSkill = (data) => api.post('/skills', data)
export const updateSkill = (id, data) => api.put(`/skills/${id}`, data)
export const deleteSkill = (id) => api.delete(`/skills/${id}`)

// Admin - Services
export const createService = (data) => api.post('/services', data)
export const updateService = (id, data) => api.put(`/services/${id}`, data)
export const deleteService = (id) => api.delete(`/services/${id}`)

// Admin - Experience
export const createExperience = (data) => api.post('/experience', data)
export const updateExperience = (id, data) => api.put(`/experience/${id}`, data)
export const deleteExperience = (id) => api.delete(`/experience/${id}`)

// Admin - Education
export const createEducation = (data) => api.post('/education', data)
export const updateEducation = (id, data) => api.put(`/education/${id}`, data)
export const deleteEducation = (id) => api.delete(`/education/${id}`)

// Admin - Testimonials
export const createTestimonial = (data) => api.post('/testimonials', data)
export const updateTestimonial = (id, data) => api.put(`/testimonials/${id}`, data)
export const deleteTestimonial = (id) => api.delete(`/testimonials/${id}`)

// Admin - Contact Messages
export const getMessages = () => api.get('/contact')
export const markMessageRead = (id) => api.put(`/contact/${id}/read`)
export const deleteMessage = (id) => api.delete(`/contact/${id}`)

export const uploadImage = (formData) => api.post('/upload/image', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
})