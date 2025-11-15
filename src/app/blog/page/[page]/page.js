import fs from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import { format } from "date-fns";

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "content/blog");
  const filenames = fs.readdirSync(postsDirectory);
  const postsPerPage = 5;
  const numPages = Math.ceil(filenames.length / postsPerPage);

  return Array.from({ length: numPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

export default function BlogPage({ params }) {
  const { page } = params;
  const postsDirectory = path.join(process.cwd(), "content/blog");
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    return {
      slug: filename.replace(/\.mdx?$/, ""),
      ...data,
    };
  });

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  const postsPerPage = 5;
  const numPages = Math.ceil(posts.length / postsPerPage);
  const currentPage = parseInt(page);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Blog
        </h1>
        <div className="mt-8 space-y-8">
          {paginatedPosts.map((post) => (
            <article key={post.slug}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {post.date &&
                  `${format(new Date(post.date), "MMMM d, yyyy")} by `}
                {post.author}
              </p>
              <div className="mt-4 flex items-center space-x-2">
                {post.category && (
                  <Link
                    href={`/blog/categories/${post.category}`}
                    className="rounded-full bg-secondary-100 px-3 py-1 text-sm font-semibold text-secondary-800 dark:bg-secondary-900 dark:text-secondary-200"
                  >
                    {post.category}
                  </Link>
                )}
                {post.tags &&
                  post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/tags/${tag}`}
                      className="rounded-full bg-primary-100 px-3 py-1 text-sm font-semibold text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                    >
                      {tag}
                    </Link>
                  ))}
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 flex justify-between">
          {currentPage > 1 && (
            <Link
              href={`/blog/page/${currentPage - 1}`}
              className="rounded-md bg-primary-600 px-6 py-3 text-white hover:bg-primary-700"
            >
              Previous
            </Link>
          )}
          {currentPage < numPages && (
            <Link
              href={`/blog/page/${currentPage + 1}`}
              className="rounded-md bg-primary-600 px-6 py-3 text-white hover:bg-primary-700"
            >
              Next
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
