"use client"

import Link from 'next/link'
import AuthButtons from '@/components/AuthButtons'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { User, UserRole } from '@infilects/types'

export default function Header() {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [session, status])

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/users')
      const data = await response.json()
      if (data.success) {
        const currentUser = data.data.find((u: User) => u.email === session?.user?.email)
        setUser(currentUser || null)
      }
    } catch (error) {
      console.error('Error fetching user:', error)
    } finally {
      setLoading(false)
    }
  }

  const showAdminLink = user?.role === UserRole.L0_ADMIN
  const showDashboardLink = user?.assignedClients && user.assignedClients.length > 0

  if (loading) {
    return (
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold text-gray-900">Infilects</Link>
          <div className="flex items-center gap-4">
            <AuthButtons />
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-gray-900">Infilects</Link>
        <div className="flex items-center gap-4">
          {showAdminLink && (
            <Link href="/admin" className="text-sm text-gray-600 hover:text-gray-900">
              Admin
            </Link>
          )}
          {showDashboardLink && (
            <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
              My Dashboard
            </Link>
          )}
          <AuthButtons />
        </div>
      </div>
    </header>
  )
}
