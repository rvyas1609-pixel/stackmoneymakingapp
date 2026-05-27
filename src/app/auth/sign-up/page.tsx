'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import supabase from '@/lib/supabase'

interface FormData {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  plan: 'free' | 'starter' | 'pro' | 'elite'
  agreeToTerms: boolean
}

const PLANS = {
  free: { name: 'Free', price: '$0', features: ['Basic playbooks', '10 prompts/month'] },
  starter: { name: 'Starter', price: '$29', features: ['All playbooks', 'Unlimited prompts', 'Resources'] },
  pro: { name: 'Pro', price: '$79', features: ['Starter + Roadmaps', 'AI Chat', 'Community'] },
  elite: { name: 'Elite', price: '$199', features: ['Pro + Priority', 'Custom roadmaps', 'Calls'] },
}

export default function SignUpPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    plan: 'free',
    agreeToTerms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.fullName.trim()) {
      setError('Full name is required')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!formData.agreeToTerms) {
      setError('You must agree to Terms of Service')
      return
    }

    setLoading(true)

    try {
      const username = formData.email.split('@')[0]
      const { data: createdUsers, error: createError } = await supabase
        .from('users')
        .insert([
          {
            email: formData.email,
            username,
            displayName: formData.fullName,
            clerkId: `user_${Date.now()}`,
          },
        ])
        .select('id, email, displayName')

      if (createError || !createdUsers?.length) {
        throw new Error(createError?.message || 'Signup failed')
      }

      const newUser = createdUsers[0]

      if (formData.plan !== 'free') {
        const { error: subscriptionError } = await supabase.from('subscriptions').insert([
          {
            user_id: newUser.id,
            tier: formData.plan,
            status: 'active',
          },
        ])
        if (subscriptionError) {
          throw new Error(subscriptionError.message)
        }
      }

      localStorage.setItem('userId', newUser.id)
      localStorage.setItem('userEmail', newUser.email)
      localStorage.setItem('userName', newUser.displayName || '')
      document.cookie = `userId=${newUser.id}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Strict`

      router.push('/onboarding')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg to-surface">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-surface border border-border rounded-2xl shadow-2xl p-8 max-w-xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">Create Your Account</h1>
            <p className="text-text-secondary">Join STACK and start earning with AI</p>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-700 text-red-400 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-gold"
                required
              />
            </div>

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
                placeholder="Min 8 characters"
                className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-gold"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-gold"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">Select Your Plan</label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(PLANS).map(([key, plan]) => (
                  <label key={key} className={`cursor-pointer p-3 rounded-lg border-2 transition ${
                    formData.plan === key ? 'border-gold bg-gold/10' : 'border-border hover:border-text-secondary'
                  }`}>
                    <input
                      type="radio"
                      name="plan"
                      value={key}
                      checked={formData.plan === key}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <div className="text-sm font-semibold text-text-primary">{plan.name}</div>
                    <div className="text-xs text-gold">{plan.price}/mo</div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mt-1 w-4 h-4 rounded accent-gold"
                required
              />
              <label className="text-sm text-text-secondary">
                I agree to the <Link href="/terms" className="text-gold hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-gold hover:underline">Privacy Policy</Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold hover:bg-gold/90 disabled:opacity-50 text-bg font-bold py-3 rounded-lg transition mt-6"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <p className="text-center text-text-secondary text-sm">
              Already have an account?{' '}
              <Link href="/auth/sign-in" className="text-gold hover:underline font-semibold">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
