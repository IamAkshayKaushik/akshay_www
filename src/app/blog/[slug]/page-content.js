"use client";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import AuthorBio from "@/components/AuthorBio";

export default function BlogPostContent({ source, frontmatter }) {
  return (
    <article className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {frontmatter.title}
          </h1>
          <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span>{new Date(frontmatter.date).toLocaleDateString()}</span>
            <span>&middot;</span>
            <span>{frontmatter.readingTime}</span>
          </div>
          <div className="mt-8">
            <div className="prose prose-lg dark:prose-invert">
              <MDXRemote {...source} />
            </div>
          </div>
          <div className="mt-12">
            <AuthorBio />
          </div>
          <div className="mt-8">
            <Link href="/blog">
              <span className="text-primary-600 hover:text-primary-700">
                &larr; Back to blog
              </span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
