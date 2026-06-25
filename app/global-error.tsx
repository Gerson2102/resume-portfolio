'use client'

import { useEffect } from 'react'

/**
 * Catches errors thrown in the root layout itself (where `error.tsx` cannot
 * reach). It replaces the entire document, so it renders its own <html>/<body>
 * and uses inline styles — it must not depend on the app's CSS pipeline, which
 * may be the thing that failed.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global application error:', error)
  }, [error])

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#171717',
          color: '#fafafa',
          fontFamily: 'system-ui, sans-serif',
          padding: '1.5rem',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '28rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
            Something went wrong
          </h2>
          <p style={{ color: '#a3a3a3', marginBottom: '1.5rem' }}>
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={() => reset()}
            style={{
              backgroundColor: '#0ea5e9',
              color: '#ffffff',
              fontWeight: 500,
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
