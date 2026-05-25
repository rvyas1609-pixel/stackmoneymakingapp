'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type SignUpStep = 'account' | 'plan' | 'payment'

interface FormData {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

interface PlanData {
  plan: 'free' | 'pro' | 'premium'
}

export default function SignUpPage() {
  const router = useRouter()
  const [step, setStep] = useState<SignUpStep>('account')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  })
  const [planData, setPlanData] = useState<PlanData>({
    plan: 'pro',
  })

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const validateAccountStep = () => {
    if (!formData.fullName.trim()) {
      setError('Full name is required')
      return false
    }
    if (!formData.email.includes('@')) {
      setError('Valid email is required')
      return false
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    if (!formData.agreeToTerms) {
      setError('You must agree to Terms of Service')
      return false
    }
    return true
  }

  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (validateAccountStep()) {
      setStep('plan')
    }
  }

  const handlePlanSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          plan: planData.plan,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed')
      }

      if (planData.plan === 'free') {
        router.push('/dashboard')
      } else {
        setStep('payment')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          plan: planData.plan,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Payment setup failed')
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment setup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500">
      {/* Step 1: Create Account */}
      {step === 'account' && (
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
            <p className="text-gray-600 mb-6">Join STACK and start earning with AI</p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleAccountSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleFormChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleFormChange}
                  placeholder="Min 8 characters"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleFormChange}
                  placeholder="Re-enter password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <label className="flex items-start gap-3 mt-4">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleFormChange}
                  className="w-4 h-4 text-purple-600 mt-1 cursor-pointer"
                  required
                />
                <span className="text-sm text-gray-700">
                  I agree to the{' '}
                  <Link href="/terms" className="text-purple-600 hover:underline font-semibold">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-purple-600 hover:underline font-semibold">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition mt-6"
              >
                Continue to Plan Selection
              </button>

              <p className="text-center text-gray-600 text-sm mt-4">
                Already have an account?{' '}
                <Link href="/auth/sign-in" className="text-purple-600 hover:underline font-semibold">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Step 2: Select Plan */}
      {step === 'plan' && (
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="max-w-4xl w-full">
            <h1 className="text-4xl font-bold text-white text-center mb-2">Choose Your Plan</h1>
            <p className="text-white/80 text-center mb-12">Select the perfect plan to get started</p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Free Plan */}
              <div
                className={`bg-white rounded-xl p-6 cursor-pointer transition transform hover:scale-105 ${
                  planData.plan === 'free' ? 'ring-2 ring-purple-600 shadow-lg' : ''
                }`}
                onClick={() => setPlanData({ plan: 'free' })}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Free</h2>
                <p className="text-4xl font-bold text-purple-600 mb-4">$0<span className="text-lg">/mo</span></p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span> 5 AI Credits/month
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span> Basic playbooks
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span> Community access
                  </li>
                  <li className="flex items-center text-gray-400">
                    <span className="text-gray-400 mr-2">✗</span> Advanced analytics
                  </li>
                </ul>
                <button
                  className={`w-full py-2 rounded-lg font-semibold transition ${
                    planData.plan === 'free'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {planData.plan === 'free' ? 'Selected' : 'Select'}
                </button>
              </div>

              {/* Pro Plan */}
              <div
                className={`bg-white rounded-xl p-6 cursor-pointer transition transform hover:scale-105 border-2 border-yellow-400 ${
                  planData.plan === 'pro' ? 'ring-2 ring-purple-600 shadow-lg' : ''
                }`}
                onClick={() => setPlanData({ plan: 'pro' })}
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-gray-800">Pro</h2>
                  <span className="bg-yellow-400 text-gray-800 text-xs font-bold px-3 py-1 rounded-full">POPULAR</span>
                </div>
                <p className="text-4xl font-bold text-purple-600 mb-4">$29<span className="text-lg">/mo</span></p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span> 200 AI Credits/month
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span> All playbooks
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span> Advanced analytics
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span> Priority support
                  </li>
                </ul>
                <button
                  className={`w-full py-2 rounded-lg font-semibold transition ${
                    planData.plan === 'pro'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {planData.plan === 'pro' ? 'Selected' : 'Select'}
                </button>
              </div>

              {/* Premium Plan */}
              <div
                className={`bg-white rounded-xl p-6 cursor-pointer transition transform hover:scale-105 ${
                  planData.plan === 'premium' ? 'ring-2 ring-purple-600 shadow-lg' : ''
                }`}
                onClick={() => setPlanData({ plan: 'premium' })}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Premium</h2>
                <p className="text-4xl font-bold text-purple-600 mb-4">$99<span className="text-lg">/mo</span></p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span> Unlimited AI Credits
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span> Custom playbooks
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span> Real-time analytics
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span> 24/7 dedicated support
                  </li>
                </ul>
                <button
                  className={`w-full py-2 rounded-lg font-semibold transition ${
                    planData.plan === 'premium'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {planData.plan === 'premium' ? 'Selected' : 'Select'}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-center">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => setStep('account')}
                className="flex-1 bg-white/20 hover:bg-white/30 text-white font-bold py-3 rounded-lg transition"
              >
                Back
              </button>
              <button
                onClick={handlePlanSubmit}
                disabled={loading}
                className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition"
              >
                {loading ? 'Processing...' : planData.plan === 'free' ? 'Create Free Account' : 'Continue to Payment'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Payment */}
      {step === 'payment' && (
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Complete Payment</h1>
            <p className="text-gray-600 mb-6">
              Upgrade to {planData.plan === 'pro' ? 'Pro' : 'Premium'} - ${planData.plan === 'pro' ? '29' : '99'}/month
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-700 mb-2">Stripe payment will be processed here.</p>
                <p className="text-xs text-gray-600">This is a placeholder for Stripe integration.</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition"
              >
                {loading ? 'Processing...' : 'Pay Now'}
              </button>

              <button
                type="button"
                onClick={() => setStep('plan')}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-lg transition"
              >
                Back to Plan Selection
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
