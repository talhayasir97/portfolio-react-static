import { FaLaravel, FaReact, FaPython, FaGithub, FaWordpress, FaCode } from 'react-icons/fa'
import { SiPhp, SiReact, SiJavascript, SiFastapi, SiFlutter, SiMysql, SiShopify } from 'react-icons/si'

const skills = [
  ['Laravel', FaLaravel], ['PHP', SiPhp], ['React', FaReact], ['React Native', SiReact],
  ['JavaScript', SiJavascript], ['Python', FaPython], ['Django', FaCode], ['FastAPI', SiFastapi],
  ['Flutter', SiFlutter], ['OpenAI API', FaCode], ['MySQL', SiMysql], ['AWS', FaCode],
  ['Azure', FaCode], ['GitHub', FaGithub], ['WordPress', FaWordpress], ['Shopify', SiShopify],
].map(([name, icon]) => ({ name, icon, level: 85, color: '#49e5d2' }))

export const skillCategories = [{ title: 'Technologies', skills }]
export const allSkillIcons = skills
