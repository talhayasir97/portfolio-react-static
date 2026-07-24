import jsPDF from 'jspdf'
import { profile } from '../data/profile'
import { skillCategories } from '../data/skills'
import { experience } from '../data/experience'
import { education } from '../data/education'
import { projects } from '../data/projects'

export function generatePortfolioPdf() {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 15
  let y = 20

  const addLine = (text, size = 10, style = 'normal', color = [50, 50, 50]) => {
    doc.setFontSize(size)
    doc.setFont('helvetica', style)
    doc.setTextColor(...color)
    const lines = doc.splitTextToSize(text, pageWidth - margin * 2)
    doc.text(lines, margin, y)
    y += lines.length * (size / 2.2) + 3
  }

  const checkPageBreak = () => {
    if (y > 270) {
      doc.addPage()
      y = 20
    }
  }

  // Header
  doc.setFillColor(37, 99, 235)
  doc.rect(0, 0, pageWidth, 35, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text(profile.name, margin, 18)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text(profile.tagline.split(',')[0] || '', margin, 27)

  y = 45
  doc.setTextColor(50, 50, 50)

  const contact = [profile.email, profile.phone, profile.location].filter(Boolean).join('  |  ')
  if (contact) {
    addLine(contact, 9, 'normal', [100, 100, 100])
    y += 3
  }

  if (profile.bio) {
    addLine('About', 13, 'bold', [37, 99, 235])
    addLine(profile.bio, 10)
    y += 3
  }

  checkPageBreak()
  if (experience?.length) {
    addLine('Experience', 13, 'bold', [37, 99, 235])
    experience.forEach((exp) => {
      checkPageBreak()
      addLine(`${exp.role} — ${exp.company} (${exp.duration})`, 11, 'bold')
      exp.points?.forEach((point) => {
        checkPageBreak()
        addLine(`• ${point}`, 9)
      })
      y += 2
    })
  }

  checkPageBreak()
  if (education?.length) {
    addLine('Education', 13, 'bold', [37, 99, 235])
    education.forEach((edu) => {
      checkPageBreak()
      addLine(`${edu.degree} — ${edu.institute} (${edu.duration})`, 10)
    })
    y += 3
  }

  checkPageBreak()
  const allSkills = skillCategories.flatMap((cat) => cat.skills)
  if (allSkills?.length) {
    addLine('Skills', 13, 'bold', [37, 99, 235])
    addLine(allSkills.map((s) => s.name).join(', '), 10)
    y += 3
  }

  checkPageBreak()
  if (projects?.length) {
    addLine('Projects', 13, 'bold', [37, 99, 235])
    projects.forEach((proj) => {
      checkPageBreak()
      addLine(proj.title, 11, 'bold')
      addLine(proj.description, 9)
      y += 2
    })
  }

  doc.save(`${profile.name}-Summary.pdf`)
}