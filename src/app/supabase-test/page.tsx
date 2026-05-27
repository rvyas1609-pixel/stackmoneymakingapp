'use client' // This tells Next.js this runs in the browser (not server)

import { useState } from 'react'
import supabase from '@/lib/supabase'

const TEST_EMAIL_PREFIX = 'test+'

export default function SupabaseTestPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [users, setUsers] = useState<any[]>([])

  const createTestEmail = () => `${TEST_EMAIL_PREFIX}${Date.now()}@example.com`

  const addUser = async () => {
    setLoading(true)
    setMessage('Adding user...')

    try {
      const email = createTestEmail()
      const displayName = `Test User ${new Date().toLocaleTimeString()}`
      const username = displayName.toLowerCase().replace(/\s+/g, '-')

      const { data, error } = await supabase
        .from('users')
        .insert([
          { email, username, displayName, clerkId: `test_${Date.now()}` },
        ])
        .select('id, email, displayName')

      if (error || !data?.length) {
        throw new Error(error?.message || 'Failed to create test user')
      }

      setMessage(`✅ User added! ID: ${data[0].id}`)
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      setMessage(`❌ Failed: ${message}`)
    }

    setLoading(false)
  }

  const getUsers = async () => {
    setLoading(true)
    setMessage('Loading users...')

    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, email, displayName')
        .like('email', `${TEST_EMAIL_PREFIX}%`)

      if (error) {
        throw new Error(error.message)
      }

      setUsers(data || [])
      setMessage(`✅ Found ${data?.length ?? 0} users!`)
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      setMessage(`❌ Failed: ${message}`)
    }

    setLoading(false)
  }

  const clearUsers = async () => {
    setLoading(true)
    setMessage('Clearing test users...')

    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .like('email', `${TEST_EMAIL_PREFIX}%`)

      if (error) {
        throw new Error(error.message)
      }

      setMessage('✅ Test users cleared!')
      setUsers([])
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      setMessage(`❌ Failed: ${message}`)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-blue via-bg-primary to-gold p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          🗄️ Supabase Test
        </h1>
        <p className="text-gray-600 mb-8">
          Test your database connection here
        </p>

        {/* Status Message */}
        {message && (
          <div className={`p-4 rounded-lg mb-6 text-white font-semibold ${
            message.includes('✅') ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {message}
          </div>
        )}

        {/* Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={addUser}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-lg transition"
          >
            {loading ? '⏳ Loading...' : '➕ Add User'}
          </button>

          <button
            onClick={getUsers}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-lg transition"
          >
            {loading ? '⏳ Loading...' : '📖 Get Users'}
          </button>

          <button
            onClick={clearUsers}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-lg transition"
          >
            {loading ? '⏳ Loading...' : '🗑️ Clear All'}
          </button>
        </div>

        {/* Users List */}
        {users.length > 0 && (
          <div className="bg-gray-100 rounded-lg p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Users in Database:
            </h2>
            <div className="space-y-2">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="bg-white p-3 rounded-lg border border-gray-300"
                >
                  <p className="font-semibold">ID: {user.id}</p>
                  <p>Name: {user.displayName || user.email}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
