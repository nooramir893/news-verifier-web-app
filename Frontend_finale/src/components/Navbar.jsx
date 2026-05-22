'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Shield, Menu, X, Zap, User, LogOut, BarChart2, Clock, Home, ChevronDown, Lock } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const PUBLIC_LINKS = [
  { href:'/', label:'Home' },
  { href:'/how-it-works', label:'How It Works' },
  { href:'/features', label:'Features' },
]
const PROTECTED_LINKS = [
  { href:'/detect', label:'Detect' },
  { href:'/dashboard/statistics', label:'Statistics' },
  { href:'/dashboard/history', label:'History' },
]

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [ddOpen, setDdOpen]         = useState(false)
  const { user, logout }            = useAuth()
  const pathname                    = usePathname()
  const router                      = useRouter()
  const ddRef                       = useRef(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const fn = (e) => { if (ddRef.current && !ddRef.current.contains(e.target)) setDdOpen(false) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  const guard = (e) => { if (!user) { e.preventDefault(); router.push('/login') } }
  const handleLogout = () => { logout(); setDdOpen(false); router.push('/') }
  const initials = user?.name?.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2) ?? '?'

  const NavLink = ({ href, label, protected: prot }) => {
    const active = pathname === href
    return (
      <Link href={href} onClick={prot ? guard : undefined}
        className={`relative px-3.5 py-2 text-sm font-display font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5 group ${active ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
        {active && <span className="absolute inset-0 bg-primary/15 border border-primary/30 rounded-lg" />}
        {!active && <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/[.04] transition-colors" />}
        <span className="relative z-10">{label}</span>
        {prot && !user && <Lock size={10} className="relative z-10 text-primary/70" />}
      </Link>
    )
  }

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'glass border-b border-primary/20 py-3' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-t group-hover:scale-110 transition-transform">
              <Shield size={17} className="text-white" />
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-neon rounded-full glow-g animate-pulse" />
          </div>
          <div className="leading-none">
            <div className="font-display font-extrabold text-lg text-white tracking-tight">News<span className="grad-cyan">Verifier</span></div>
            <div className="text-[9px] font-mono text-primary tracking-[.2em] uppercase">AI Powered</div>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5">
          {PUBLIC_LINKS.map(l => <NavLink key={l.href} {...l} />)}
          {PROTECTED_LINKS.map(l => <NavLink key={l.href} {...l} protected />)}
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-2.5">
          {user ? (
            <div className="relative" ref={ddRef}>
              <button onClick={() => setDdOpen(!ddOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl nb glass hover:border-primary/50 transition-all group">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-[11px] font-display font-bold">
                  {initials}
                </div>
                <span className="text-sm font-display text-gray-300 group-hover:text-white max-w-[90px] truncate">{user.name.split(' ')[0]}</span>
                <ChevronDown size={13} className={`text-gray-500 transition-transform ${ddOpen ? 'rotate-180' : ''}`} />
              </button>

              {ddOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 glass nb rounded-2xl overflow-hidden shadow-2xl">
                  <div className="px-4 py-3 border-b border-primary/15">
                    <p className="text-white font-display font-semibold text-sm truncate">{user.name}</p>
                    <p className="text-gray-500 font-mono text-xs truncate">{user.email}</p>
                  </div>
                  {[
                    { href:'/dashboard', icon:Home, label:'Dashboard' },
                    { href:'/dashboard/profile', icon:User, label:'My Profile' },
                    { href:'/dashboard/statistics', icon:BarChart2, label:'Statistics' },
                    { href:'/dashboard/history', icon:Clock, label:'History' },
                  ].map(({ href, icon:Icon, label }) => (
                    <Link key={href} href={href} onClick={() => setDdOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-primary/10 transition-colors font-body">
                      <Icon size={14} className="text-primary" />{label}
                    </Link>
                  ))}
                  <div className="border-t border-primary/15">
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors font-body">
                      <LogOut size={14} />Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 rounded-xl text-sm font-display font-medium text-gray-300 hover:text-white nb glass hover:border-primary/40 transition-all">
                Sign In
              </Link>
              <Link href="/signup" className="btn flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-display font-semibold text-white">
                <Zap size={13} /><span>Get Started</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile burger */}
        <button className="md:hidden p-2 text-gray-400 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-primary/20">
          <div className="px-5 py-4 sxgbe-y-1">
            {PUBLIC_LINKS.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                className={`flex px-4 py-3 rounded-xl text-sm font-display font-medium transition-all ${pathname===l.href ? 'bg-primary/20 text-white nb' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                {l.label}
              </Link>
            ))}
            {PROTECTED_LINKS.map(l => (
              <Link key={l.href} href={l.href} onClick={(e) => { guard(e); setMobileOpen(false) }}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-display font-medium transition-all ${pathname===l.href ? 'bg-primary/20 text-white nb' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                <span>{l.label}</span>
                {!user && <span className="flex items-center gap-1 text-[10px] font-mono text-primary/70 nb px-1.5 py-0.5 rounded"><Lock size={8} />Login</span>}
              </Link>
            ))}
            <div className="pt-3 border-t border-primary/15 sxgbe-y-1">
              {user ? (
                <>
                  {[{href:'/dashboard',label:'Dashboard'},{href:'/dashboard/profile',label:'Profile'}].map(({href,label})=>(
                    <Link key={href} href={href} onClick={()=>setMobileOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-primary/10 rounded-xl transition-colors font-body">{label}</Link>
                  ))}
                  <button onClick={()=>{handleLogout();setMobileOpen(false)}}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-colors font-body">Sign Out</button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={()=>setMobileOpen(false)} className="block px-4 py-3 text-sm font-display font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl">Sign In</Link>
                  <Link href="/signup" onClick={()=>setMobileOpen(false)} className="btn flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-display font-semibold text-white"><Zap size={13}/>Get Started</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
