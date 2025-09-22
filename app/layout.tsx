import './globals.css'
import { Inter } from 'next/font/google'
import MobileNavigation from '@/components/MobileNavigation'
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
          <div className="min-h-screen bg-gray-50">
            <MobileNavigation />
            <main className="container mx-auto lg:px-4 lg:py-8">
              {children}
            </main>
          </div>
        </InstantAuth>
      </body>
    </html>
  )
}