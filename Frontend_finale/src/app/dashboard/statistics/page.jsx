'use client'
import { useAuth } from '@/context/AuthContext'
import { TrendingUp, AlertTriangle, CheckCircle, Brain, BarChart2, Target } from 'lucide-react'

const MODELS = [
  { name:'XGBoost',                       acc:97.2, color:'#22C55E' },
  { name:'Support Vector Machine (SVM)',  acc:95.8, color:'#06B6D4' },
  { name:'Random Forest',                 acc:94.1, color:'#8B5CF6' },
  { name:'Logistic Regression',           acc:92.6, color:'#0F766E' },
  { name:'Naïve Bayes (MultinomialNB)',   acc:90.3, color:'#14B8A6' },
]
const WEEK = [
  {d:'Mon',f:1,r:1},{d:'Tue',f:2,r:0},{d:'Wed',f:0,r:1},
  {d:'Thu',f:1,r:1},{d:'Fri',f:1,r:0},{d:'Sat',f:0,r:1},{d:'Sun',f:1,r:0},
]

function Donut({ fake, real }) {
  const total = fake+real || 1
  const r=54, circ=2*Math.PI*r
  const fD=(fake/total)*circ, rD=(real/total)*circ
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-44 h-44">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r={r} fill="none" stroke="#0A1628" strokeWidth="11"/>
          <circle cx="60" cy="60" r={r} fill="none" stroke="#22C55E" strokeWidth="11" strokeDasharray={`${rD} ${circ}`} strokeLinecap="round"/>
          <circle cx="60" cy="60" r={r} fill="none" stroke="#EF4444" strokeWidth="11" strokeDasharray={`${fD} ${circ}`} strokeDashoffset={-rD} strokeLinecap="round"/>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display font-extrabold text-2xl text-white">{fake+real}</span>
          <span className="text-gray-500 text-xs font-mono">total</span>
        </div>
      </div>
      <div className="flex gap-5 mt-3">
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-neon"/><span className="text-xs text-gray-400 font-body">Real ({real})</span></div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"/><span className="text-xs text-gray-400 font-body">Fake ({fake})</span></div>
      </div>
    </div>
  )
}

export default function StatisticsPage() {
  const { stats } = useAuth()
  const maxBar = 3

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display font-extrabold text-3xl text-white mb-1">Statistics</h1>
        <p className="text-gray-400 font-body text-sm">Your detection activity and ML model performance</p>
      </div>

      {/* Top cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {l:'Total Analyzed',v:stats.total,I:Brain,g:'from-primary to-teal-700',b:'border-primary/20'},
          {l:'Fake Detected', v:stats.fake, I:AlertTriangle,g:'from-red-600 to-red-700',b:'border-red-500/20'},
          {l:'Real Verified', v:stats.real, I:CheckCircle,  g:'from-green-600 to-green-700',b:'border-green-500/20'},
          {l:'Avg Confidence',v:`${stats.avgConf}%`,I:Target,g:'from-secondary to-cyan-600',b:'border-secondary/20'},
        ].map(({l,v,I,g,b})=>(
          <div key={l} className={`glass rounded-2xl p-5 border ${b}`}>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${g} flex items-center justify-center mb-3`}><I size={17} className="text-white"/></div>
            <p className="font-display font-extrabold text-2xl text-white">{v}</p>
            <p className="text-gray-400 text-xs font-body mt-0.5">{l}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Donut */}
        <div className="glass nb rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6"><BarChart2 size={15} className="text-primary"/><h2 className="font-display font-bold text-white">Real vs Fake Distribution</h2></div>
          <div className="flex justify-center"><Donut fake={stats.fake} real={stats.real}/></div>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="bg-red-500/[.06] border border-red-500/18 rounded-xl p-4 text-center">
              <p className="font-display font-extrabold text-red-400 text-2xl">{stats.fakePercent}%</p>
              <p className="text-gray-400 text-xs font-body mt-1">Fake Rate</p>
            </div>
            <div className="bg-green-500/[.06] border border-green-500/18 rounded-xl p-4 text-center">
              <p className="font-display font-extrabold text-neon text-2xl">{100-stats.fakePercent}%</p>
              <p className="text-gray-400 text-xs font-body mt-1">Real Rate</p>
            </div>
          </div>
        </div>

        {/* Weekly bar */}
        <div className="glass nb rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6"><TrendingUp size={15} className="text-primary"/><h2 className="font-display font-bold text-white">Weekly Activity</h2></div>
          <div className="flex items-end gap-2 h-36">
            {WEEK.map(({d,f,r})=>(
              <div key={d} className="flex-1 flex flex-col items-center gap-1">
                <div className="flex gap-0.5 items-end w-full justify-center">
                  <div className="w-3.5 rounded-t bg-neon/65 transition-all" style={{height:`${Math.max((r/maxBar)*100,4)}px`}}/>
                  <div className="w-3.5 rounded-t bg-red-500/65 transition-all" style={{height:`${Math.max((f/maxBar)*100,4)}px`}}/>
                </div>
                <span className="text-[10px] text-gray-500 font-mono">{d}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-5 mt-4">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-neon/65"/><span className="text-xs text-gray-400 font-body">Real</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-red-500/65"/><span className="text-xs text-gray-400 font-body">Fake</span></div>
          </div>
        </div>
      </div>

      {/* Model accuracy */}
      <div className="glass nb rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6"><Brain size={15} className="text-primary"/><h2 className="font-display font-bold text-white">ML Model Accuracy Comparison</h2></div>
        <div className="sxgbe-y-5">
          {MODELS.map(m=>(
            <div key={m.name}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-mono text-gray-300">{m.name}</span>
                <span className="text-sm font-mono font-semibold" style={{color:m.color}}>{m.acc}%</span>
              </div>
              <div className="w-full h-2 bg-navy-900 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700" style={{width:`${m.acc}%`,background:m.color}}/>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-primary/12 flex items-center justify-between text-xs font-mono">
          <span className="text-gray-500">Best model deployed</span>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-neon animate-pulse"/><span className="text-neon">XGBoost — 97.2%</span></div>
        </div>
      </div>
    </div>
  )
}
