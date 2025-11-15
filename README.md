# Personal Portfolio Website

This is a personal portfolio website built with Next.js, Tailwind CSS, and MDX.

## Features

- **Modern Design:** A clean and modern design with a dark mode theme.
- **Blog:** A fully-featured blog powered by MDX, with support for tags, an author bio, and an RSS feed.
- **SEO Optimized:** Dynamic meta tags, Open Graph, Twitter cards, and a sitemap.
- **Responsive:** Fully responsive and mobile-friendly.
- **CI/CD:** A CI/CD pipeline using GitHub Actions to automate builds and tests.
- **Contact Form:** A functional contact form with a honeypot for spam protection.
- **Analytics:** Integration with Plausible Analytics.

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```
2. Navigate to the project directory:
   ```bash
   cd your-repo
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Create a `.env.local` file in the root of the project and add the following environment variables:
   ```bash
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
   ```

### Running the Development Server

To start the development server, run the following command:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To build the application for production, run the following command:

```bash
npm run build
```

This will create an optimized build of the application in the `.next` directory. It will also generate a `sitemap.xml` and `rss.xml` file in the `public` directory.

### Running in Production

To run the application in production, run the following command:

```bash
npm run start
```

## Content Editing

### Blog Posts

To create a new blog post, create a new `.mdx` file in the `content/blog` directory. The file should have the following frontmatter:

```mdx
---
title: "Your Blog Post Title"
date: "YYYY-MM-DD"
author: "Your Name"
tags: ["tag1", "tag2"]
summary: "A brief summary of your blog post."
---

Your blog post content here.
```

### Projects

To create a new project, create a new `.mdx` file in the `content/projects` directory. The file should have the following frontmatter:

```mdx
---
title: "Your Project Title"
summary: "A brief summary of your project."
techStack: ["tech1", "tech2"]
role: "Your Role"
links: {
  live: "#",
  github: "#",
}
gallery: [
  "/images/placeholder.jpg",
  "/images/placeholder.jpg",
]
---

Your project content here.
```

### Pages

To edit the content of the pages, you can modify the following files:

- **Home:** `src/app/page.js`
- **About:** `src/app/about/page.js`
- **Projects:** `src/app/projects/page.js`
- **Contact:** `src/app/contact/page.js`

## Deployment

This application is designed to be deployed on Vercel or Netlify. You can deploy it by connecting your GitHub repository to one of these platforms.

## Testing

To run the linter, run the following command:

```bash
npm run lint
```

To run the tests, run the following command:

```bash
npm run test
```
