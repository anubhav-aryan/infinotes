"use client"

import { signIn, signOut, useSession } from 'next-auth/react'

export default function AuthButtons() {
  const { status } = useSession()

  if (status === 'loading') return null

  return status === 'authenticated' ? (
    <button onClick={() => signOut()} className="text-sm font-semibold text-gray-700 hover:text-gray-900">
      Sign out
    </button>
  ) : (
    <button onClick={() => signIn('google')} className="text-sm font-semibold text-blue-600 hover:text-blue-700">
      Sign in
    </button>
  )
}
