import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import ProjectPageContent from "./page-content";
import { Suspense } from "react";

async function getProjectData(slug) {
  const filePath = path.join(process.cwd(), "content/projects", `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const mdxSource = await serialize(content, { scope: data });
  return { source: mdxSource, frontmatter: data };
}

export default async function ProjectPage({ params }) {
  const { slug } = params;
  const { source, frontmatter } = await getProjectData(slug);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectPageContent source={source} frontmatter={frontmatter} />
    </Suspense>
  );
}
