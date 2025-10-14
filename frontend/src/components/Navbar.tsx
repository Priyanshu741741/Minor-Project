"use client"

import * as React from "react"
import Link from "next/link"

export function Navbar() {
  return (
    <nav className="w-full bg-gray-50 font-sans">
      <div className="max-w-[95%] mx-auto px-8 py-6 flex items-center justify-between">
        {/* Logo - More on left */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-base">D</span>
          </div>
          <span className="font-medium text-2xl text-gray-900 tracking-wide">Dispensary</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          <Link href="/appointments" className="text-gray-900 hover:text-black transition-colors text-base font-normal">
            Appointments
          </Link>
          <Link href="/doctors" className="text-gray-900 hover:text-black transition-colors text-base font-normal">
            Doctors
          </Link>
          <Link href="/visits" className="text-gray-900 hover:text-black transition-colors text-base font-normal">
            Visits
          </Link>
          <Link href="/profile" className="text-gray-900 hover:text-black transition-colors text-base font-normal">
            Profile
          </Link>
        </div>

        {/* Get Started Button - More on right */}
        <div>
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-900 px-6 py-2.5 text-base font-medium hover:bg-gray-50 transition-colors"
          >
            Login →
          </Link>
        </div>
      </div>
    </nav>
  )
}
