import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        404 - Page Not Found
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
        The page you are looking for does not exist.
      </p>
      <div className="mt-8">
        <Link href="/" className="rounded-md bg-primary-600 px-6 py-3 text-white hover:bg-primary-700">
          Go back home
        </Link>
      </div>
    </div>
  )
}
