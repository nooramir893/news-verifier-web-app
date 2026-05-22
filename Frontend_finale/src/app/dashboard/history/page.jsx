'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { AlertTriangle, CheckCircle, Search, ChevronDown, ChevronUp, Calendar, Brain, Zap } from 'lucide-react'

function HistoryCard({ item }) {
  const [open, setOpen] = useState(false)
  const isFake = item.verdict === 'FAKE'
  const date = new Date(item.date)
  const dateStr = date.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})
  const timeStr = date.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})

  return (
    <div className={`glass rounded-2xl border overflow-hidden card transition-all ${isFake?'border-red-500/18':'border-green-500/18'}`}>
      <div className={`h-0.5 ${isFake?'bg-gradient-to-r from-red-600 to-red-400':'bg-gradient-to-r from-green-600 to-neon'}`}/>
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isFake?'bg-red-500/10 border border-red-500/22':'bg-green-500/10 border border-green-500/22'}`}>
            {isFake?<AlertTriangle size={16} className="text-red-400"/>:<CheckCircle size={16} className="text-neon"/>}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="min-w-0">
                <h3 className="font-display font-semibold text-white text-sm leading-tight truncate">{item.title}</h3>
                <p className="text-gray-500 text-xs font-mono mt-0.5 flex items-center gap-1.5">
                  <Calendar size={10}/>{dateStr} · {timeStr}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className={isFake?'badge-fake':'badge-real'}>{item.verdict}</span>
                <p className="text-gray-500 text-xs font-mono mt-1">{item.confidence}%</p>
              </div>
            </div>

            <p className="text-gray-400 text-xs font-body leading-relaxed line-clamp-2">{item.text}</p>

            {/* Mini model bars */}
            <div className="grid grid-cols-4 gap-2 mt-3">
              {Object.entries(item.models).map(([k,v])=>(
                <div key={k}>
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] font-mono text-gray-500 uppercase">{k}</span>
                    <span className={`text-[10px] font-mono ${isFake?'text-red-400':'text-neon'}`}>{v}%</span>
                  </div>
                  <div className="w-full h-1 bg-navy-900 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${isFake?'bg-red-500':'bg-neon'}`} style={{width:`${v}%`}}/>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={()=>setOpen(!open)} className="flex items-center gap-1 text-xs text-primary hover:text-secondary font-mono mt-3 transition-colors">
              {open?<><ChevronUp size={11}/>Show less</>:<><ChevronDown size={11}/>Full article</>}
            </button>

            {open && (
              <div className="mt-3 p-4 bg-navy-900/60 rounded-xl border border-primary/10 fade-up">
                <p className="text-gray-300 text-xs font-body leading-relaxed">{item.text}</p>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-primary/10">
                  <Brain size={10} className="text-primary"/>
                  <span className="text-xs font-mono text-gray-500">{item.wordCount} words analyzed</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HistoryPage() {
  const { history, stats } = useAuth()
  const [search, setSearch]   = useState('')
  const [filter, setFilter]   = useState('all')

  const filtered = history.filter(item => {
    const matchQ = item.title.toLowerCase().includes(search.toLowerCase()) || item.text.toLowerCase().includes(search.toLowerCase())
    const matchF = filter==='all' || item.verdict===filter.toUpperCase()
    return matchQ && matchF
  })

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display font-extrabold text-3xl text-white mb-1">Analysis History</h1>
        <p className="text-gray-400 font-body text-sm">All your past news analyses — {history.length} total</p>
      </div>

      {/* Summary */}
      <div className="flex flex-wrap gap-3 mb-6">
        {[
          {I:Brain,v:stats.total,l:'Analyzed',c:'text-white',b:'border-primary/20'},
          {I:AlertTriangle,v:stats.fake,l:'Fake',c:'text-red-400',b:'border-red-500/20'},
          {I:CheckCircle,v:stats.real,l:'Real',c:'text-neon',b:'border-green-500/20'},
        ].map(({I,v,l,c,b})=>(
          <div key={l} className={`glass border ${b} px-4 py-2 rounded-xl flex items-center gap-2`}>
            <I size={13} className={c}/><span className={`text-sm font-mono ${c}`}>{v}</span><span className="text-xs text-gray-400 font-body">{l}</span>
          </div>
        ))}
      </div>

      {/* Search & filter */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by title or content..."
            className="w-full bg-navy-900/70 border border-primary/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-200 font-body placeholder-gray-600 outline-none focus:border-primary/55 transition-all"/>
        </div>
        <div className="flex gap-2">
          {['all','fake','real'].map(f=>(
            <button key={f} onClick={()=>setFilter(f)}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-widest border transition-all ${
                filter===f
                  ? f==='fake'?'bg-red-500/12 border-red-500/38 text-red-300':f==='real'?'bg-green-500/12 border-green-500/38 text-neon':'bg-primary/18 border-primary/38 text-primary'
                  : 'border-primary/15 text-gray-400 hover:text-white hover:border-primary/28'
              }`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {filtered.length===0 ? (
        <div className="glass nb rounded-2xl p-12 text-center">
          <Search size={32} className="text-primary/25 mx-auto mb-4"/>
          <p className="text-gray-400 font-body mb-3">No analyses match your search.</p>
          <button onClick={()=>{setSearch('');setFilter('all')}} className="text-primary hover:text-secondary text-sm font-mono transition-colors">Clear filters</button>
        </div>
      ) : (
        <div className="sxgbe-y-4">{filtered.map(item=><HistoryCard key={item.id} item={item}/>)}</div>
      )}

      <div className="mt-10 text-center">
        <Link href="/detect" className="btn inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-display font-semibold text-white glow-t">
          <Zap size={15}/>Analyze Another Article
        </Link>
      </div>
    </div>
  )
}
