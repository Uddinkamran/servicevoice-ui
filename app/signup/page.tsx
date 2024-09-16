'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from "next/link"

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [isSignIn, setIsSignIn] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setIsSubmitted(false)

    try {
      const result = await signIn('resend', {
        email,
        name: isSignIn ? undefined : name,
        redirect: false,
        callbackUrl: '/dashboard',
      });

      if (result?.error) {
        setMessage('Failed to send magic link. Please try again.')
      } else {
        setIsSubmitted(true)
        setMessage('Magic link sent! Check your email.')
      }
    } catch (error) {
      setMessage('An unexpected error occurred. Please try again.')
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold">Check Your Email</h2>
          <p>We've sent a magic link to your email address. Please check your inbox and click the link to {isSignIn ? "sign in" : "complete your registration"}.</p>
          <p className="text-sm text-gray-500">Didn't receive an email? Check your spam folder or try again.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </Link>

        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          {isSignIn ? "Sign in to your account" : "Sign up for an account"}
        </h2>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {!isSignIn && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isSignIn ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </form>

        <div className="text-center">
          <button
            onClick={() => setIsSignIn(!isSignIn)}
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            {isSignIn ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>

        {message && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-700 text-center">{message}</p>
          </div>
        )}
      </div>
    </div>
  )
}