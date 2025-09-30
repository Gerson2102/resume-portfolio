import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://gerson-portfolio.vercel.app'),
  title: 'Gerson - Web3 Developer & Open Source Contributor',
  description: 'Web3 developer from Costa Rica specializing in Starknet ecosystem. 20+ OSS contributions, multiple hackathon wins, OnlyDust Fellowship recipient.',
  keywords: [
    'Web3 Developer',
    'Starknet',
    'Cairo',
    'Blockchain',
    'Open Source',
    'Hackathon Winner',
    'OnlyDust',
    'Costa Rica',
    'Ethereum',
    'DeFi'
  ],
  authors: [{ name: 'Gerson', url: 'https://github.com/Gerson2102' }],
  creator: 'Gerson',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gerson-portfolio.vercel.app',
    title: 'Gerson - Web3 Developer & Open Source Contributor',
    description: 'Web3 developer from Costa Rica specializing in Starknet ecosystem. 20+ OSS contributions, multiple hackathon wins.',
    siteName: 'Gerson Portfolio',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gerson - Web3 Developer & Open Source Contributor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gerson - Web3 Developer & Open Source Contributor',
    description: 'Web3 developer from Costa Rica specializing in Starknet ecosystem. 20+ OSS contributions, multiple hackathon wins.',
    creator: '@Glv_exe02',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add Google Search Console verification when deployed
    // google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}