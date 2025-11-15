const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata = {
  title: 'About Me',
  description: 'Learn more about my skills, experience, and passion for web development.',
  openGraph: {
    title: 'About Me',
    description: 'Learn more about my skills, experience, and passion for web development.',
    url: `${siteUrl}/about`,
  },
  twitter: {
    title: 'About Me',
    description: 'Learn more about my skills, experience, and passion for web development.',
  },
}

export default function About() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Your Name',
    jobTitle: 'Full-Stack Developer',
    url: `${siteUrl}/about`,
  }
 
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            About Me
          </h1>
          <div className="mt-8 space-y-4 text-lg text-gray-600 dark:text-gray-300">
            <p>
              I&apos;m a passionate full-stack developer with a focus on creating
              delightful user experiences. I have a strong background in both
              front-end and back-end development, and I&apos;m always eager to learn
              new technologies.
            </p>
            <p>
              When I&apos;m not coding, I enjoy spending time with my family, reading,
              and exploring the great outdoors.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
