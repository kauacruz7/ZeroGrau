
import React from 'react'
import Navigation from './Navigation'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="pb-20">
        {children}
      </main>
      <Navigation />
    </div>
  )
}

export default Layout
