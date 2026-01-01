import './globals.css'
import { LanguageProvider } from '../contexts/LanguageContext'
import LanguageSelector from '../components/LanguageSelector'

export const metadata = {
  title: 'New Year 2026 Reflection',
  description: 'Reflect on your 2025 and step into 2026 with hope and gratitude',
}

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1a1a2e" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="font-sans">
        <LanguageProvider>
          <LanguageSelector />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
