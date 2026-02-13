import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900">
      <div className="text-center px-6">
        <h1 className="text-7xl font-bold text-primary-400 mb-4">404</h1>
        <p className="text-xl text-neutral-300 mb-8">This page doesn't exist.</p>
        <Link
          href="/"
          className="inline-flex items-center space-x-2 btn-primary"
        >
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  )
}
