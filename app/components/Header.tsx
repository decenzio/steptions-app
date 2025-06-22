"use client";

import Link from 'next/link'
import Logo from './Logo'

export default function Header() {
  return (
    <header className="header border-b border-gray-300 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <Logo />
          <span className="text-2xl font-bold text-gray-900">STEPTIONS</span>
        </div>

        {/* User Info & Time */}
        <div className="flex items-center space-x-6">
          {/* Open App Button */}
          <Link href="/app">
            <button className="btn-primary px-6 py-3 font-bold text-sm rounded-lg bg-gradient-to-br from-blue-600 to-orange-500 text-white hover:shadow-lg transition-all">
              Open App
            </button>
          </Link>
        </div>
      </div>
    </header>
  )
}