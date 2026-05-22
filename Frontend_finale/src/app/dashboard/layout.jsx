'use client'
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { Shield, Home, User, BarChart2, Clock, Zap, LogOut, ChevronRight } from 'lucide-react'

const LINKS = [
  { href:'/dashboard', icon:Home, label:'Dashboard' },
  { href:'/dashboard/profile', icon:User, label:'My Profile' },
  { href:'/dashboard/statistics', icon:BarChart2, label:'Statistics' },
  { href:'/dashboard/history', icon:Clock, label:'History' },
]

export default function DashboardLayout({ children }) {
  const { user, logout, loading } = useAuth()
  const router   = useRouter()
  const pathname = usePathname()

  useEffect(() => { if(!loading && !user) router.push('/login') }, [user,loading,router])

  if(loading || !user) return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-11 h-11 border-2 border-primary/25 border-t-primary rounded-full animate-spin"/>
        <p className="text-gray-500 font-mono text-sm">Loading...</p>
      </div>
    </div>
  )

  const initials = user.name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2)

  return (
    <div className="min-h-screen bg-navy-950 flex">
      

      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 fixed top-0 left-0 h-full glass border-r border-primary/15 z-40">
        <div className="px-5 py-4 border-b border-primary/15">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-t"><Shield size={15} className="text-white"/></div>
            <span className="font-display font-extrabold text-lg text-white">News<span className="grad-cyan">Verifier</span></span>
          </Link>
        </div>

        <div className="px-4 py-4 border-b border-primary/15">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/[.07] border border-primary/15">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-display font-bold text-xs flex-shrink-0">{initials}</div>
            <div className="min-w-0">
              <p className="text-white font-display font-semibold text-sm truncate">{user.name}</p>
              <p className="text-gray-500 font-mono text-xs truncate">{user.email}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 sxgbe-y-0.5">
          {LINKS.map(({href,icon:Icon,label})=>{
            const active = pathname===href
            return (
              <Link key={href} href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-display font-medium transition-all group ${active?'bg-primary/20 text-white border border-primary/28':'text-gray-400 hover:text-white hover:bg-primary/10'}`}>
                <Icon size={15} className={active?'text-primary':'text-gray-500 group-hover:text-primary transition-colors'}/>
                {label}
                {active && <ChevronRight size={12} className="ml-auto text-primary"/>}
              </Link>
            )
          })}
          <div className="pt-3 border-t border-primary/12 mt-2">
            <Link href="/detect" className="btn flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-display font-semibold text-white glow-t">
              <Zap size={14}/>Analyze News
            </Link>
          </div>
        </nav>

        <div className="px-3 py-4 border-t border-primary/15">
          <button onClick={()=>{logout();router.push('/')}}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all font-body">
            <LogOut size={14}/>Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed inset-x-0 top-0 z-40 glass border-b border-primary/15 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center"><Shield size={14} className="text-white"/></div>
          <span className="font-display font-bold text-white">News Verifier</span>
        </Link>
        <div className="flex items-center gap-1">
          {LINKS.map(({href,icon:Icon})=>(
            <Link key={href} href={href} className={`p-2 rounded-lg transition-colors ${pathname===href?'bg-primary/20 text-primary':'text-gray-500 hover:text-gray-300'}`}>
              <Icon size={15}/>
            </Link>
          ))}
        </div>
      </div>

      <main className="flex-1 md:ml-60 pt-16 md:pt-0 min-h-screen">{children}</main>
    </div>
  )
}
