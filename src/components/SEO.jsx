import { Helmet } from 'react-helmet-async'
import { profile } from '../data/profile'

function SEO() {
  const title = `${profile.name} — ${profile.tagline.split(',')[0]}`
  const description = profile.bio
  const siteUrl = 'https://talha-yasir.vercel.app'
  const imageUrl = `${siteUrl}${profile.profileImageUrl}`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="Software Engineer, Web App Development, Laravel Developer, MERN Stack Developer, AI Automation, E-commerce Development, Pakistan" />
      <meta name="author" content={profile.name} />

      {/* Open Graph (Facebook, LinkedIn, WhatsApp preview) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={siteUrl} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      <link rel="canonical" href={siteUrl} />
    </Helmet>
  )
}

export default SEO
