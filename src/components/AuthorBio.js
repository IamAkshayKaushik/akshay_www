export default function AuthorBio({ author }) {
  return (
    <div className="mt-8 rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
        About the Author
      </h3>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        This is a placeholder for the author&apos;s bio. You can edit this in{" "}
        <code>src/components/AuthorBio.js</code>.
      </p>
    </div>
  );
}
