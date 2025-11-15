import fs from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata = {
  title: 'My Projects',
  description: 'A collection of my work, showcasing my skills in web development.',
  openGraph: {
    title: 'My Projects',
    description: 'A collection of my work, showcasing my skills in web development.',
    url: `${siteUrl}/projects`,
  },
  twitter: {
    title: 'My Projects',
    description: 'A collection of my work, showcasing my skills in web development.',
  },
}

export default function Projects() {
  const projectsDirectory = path.join(process.cwd(), "content/projects");
  const filenames = fs.readdirSync(projectsDirectory);

  const projects = filenames.map((filename) => {
    const filePath = path.join(projectsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    return {
      slug: filename.replace(/\.mdx?$/, ""),
      ...data,
    };
  });

  projects.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          My Projects
        </h1>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {project.title}
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {project.summary}
                </p>
                <div className="mt-4">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    View Case Study
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
