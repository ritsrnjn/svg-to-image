"use client"

import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { FileImage, FileText, Clock, ChevronLeft, ChevronRight, Github, Menu, Wrench } from 'lucide-react'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Footer from '@/components/layout/footer'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const getToolInfo = () => {
    switch (pathname) {
      case '/svg-to-png':
        return {
          name: 'SVG to PNG Tool',
          creator: 'Ritesh Ranjan',
          creatorProfile: 'https://x.com/ritsrnjn'
        }
      case '/text-compare':
        return {
          name: 'Text Compare Tool',
          creator: 'Ritesh Ranjan',
          creatorProfile: 'https://x.com/ritsrnjn'
        }
      case '/epoch-converter':
        return {
          name: 'Epoch Converter Tool',
          creator: 'Ritesh Ranjan',
          creatorProfile: 'https://x.com/ritsrnjn'
        }
      default:
        return {
          name: 'Micro Tools Hub',
          creator: 'Ritesh Ranjan',
          creatorProfile: 'https://x.com/ritsrnjn'
        }
    }
  }

  const toolInfo = getToolInfo()

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">

          {/* There are 3 main componets in this layout:
          - Sidebar
          - Main content
          - Fixed Footer */}

          {/* Sidebar */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 256, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="bg-white shadow-md overflow-hidden flex-shrink-0"
              >
                <nav className="h-full flex flex-col py-5 relative">
                  <div className="px-4 flex justify-between items-center mb-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2"
                    >
                      {/* <Wrench className="h-8 w-8 text-indigo-600" /> */}
                      <Link href="/">
                        <div className="relative">
                          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                            Micro Tools Hub
                          </span>
                          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 transform scale-x-0 transition-transform origin-left group-hover:scale-x-100"></span>
                        </div>
                      </Link>
                    </motion.div>
                    <button
                      onClick={toggleSidebar}
                      className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
                      aria-label="Toggle Sidebar"
                    >
                      <ChevronLeft size={20} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {[
                      { href: '/svg-to-png', icon: FileImage, label: 'SVG to PNG' },
                      { href: '/text-compare', icon: FileText, label: 'Text Compare' },
                      { href: '/epoch-converter', icon: Clock, label: 'Epoch Converter' },
                    ].map((item) => (
                      <motion.div
                        key={item.href}
                        whileHover={{ scale: 1.05, translateX: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          href={item.href}
                          className={`flex items-center py-2 px-4 transition-colors duration-200 ${pathname === item.href
                            ? 'bg-indigo-100 text-indigo-600'
                            : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
                            }`}
                        >
                          <item.icon className="mr-2 h-5 w-5" />
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </nav>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Scrollable content area */}
            <main className="flex-1 overflow-y-auto">
              {!sidebarOpen && (
                <button
                  onClick={toggleSidebar}
                  className="fixed top-4 left-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
                  aria-label="Open Sidebar"
                >
                  <Menu size={24} />
                </button>
              )}
              <div className="p-8">
                {children}
              </div>
            </main>
          </div>

          {/* Fixed Footer */}
          <Footer toolInfo={toolInfo} />


        </div>
      </body>
    </html>
  )
}