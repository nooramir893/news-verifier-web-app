'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Shield, Mail, Lock, Eye, EyeOff, User, ArrowRight, Github, Chrome, CheckCircle } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

function PwStrength({ pw }) {
  const checks = [
    { l:'8+ characters', ok: pw.length>=8 },
    { l:'Number', ok:/\d/.test(pw) },
    { l:'Uppercase', ok:/[A-Z]/.test(pw) },
    { l:'Special char', ok:/[^A-Za-z0-9]/.test(pw) },
  ]
  const score = checks.filter(c=>c.ok).length
  const bar   = score<=1?'bg-red-500':score===2?'bg-yellow-500':score===3?'bg-primary':'bg-neon'
  const lbl   = score<=1?'Weak':score===2?'Fair':score===3?'Good':'Strong'
  const clr   = score<=1?'text-red-400':score===2?'text-yellow-400':score===3?'text-primary':'text-neon'
  if(!pw) return null
  return (
    <div className="mt-2.5 sxgbe-y-2">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-navy-900 rounded-full flex gap-1 overflow-hidden">
          {[0,1,2,3].map(i=><div key={i} className={`flex-1 h-full rounded-full transition-all duration-300 ${i<score?bar:'bg-navy-800'}`}/>)}
        </div>
        <span className={`text-xs font-mono ${clr}`}>{lbl}</span>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        {checks.map(c=>(
          <div key={c.l} className={`flex items-center gap-1.5 text-xs font-body transition-colors ${c.ok?'text-neon':'text-gray-600'}`}>
            <CheckCircle size={10}/>{c.l}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SignupPage() {
  const [show1,setShow1]     = useState(false)
  const [show2,setShow2]     = useState(false)
  const [loading,setLoading] = useState(false)
  const [agreed,setAgreed]   = useState(false)
  const [form,setForm]       = useState({name:'',email:'',password:'',confirm:''})
  const [errors,setErrors]   = useState({})
  const { signup }           = useAuth()
  const router               = useRouter()

  const set = (k,v) => setForm(p=>({...p,[k]:v}))

  const validate = () => {
    const e={}
    if(!form.name.trim()) e.name='Full name is required'
    if(!form.email) e.email='Email is required'
    else if(!/\S+@\S+\.\S+/.test(form.email)) e.email='Enter a valid email'
    if(!form.password) e.password='Password is required'
    else if(form.password.length<8) e.password='Minimum 8 characters'
    if(!form.confirm) e.confirm='Please confirm your password'
    else if(form.confirm!==form.password) e.confirm='Passwords do not match'
    if(!agreed) e.agreed='You must agree to the terms'
    return e
  }

  const submit = async(ev) => {
    ev.preventDefault()
    const e=validate(); if(Object.keys(e).length){setErrors(e);return}
    setErrors({}); setLoading(true)
    await new Promise(r=>setTimeout(r,1600))
    signup({name:form.name,email:form.email})
    router.push('/dashboard')
  }

  const inputCls = (k) =>
    `w-full bg-navy-900/70 border rounded-xl pl-10 pr-4 py-3 text-sm text-gray-200 font-body placeholder-gray-600 outline-none transition-all focus:border-primary/60 focus:shadow-[0_0_0_3px_rgba(15,118,110,.13)] ${errors[k]?'border-red-500/45':'border-primary/20'}`

  return (
    <div className="min-h-screen bg-navy-950 grid-bg flex items-center justify-center px-4 py-12 relative">
      
      <div className="absolute top-1/3 right-1/3 w-80 h-80 rounded-full bg-primary/[.06] blur-3xl pointer-events-none"/>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-t group-hover:scale-110 transition-transform">
              <Shield size={19} className="text-white"/>
            </div>
            <span className="font-display font-extrabold text-xl text-white">News<span className="grad-cyan">Verifier</span></span>
          </Link>
          <h1 className="font-display font-extrabold text-3xl text-white mb-2">Create your account</h1>
          <p className="text-gray-400 font-body text-sm">Join News Verifier and start detecting fake news</p>
        </div>

        <div className="glass nb rounded-2xl p-8">
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[{I:Github,l:'GitHub'},{I:Chrome,l:'Google'}].map(({I,l})=>(
              <button key={l} className="flex items-center justify-center gap-2 py-2.5 rounded-xl nb glass text-gray-300 hover:text-white hover:border-primary/45 transition-all text-sm font-body">
                <I size={14}/>{l}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-primary/12"/>
            <span className="text-gray-500 text-xs font-mono">or sign up with email</span>
            <div className="flex-1 h-px bg-primary/12"/>
          </div>

          <form onSubmit={submit} className="sxgbe-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase tracking-widest">Full Name</label>
              <div className="relative">
                <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"/>
                <input type="text" value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Muhammad Ali" className={inputCls('name')}/>
              </div>
              {errors.name && <p className="text-red-400 text-xs font-mono mt-1">{errors.name}</p>}
            </div>
            {/* Email */}
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase tracking-widest">Email</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"/>
                <input type="email" value={form.email} onChange={e=>set('email',e.target.value)} placeholder="you@example.com" className={inputCls('email')}/>
              </div>
              {errors.email && <p className="text-red-400 text-xs font-mono mt-1">{errors.email}</p>}
            </div>
            {/* Password */}
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase tracking-widest">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"/>
                <input type={show1?'text':'password'} value={form.password} onChange={e=>set('password',e.target.value)} placeholder="••••••••" className={`${inputCls('password')} pr-11`}/>
                <button type="button" onClick={()=>setShow1(!show1)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                  {show1?<Eye size={14}/>:<EyeOff size={14}/>}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs font-mono mt-1">{errors.password}</p>}
              <PwStrength pw={form.password}/>
            </div>
            {/* Confirm */}
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase tracking-widest">Confirm Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"/>
                <input type={show2?'text':'password'} value={form.confirm} onChange={e=>set('confirm',e.target.value)} placeholder="••••••••"
                  className={`${inputCls('confirm')} pr-11 ${form.confirm&&form.confirm===form.password?'border-green-500/40':''}`}/>
                <button type="button" onClick={()=>setShow2(!show2)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                  {show2?<Eye size={14}/>:<EyeOff size={14}/>}
                </button>
                {form.confirm&&form.confirm===form.password&&<CheckCircle size={13} className="absolute right-9 top-1/2 -translate-y-1/2 text-neon"/>}
              </div>
              {errors.confirm && <p className="text-red-400 text-xs font-mono mt-1">{errors.confirm}</p>}
            </div>
            {/* Terms */}
            <div>
              <div className="flex items-start gap-2.5">
                <input type="checkbox" id="terms" checked={agreed} onChange={e=>setAgreed(e.target.checked)} className="w-4 h-4 mt-0.5 accent-primary cursor-pointer flex-shrink-0"/>
                <label htmlFor="terms" className="text-sm text-gray-400 font-body cursor-pointer leading-relaxed">
                  I agree to the <Link href="#" className="text-primary hover:text-secondary transition-colors">Terms of Service</Link> and <Link href="#" className="text-primary hover:text-secondary transition-colors">Privacy Policy</Link>
                </label>
              </div>
              {errors.agreed && <p className="text-red-400 text-xs font-mono mt-1">{errors.agreed}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="btn w-full py-3.5 rounded-xl font-display font-bold text-white text-sm flex items-center justify-center gap-2 glow-t disabled:opacity-55 disabled:cursor-not-allowed">
              {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Creating account...</> : <>Create Account<ArrowRight size={14}/></>}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-500 text-sm font-body mt-5">
          Already have an account?{' '}<Link href="/login" className="text-primary hover:text-secondary font-semibold transition-colors">Sign in</Link>
        </p>
        <p className="text-center mt-3">
          <Link href="/" className="text-gray-600 hover:text-gray-400 text-xs font-body transition-colors">← Back to Home</Link>
        </p>
      </div>
    </div>
  )
}
