'use client'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Sign In</h1>
        <p className="text-gray-600 mb-8">Welcome back to STACK</p>
        
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition">
            Sign In
          </button>
          
          <p className="text-center text-gray-600">
            Don't have an account?{' '}
            <a href="/auth/sign-up" className="text-purple-600 hover:underline font-semibold">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
