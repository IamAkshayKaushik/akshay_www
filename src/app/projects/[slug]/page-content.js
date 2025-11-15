"use client";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";

export default function ProjectPageContent({ source, frontmatter }) {
  return (
    <article className="py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {frontmatter.title}
        </h1>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="prose prose-lg dark:prose-invert">
              <MDXRemote {...source} />
            </div>
          </div>
          <div>
            <div className="rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Project Details
              </h2>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Tech Stack
                </h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {frontmatter.techStack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full bg-primary-100 px-3 py-1 text-sm font-semibold text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  My Role
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {frontmatter.role}
                </p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Links
                </h3>
                <ul className="mt-2 space-y-2">
                  <li>
                    <a
                      href={frontmatter.links.live}
                      className="text-primary-600 hover:text-primary-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Site
                    </a>
                  </li>
                  <li>
                    <a
                      href={frontmatter.links.github}
                      className="text-primary-600 hover:text-primary-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gallery
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2">
            {frontmatter.gallery.map((image, index) => (
              <div key={index} className="relative h-64">
                <Image
                  src={image}
                  alt={`${frontmatter.title} screenshot ${index + 1}`}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
