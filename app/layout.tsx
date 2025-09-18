import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'
import InstantAuth from '@/components/InstantAuth'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Khopra Ridge Trek 2025',
  description: 'Trek coordination and planning for Khopra Ridge expedition',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <InstantAuth>
          <div className="min-h-screen bg-gradient-to-br from-himalaya to-blue-50">
            <Navigation />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        </InstantAuth>
      </body>
    </html>
  )
}