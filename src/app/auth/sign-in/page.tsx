'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import supabase from '@/lib/supabase'

export default function SignInPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data: user, error } = await supabase
        .from('users')
        .select('id, email, displayName, username')
        .eq('email', formData.email)
        .single()

      if (error || !user) {
        throw new Error('Invalid email or password')
      }

      localStorage.setItem('userId', user.id)
      localStorage.setItem('userEmail', user.email)
      localStorage.setItem('userName', user.displayName || user.username || '')
      document.cookie = `userId=${user.id}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Strict`

      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg to-surface flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Welcome Back</h1>
          <p className="text-text-secondary">Sign in to your STACK account</p>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-700 text-red-400 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-gold"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your password"
              className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-gold"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 rounded accent-gold"
              />
              <span className="text-sm text-text-secondary">Remember me</span>
            </label>
            <Link href="/auth/forgot-password" className="text-sm text-gold hover:underline font-semibold">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold hover:bg-gold/90 disabled:opacity-50 text-bg font-bold py-3 rounded-lg transition mt-6"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <p className="text-center text-text-secondary text-sm">
            Don't have an account?{' '}
            <Link href="/auth/sign-up" className="text-gold hover:underline font-semibold">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
