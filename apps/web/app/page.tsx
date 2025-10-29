import React from 'react'
import Link from 'next/link'

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="px-6 py-20 md:py-28 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-xs font-semibold mb-4">
              Infilects • Client Status Platform
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Track every client, project, and status in one place.
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-prose">
              A unified workspace to manage clients, monitor project health, and keep your team aligned. Built for speed and clarity.
            </p>
            <div className="mt-8 flex gap-3">
              <Link href="#get-started" className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-3 text-white font-semibold shadow hover:bg-blue-700">
                Get Started
              </Link>
              <Link href="#features" className="inline-flex items-center justify-center rounded-md border border-gray-300 px-5 py-3 text-gray-800 font-semibold hover:bg-gray-50">
                View Features
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] w-full rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-50 via-white to-purple-50 shadow-sm" />
          </div>
        </div>
      </section>


      <footer className="px-6 py-10 text-center text-sm text-gray-500 border-t border-gray-100">
        © {new Date().getFullYear()} Infilects. All rights reserved.
      </footer>
    </main>
  )
}





