import BottomNavbar from '@/views/Navigation/navigation'
import React from 'react'

export default function MobileLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        {children}

        <BottomNavbar />
      </body>
    </html>
  )
}
