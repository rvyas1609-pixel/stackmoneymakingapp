'use client' // This tells Next.js this runs in the browser (not server)

import { useState } from 'react'

export default function SupabaseTestPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [users, setUsers] = useState<any[]>([])

  // Function to add a new user via our API
  const addUser = async () => {
    setLoading(true)
    setMessage('Adding user...')

    try {
      // Call our API endpoint instead of Supabase directly
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          age: 25,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setMessage(`❌ Error: ${data.error}`)
      } else {
        setMessage(`✅ User added! ID: ${data[0].id}`)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      setMessage(`❌ Failed: ${message}`)
    }

    setLoading(false)
  }

  // Function to read all users via our API
  const getUsers = async () => {
    setLoading(true)
    setMessage('Loading users...')

    try {
      // Call our API endpoint
      const response = await fetch('/api/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await response.json()

      if (!response.ok) {
        setMessage(`❌ Error: ${data.error}`)
      } else {
        setUsers(data || [])
        setMessage(`✅ Found ${data.length} users!`)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      setMessage(`❌ Failed: ${message}`)
    }

    setLoading(false)
  }

  // Function to clear all users via our API
  const clearUsers = async () => {
    setLoading(true)
    setMessage('Clearing all users...')

    try {
      // Call our API endpoint
      const response = await fetch('/api/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await response.json()

      if (!response.ok) {
        setMessage(`❌ Error: ${data.error}`)
      } else {
        setMessage(`✅ All users cleared!`)
        setUsers([])
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      setMessage(`❌ Failed: ${message}`)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-8">
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
                  <p>Name: {user.name}</p>
                  <p>Age: {user.age}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
