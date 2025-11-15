export default function Home() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white md:text-6xl">
          Full-Stack Developer
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 md:text-xl">
          I build modern, responsive, and performant web applications.
        </p>
        <div className="mt-8">
          <a
            href="/projects"
            className="rounded-md bg-primary-600 px-6 py-3 text-white hover:bg-primary-700"
          >
            View My Work
          </a>
        </div>
      </div>
    </section>
  );
}
