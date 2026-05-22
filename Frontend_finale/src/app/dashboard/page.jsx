'use client'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { Zap, Clock, BarChart2, AlertTriangle, CheckCircle, TrendingUp, ArrowRight, Brain } from 'lucide-react'

export default function DashboardPage() {
  const { user, history, stats } = useAuth()
  const firstName = user?.name?.split(' ')[0] || 'User'
  const hour = new Date().getHours()
  const greet = hour<12?'Good morning':hour<17?'Good afternoon':'Good evening'
  const recent = history.slice(0,5)

  const CARDS = [
    { label:'Total Analyzed', value:stats.total, icon:Brain, grad:'from-primary to-teal-700', border:'border-primary/20' },
    { label:'Fake Detected',  value:stats.fake,  icon:AlertTriangle, grad:'from-red-600 to-red-700', border:'border-red-500/20' },
    { label:'Real News',      value:stats.real,  icon:CheckCircle,   grad:'from-green-600 to-green-700', border:'border-green-500/20' },
    { label:'Avg Confidence', value:`${stats.avgConf}%`, icon:TrendingUp, grad:'from-secondary to-cyan-600', border:'border-secondary/20' },
  ]
  const QUICK = [
    { href:'/detect', icon:Zap, label:'Analyze News', sub:'Detect fake news now', grad:'from-primary to-secondary' },
    { href:'/dashboard/history', icon:Clock, label:'View History', sub:`${stats.total} past analyses`, grad:'from-teal-700 to-navy-800' },
    { href:'/dashboard/statistics', icon:BarChart2, label:'Statistics', sub:'Model performance', grad:'from-secondary to-cyan-600' },
  ]

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <div className="mb-10">
        <p className="text-primary font-mono text-sm mb-1">{greet} 👋</p>
        <h1 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-1.5">Welcome back, <span className="grad">{firstName}</span></h1>
        <p className="text-gray-400 font-body text-sm">Here's your fake news detection overview.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {CARDS.map(c=>{
          const Icon = c.icon
          return (
            <div key={c.label} className={`glass rounded-2xl p-5 border ${c.border} card`}>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.grad} flex items-center justify-center mb-3`}><Icon size={17} className="text-white"/></div>
              <p className="font-display font-extrabold text-2xl text-white">{c.value}</p>
              <p className="text-gray-400 text-xs font-body mt-0.5">{c.label}</p>
            </div>
          )
        })}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {QUICK.map(q=>{
          const Icon = q.icon
          return (
            <Link key={q.href} href={q.href} className="group glass nb rounded-2xl p-5 card flex items-center gap-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[.07] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"/>
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${q.grad} flex items-center justify-center flex-shrink-0`}><Icon size={19} className="text-white"/></div>
              <div className="relative z-10">
                <p className="font-display font-bold text-white text-sm">{q.label}</p>
                <p className="text-gray-400 text-xs font-body">{q.sub}</p>
              </div>
              <ArrowRight size={14} className="text-primary ml-auto relative z-10 group-hover:translate-x-1 transition-transform"/>
            </Link>
          )
        })}
      </div>

      {/* Recent */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-bold text-xl text-white">Recent Analyses</h2>
          <Link href="/dashboard/history" className="text-sm text-primary hover:text-secondary font-body transition-colors flex items-center gap-1">View all<ArrowRight size={12}/></Link>
        </div>
        <div className="sxgbe-y-3">
          {recent.map(item=>(
            <div key={item.id} className="glass nb rounded-xl p-4 flex items-start gap-4 card">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${item.verdict==='FAKE'?'bg-red-500/12 border border-red-500/22':'bg-green-500/12 border border-green-500/22'}`}>
                {item.verdict==='FAKE'?<AlertTriangle size={15} className="text-red-400"/>:<CheckCircle size={15} className="text-neon"/>}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-semibold text-white text-sm truncate">{item.title}</p>
                <p className="text-gray-500 text-xs font-body mt-0.5 truncate">{item.text.slice(0,90)}...</p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className={`text-xs font-mono font-bold ${item.verdict==='FAKE'?'text-red-400':'text-neon'}`}>{item.verdict}</span>
                <p className="text-gray-500 text-xs font-mono">{item.confidence}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
