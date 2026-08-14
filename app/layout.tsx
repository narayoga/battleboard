import type { Metadata } from 'next'

// Pre-compiled Bootstrap CSS (tidak perlu compile SASS)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'animate.css/animate.min.css'

// Custom styles
import './globals.css'

export const metadata: Metadata = {
  title: 'Battle Room',
  description: 'Planning Access Supervision',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="//fonts.googleapis.com/css?family=Poppins:300,400,500,600,700"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
    
  )
}
