import fs from 'fs';
import { glob } from 'glob';
import matter from 'gray-matter';
import RSS from 'rss';

async function generateRss() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const posts = await glob('content/blog/*.mdx');

  const feed = new RSS({
    title: 'Your Name - Full-Stack Developer',
    description: 'The portfolio of a full-stack developer.',
    feed_url: `${siteUrl}/rss.xml`,
    site_url: siteUrl,
  });

  posts.forEach((post) => {
    const fileContents = fs.readFileSync(post, 'utf8');
    const { data } = matter(fileContents);
    feed.item({
      title: data.title,
      description: data.summary,
      url: `${siteUrl}/blog/${post.replace('content/blog/', '').replace('.mdx', '')}`,
      date: data.date,
      author: data.author,
    });
  });

  fs.writeFileSync('public/rss.xml', feed.xml());
}

generateRss();
