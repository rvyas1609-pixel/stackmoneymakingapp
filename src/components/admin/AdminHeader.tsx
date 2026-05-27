'use client'
import React from 'react'
import supabase from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function AdminHeader() {
  const router = useRouter()
  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <header className="flex items-center justify-between p-4 border-b border-[#122235] bg-[#061428]">
      <div className="text-xl font-semibold text-white">Admin Dashboard</div>
      <div className="flex items-center gap-3">
        <button onClick={handleLogout} className="px-3 py-1 rounded bg-[#FFD166] text-black">Logout</button>
      </div>
    </header>
  )
}
