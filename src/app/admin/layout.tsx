'use client'

import React, { useEffect, useState } from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'
import { useRouter } from 'next/navigation'
import supabase from '@/lib/supabase'

// Admin layout wraps all /admin pages. It enforces admin role on client-side and
// provides a consistent sidebar + header. We intentionally do not modify existing
// frontend pages — admin lives under /admin only.

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    let mounted = true
    const check = async () => {
      const { data: { user } = {} } = await supabase.auth.getUser()
      if (!user) {
        if (mounted) router.push('/')
        return
      }
      // Check profile role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      const role = (profile as any)?.role
      if (role !== 'admin') {
        if (mounted) router.push('/')
        return
      }
      if (mounted) setLoading(false)
    }
    check()
    return () => { mounted = false }
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading admin…</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-[#071022] text-white">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
