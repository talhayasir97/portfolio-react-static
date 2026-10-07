import { FaLaravel, FaReact, FaPython, FaGithub, FaWordpress, FaAws, FaRobot, FaCloud } from 'react-icons/fa'
import {
  SiPhp,
  SiReact,
  SiJavascript,
  SiFastapi,
  SiFlutter,
  SiMysql,
  SiShopify,
  SiDjango,
} from 'react-icons/si'

// "core: true" marks the main stack that is highlighted in the UI
const skillCategories = [
  {
    title: 'Backend',
    skills: [
      { name: 'Laravel', icon: FaLaravel, color: '#FF2D20', core: true },
      { name: 'PHP', icon: SiPhp, color: '#777BB4' },
      { name: 'Python', icon: FaPython, color: '#3776AB', core: true },
      { name: 'Django', icon: SiDjango, color: '#44B78B' },
      { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'React', icon: FaReact, color: '#61DAFB', core: true },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'React Native', icon: SiReact, color: '#61DAFB' },
      { name: 'Flutter', icon: SiFlutter, color: '#02569B' },
    ],
  },
  {
    title: 'Cloud & Tools',
    skills: [
      { name: 'AWS', icon: FaAws, color: '#FF9900' },
      { name: 'Azure', icon: FaCloud, color: '#0078D4' },
      { name: 'GitHub', icon: FaGithub, color: '#6e7681' },
      { name: 'OpenAI API', icon: FaRobot, color: '#10A37F' },
      { name: 'WordPress', icon: FaWordpress, color: '#21759B' },
      { name: 'Shopify', icon: SiShopify, color: '#7AB55C' },
    ],
  },
]

// Core skills first, then the rest in their original order
const allSkillIcons = skillCategories
  .flatMap((cat) => cat.skills)
  .sort((a, b) => Number(!!b.core) - Number(!!a.core))

export { skillCategories, allSkillIcons }