import {
  FaLaravel, FaReact, FaPython, FaNodeJs, FaGitAlt, FaGithub, FaDocker, FaBootstrap, FaPhp,
} from 'react-icons/fa'
import {
  SiDotnet, SiJavascript, SiTypescript, SiTailwindcss,
  SiMysql, SiMongodb, SiExpress, SiNextdotjs, SiDjango, SiFastapi,
  SiCplusplus, SiPostman, SiFigma, SiVite, SiJquery, SiSqlite,
} from 'react-icons/si'

export const skillCategories = [
  {
    title: 'Backend',
    skills: [
      { name: 'Laravel', icon: FaLaravel, level: 90, color: '#FF2D20' },
      { name: 'PHP', icon: FaPhp, level: 88, color: '#777BB4' },
      { name: 'ASP.NET Core', icon: SiDotnet, level: 80, color: '#512BD4' },
      { name: 'Node.js', icon: FaNodeJs, level: 75, color: '#339933' },
      { name: 'Express.js', icon: SiExpress, level: 75, color: '#ffffff' },
      { name: 'Python', icon: FaPython, level: 75, color: '#3776AB' },
      { name: 'Django', icon: SiDjango, level: 60, color: '#092E20' },
      { name: 'FastAPI', icon: SiFastapi, level: 60, color: '#009688' },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'React', icon: FaReact, level: 85, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, level: 70, color: '#ffffff' },
      { name: 'JavaScript', icon: SiJavascript, level: 90, color: '#F7DF1E' },
      { name: 'TypeScript', icon: SiTypescript, level: 65, color: '#3178C6' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, level: 90, color: '#38BDF8' },
      { name: 'Bootstrap', icon: FaBootstrap, level: 85, color: '#7952B3' },
      { name: 'jQuery', icon: SiJquery, level: 80, color: '#0769AD' },
    ],
  },
  {
    title: 'Database',
    skills: [
      { name: 'MySQL', icon: SiMysql, level: 85, color: '#4479A1' },
      { name: 'MongoDB', icon: SiMongodb, level: 70, color: '#47A248' },
      { name: 'SQLite', icon: SiSqlite, level: 65, color: '#003B57' },
    ],
  },
  {
    title: 'Tools & DevOps',
    skills: [
      { name: 'Git', icon: FaGitAlt, level: 85, color: '#F05032' },
      { name: 'GitHub', icon: FaGithub, level: 85, color: '#ffffff' },
      { name: 'Docker', icon: FaDocker, level: 60, color: '#2496ED' },
      { name: 'Postman', icon: SiPostman, level: 80, color: '#FF6C37' },
      { name: 'Figma', icon: SiFigma, level: 70, color: '#F24E1E' },
      { name: 'Vite', icon: SiVite, level: 80, color: '#646CFF' },
    ],
  },
]

// Flat list used for the marquee strip
export const allSkillIcons = skillCategories.flatMap((cat) => cat.skills)