import fs from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import { format } from "date-fns";

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "content/blog");
  const filenames = fs.readdirSync(postsDirectory);

  const allTags = filenames.reduce((tags, filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    return [...tags, ...data.tags];
  }, []);

  const uniqueTags = [...new Set(allTags)];

  return uniqueTags.map((tag) => ({
    tag,
  }));
}

export default function TagPage({ params }) {
  const { tag } = params;
  const postsDirectory = path.join(process.cwd(), "content/blog");
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);
      return {
        slug: filename.replace(/\.mdx?$/, ""),
        ...data,
      };
    })
    .filter((post) => post.tags.includes(tag));

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Posts tagged with &quot;{tag}&quot;
        </h1>
        <div className="mt-8 space-y-8">
          {posts.map((post) => (
            <article key={post.slug}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {format(new Date(post.date), "MMMM d, yyyy")} by {post.author}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
