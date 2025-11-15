import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import BlogPostContent from "./page-content";
import { Suspense } from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const METADATA = {
  creator: "Developer Name",
  siteUrl,
};

/**
 * Load and process MDX blog content.
 */
async function getPostData(slug) {
  // Build the MDX file path
  const filePath = path.join(process.cwd(), "content/blog", `${slug}.mdx`);

  // Read file contents
  const fileContents = fs.readFileSync(filePath, "utf8");

  // Extract frontmatter and raw MDX content
  const { data, content } = matter(fileContents);

  const { content: compiledContent } = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: false, // already handled manually by gray-matter
    },
  });

  return {
    source: compiledContent, // contains the MDX output for rendering
    frontmatter: data,
  };
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "content/blog"));

  const paths = files
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) => ({
      slug: filename.replace(".mdx", ""),
    }));

  return paths;
}

/**
 * Generate metadata for each blog page.
 * Uses frontmatter loaded from getPostData().
 */
export async function generateMetadata({ params }) {
  const { frontmatter } = await getPostData(params.slug);

  return {
    title: `${frontmatter.title} | ${METADATA.creator}`,
    description: frontmatter.summary,
    openGraph: {
      title: `${frontmatter.title} | ${METADATA.creator}`,
      description: frontmatter.summary,
      url: `${METADATA.siteUrl}/blog/${params.slug}`,
      type: "article",
      publishedTime: new Date(frontmatter.date).toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: `${frontmatter.title} | ${METADATA.creator}`,
      description: frontmatter.summary,
    },
  };
}

/**
 * Blog post page component.
 * Renders compiled MDX alongside its frontmatter.
 */
export default async function BlogPostPage({ params }) {
  const { slug } = params;

  // Fetch MDX + frontmatter for this post
  const { source, frontmatter } = await getPostData(slug);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* Forward the compiled MDX + metadata to your content component */}
      <BlogPostContent source={source} frontmatter={frontmatter} />
    </Suspense>
  );
}
