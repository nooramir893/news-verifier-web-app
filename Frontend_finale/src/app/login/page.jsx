'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function LoginPage() {

  const [show, setShow]         = useState(false)
  const [loading, setLoading]   = useState(false)

  const [form, setForm] = useState({
    email:'',
    password:''
  })

  const [errors, setErrors] = useState({})

  const { login } = useAuth()
  const router = useRouter()

  const set = (k,v) => setForm(p=>({...p,[k]:v}))

  const validate = () => {

    const e={}

    if(!form.email)
      e.email='Email is required'
    else if(!/\S+@\S+\.\S+/.test(form.email))
      e.email='Enter a valid email'

    if(!form.password)
      e.password='Password is required'
    else if(form.password.length<6)
      e.password='Minimum 6 characters'

    return e
  }

  const submit = async(ev) => {

    ev.preventDefault()

    const e = validate()

    if(Object.keys(e).length){
      setErrors(e)
      return
    }

    setErrors({})
    setLoading(true)

    await new Promise(r=>setTimeout(r,1400))

    login({
      email:form.email
    })

    router.push('/dashboard')
  }

  const inputCls = (k) =>
    `w-full bg-navy-900/70 border rounded-xl pl-10 pr-4 py-3 text-sm text-gray-200 font-body placeholder-gray-600 outline-none transition-all focus:border-primary/60 focus:shadow-[0_0_0_3px_rgba(15,118,110,.13)] ${errors[k]?'border-red-500/45':'border-primary/20'}`

  return (

    <div className="min-h-screen bg-navy-950 grid-bg flex items-center justify-center px-4 relative">

      <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-primary/[.06] blur-3xl pointer-events-none"/>

      <div className="w-full max-w-md relative z-10">

        <div className="text-center mb-8">

          <Link href="/" className="inline-flex items-center gap-3 mb-6 group">

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-t group-hover:scale-110 transition-transform">
              <Shield size={19} className="text-white"/>
            </div>

            <span className="font-display font-extrabold text-xl text-white">
              News<span className="grad-cyan">Verifier</span>
            </span>

          </Link>

          <h1 className="font-display font-extrabold text-3xl text-white mb-2">
            Welcome back
          </h1>

          <p className="text-gray-400 font-body text-sm">
            Sign in to access the AI news detector
          </p>

        </div>

        <div className="glass nb rounded-2xl p-8">

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-primary/12"/>
            <span className="text-gray-500 text-xs font-mono">
              Continue with email
            </span>
            <div className="flex-1 h-px bg-primary/12"/>
          </div>

          <form onSubmit={submit} className="sxgbe-y-4">

            {/* Email */}
            <div>

              <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase tracking-widest">
                Email
              </label>

              <div className="relative">

                <Mail
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type="email"
                  value={form.email}
                  onChange={e=>set('email',e.target.value)}
                  placeholder="you@example.com"
                  className={inputCls('email')}
                />

              </div>

              {errors.email && (
                <p className="text-red-400 text-xs font-mono mt-1">
                  {errors.email}
                </p>
              )}

            </div>

            {/* Password */}
            <div>

              <div className="flex justify-between mb-1.5">

                <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                  Password
                </label>

                <Link
                  href="#"
                  className="text-xs text-primary hover:text-secondary font-body transition-colors"
                >
                  Forgot password?
                </Link>

              </div>

              <div className="relative">

                <Lock
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type={show?'text':'password'}
                  value={form.password}
                  onChange={e=>set('password',e.target.value)}
                  placeholder="••••••••"
                  className={`${inputCls('password')} pr-11`}
                />

                <button
                  type="button"
                  onClick={()=>setShow(!show)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {show?<Eye size={14}/>:<EyeOff size={14}/>}
                </button>

              </div>

              {errors.password && (
                <p className="text-red-400 text-xs font-mono mt-1">
                  {errors.password}
                </p>
              )}

            </div>

            {/* Remember */}
            <div className="flex items-center gap-2">

              <input
                type="checkbox"
                id="rem"
                className="w-4 h-4 accent-primary rounded cursor-pointer"
              />

              <label
                htmlFor="rem"
                className="text-sm text-gray-400 font-body cursor-pointer"
              >
                Remember me for 30 days
              </label>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn w-full py-3.5 rounded-xl font-display font-bold text-white text-sm flex items-center justify-center gap-2 glow-t disabled:opacity-55 disabled:cursor-not-allowed"
            >

              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={14}/>
                </>
              )}

            </button>

          </form>

        </div>

        <p className="text-center text-gray-500 text-sm font-body mt-5">
          Don't have an account?{' '}
          <Link
            href="/signup"
            className="text-primary hover:text-secondary font-semibold transition-colors"
          >
            Create one free
          </Link>
        </p>

        <p className="text-center mt-3">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-400 text-xs font-body transition-colors"
          >
            ← Back to Home
          </Link>
        </p>

      </div>

    </div>
  )
}
