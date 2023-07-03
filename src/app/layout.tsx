import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from './NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Nextjs Image Gallery',
  description: 'An Image Gallery built with Nextjs 13',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <div> This is a consistent Header!! </div>
        {children}
      </body>
    </html>
  )
}
