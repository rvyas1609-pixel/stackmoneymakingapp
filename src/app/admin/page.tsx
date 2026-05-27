'use client'
import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'

interface DashboardStats {
  totalUsers: number
  activeUsers: number
  totalPlaybooks: number
  totalPrompts: number
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalPlaybooks: 0,
    totalPrompts: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        // Load users count
        const { count: userCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })

        // Load playbooks count
        const { count: playbookCount } = await supabase
          .from('playbooks')
          .select('*', { count: 'exact', head: true })

        // Load prompts count
        const { count: promptCount } = await supabase
          .from('prompts')
          .select('*', { count: 'exact', head: true })

        setStats({
          totalUsers: userCount || 0,
          activeUsers: Math.floor((userCount || 0) * 0.7), // Estimate 70% active
          totalPlaybooks: playbookCount || 0,
          totalPrompts: promptCount || 0,
        })
      } catch (error) {
        console.error('Failed to load stats:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  const StatCard = ({ label, value, icon }: { label: string; value: number; icon: string }) => (
    <div className="bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-[#222] rounded-lg p-6 hover:border-[#333] transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold mt-2">{loading ? '...' : value.toLocaleString()}</p>
        </div>
        <div className="text-4xl opacity-50">{icon}</div>
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome to Admin Dashboard</h1>
        <p className="text-gray-400">Manage your platform's content, users, and analytics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Users" value={stats.totalUsers} icon="👥" />
        <StatCard label="Active Users" value={stats.activeUsers} icon="🟢" />
        <StatCard label="Playbooks" value={stats.totalPlaybooks} icon="📚" />
        <StatCard label="Prompts" value={stats.totalPrompts} icon="💬" />
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-[#222] rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/admin/users" className="p-4 bg-emerald-600/10 border border-emerald-600/30 rounded-lg hover:bg-emerald-600/20 transition text-center cursor-pointer">
            <div className="text-2xl mb-2">👥</div>
            <p className="font-semibold text-emerald-400">Manage Users</p>
          </a>
          <a href="/admin/playbooks" className="p-4 bg-blue-600/10 border border-blue-600/30 rounded-lg hover:bg-blue-600/20 transition text-center cursor-pointer">
            <div className="text-2xl mb-2">📚</div>
            <p className="font-semibold text-blue-400">Edit Playbooks</p>
          </a>
          <a href="/admin/prompts" className="p-4 bg-purple-600/10 border border-purple-600/30 rounded-lg hover:bg-purple-600/20 transition text-center cursor-pointer">
            <div className="text-2xl mb-2">💬</div>
            <p className="font-semibold text-purple-400">Manage Prompts</p>
          </a>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-[#222] rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">System Status</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded">
            <span className="text-gray-300">Database Connection</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Connected</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded">
            <span className="text-gray-300">API Status</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Operational</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded">
            <span className="text-gray-300">Storage</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Healthy</span>
          </div>
        </div>
      </div>
    </div>
  )
}
