import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SmoothScroll } from '@/components/ui/smooth-scroll'

const inter = Inter({ subsets: ['latin'] })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://gersonloaiza.com'),
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
    url: 'https://gersonloaiza.com',
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
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfilePage',
              mainEntity: {
                '@type': 'Person',
                name: 'Gerson',
                jobTitle: 'Web3 Developer',
                url: 'https://gersonloaiza.com',
                sameAs: [
                  'https://github.com/Gerson2102',
                  'https://x.com/Glv_exe02',
                  'https://www.linkedin.com/in/gerson-lv/',
                ],
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} ${jetbrainsMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <SmoothScroll>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
            >
              Skip to content
            </a>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main id="main" className="flex-1 overflow-x-clip">
                {children}
              </main>
              <Footer />
            </div>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}