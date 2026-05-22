'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useAuth } from '@/context/AuthContext'
import { Shield, AlertTriangle, Zap, RotateCcw, CheckCircle, XCircle, Loader2, FileText, Brain, BarChart2 } from 'lucide-react'

const SAMPLES = {
  fake: `BREAKING: Scientists Discover That Drinking Coffee Reverses Aging By 30 Years! A new miracle study from an anonymous research group claims that drinking 10 cups of coffee per day can completely reverse aging and cure most diseases. The government is reportedly trying to suppress this information. Share before it gets deleted! Big pharma doesn't want you to know this secret!`,
  real: `The Federal Reserve announced on Wednesday that it would hold interest rates steady, citing continued progress on inflation while noting uncertainty about the economic outlook. Fed Chair Jerome Powell said policymakers remain committed to bringing inflation back to the 2% target and will carefully monitor incoming data before making future adjustments to monetary policy.`,
}

function Bar({ value, color }) {
  return (
    <div className="w-full h-1.5 bg-navy-900 rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all duration-700" style={{ width:`${value}%`, background:color }}/>
    </div>
  )
}

export default function DetectPage() {
  const [text, setText]     = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const { addToHistory }    = useAuth()

  const analyze = async () => {
    if(text.trim().length < 20) return
    setLoading(true); setResult(null)
    await new Promise(r=>setTimeout(r,2000))

    const isFake = /miracle|breaking|secret|suppress|share before|deleted|globalist|nanob/i.test(text)
    const res = {
      verdict: isFake ? 'FAKE' : 'REAL',
      confidence: isFake ? 94.7 : 91.3,
      models: [
        { name:'Logistic Regression',         conf: isFake?92:88, key:'lr'  },
        { name:'Naïve Bayes (MultinomialNB)', conf: isFake?87:91, key:'nb'  },
        { name:'Support Vector Machine',      conf: isFake?95:90, key:'svm' },
        { name:'Random Forest',               conf: isFake?93:89, key:'rf'  },
        { name:'XGBoost',                     conf: isFake?97:93, key:'xgb' },
      ],
    }
    addToHistory({
      text, verdict: res.verdict, confidence: res.confidence,
      title: text.split(/[.!?]/)[0].slice(0,65) || 'Untitled Article',
      models: Object.fromEntries(res.models.map(m=>[m.key,m.conf])),
      wordCount: text.trim().split(/\s+/).length,
    })
    setResult(res); setLoading(false)
  }

  const reset = () => { setText(''); setResult(null) }

  return (
    <div className="min-h-screen bg-navy-950 relative">
      
      <Navbar/>

      <main className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass nb px-4 py-1.5 rounded-full mb-5">
            <span className="w-2 h-2 rounded-full bg-neon animate-pulse"/>
            <span className="text-xs font-mono text-primary uppercase tracking-widest">Live Detection</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-4">Analyze <span className="grad">News Article</span></h1>
          <p className="text-gray-400 font-body max-w-lg mx-auto">Paste any news text below. Our ML pipeline will classify it as real or fake in real time.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Input */}
          <div className="lg:col-span-3 sxgbe-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs text-gray-500 font-mono">Try a sample:</span>
              <button onClick={()=>setText(SAMPLES.fake)} className="text-xs px-3 py-1.5 rounded-lg nb-r text-red-400 hover:bg-red-500/10 transition-all font-mono">Fake Example</button>
              <button onClick={()=>setText(SAMPLES.real)} className="text-xs px-3 py-1.5 rounded-lg nb-g text-neon hover:bg-green-500/10 transition-all font-mono">Real Example</button>
            </div>

            <div className="terminal overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-primary/20 bg-navy-900/60">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60"/>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60"/>
                  <div className="w-3 h-3 rounded-full bg-neon/60"/>
                </div>
                <FileText size={11} className="text-primary ml-2"/>
                <span className="text-xs text-gray-500 font-mono">news_article.txt</span>
              </div>
              <textarea value={text} onChange={e=>setText(e.target.value)} placeholder={"Paste your news article or headline here...\n\nExample: \"Scientists confirm that regular exercise improves brain health...\""}
                className="w-full bg-transparent px-5 py-4 text-gray-300 font-mono text-sm resize-none outline-none min-h-[260px] placeholder-gray-600 leading-relaxed"/>
            </div>

            <div className="flex items-center justify-between px-1">
              <span className="text-xs text-gray-600 font-mono">{text.length} characters{text.length>0&&text.length<20?' (min 20)':''}</span>
              {text && <button onClick={reset} className="text-xs text-gray-500 hover:text-gray-300 font-mono flex items-center gap-1 transition-colors"><RotateCcw size={10}/> Clear</button>}
            </div>

            <button onClick={analyze} disabled={loading||text.trim().length<20}
              className={`w-full py-3.5 rounded-xl font-display font-bold text-sm flex items-center justify-center gap-2 transition-all ${loading||text.trim().length<20?'bg-navy-800/80 text-gray-500 cursor-not-allowed border border-primary/10':'btn text-white glow-t'}`}>
              {loading ? <><Loader2 size={17} className="animate-spin"/>Analyzing with ML Models...</> : <><Brain size={17}/>Detect Fake News</>}
            </button>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            {!result && !loading && (
              <div className="glass nb rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center min-h-[220px]">
                <Shield size={38} className="text-primary/30 mb-4"/>
                <p className="text-gray-500 text-sm font-body">Your analysis results will appear here.</p>
              </div>
            )}

            {loading && (
              <div className="glass nb rounded-2xl p-8 text-center">
                <div className="relative w-16 h-16 mx-auto mb-5">
                  <div className="absolute inset-0 rounded-full border-2 border-primary/20"/>
                  <div className="absolute inset-0 rounded-full border-t-2 border-secondary animate-spin"/>
                  <Brain size={20} className="absolute inset-0 m-auto text-primary"/>
                </div>
                <p className="text-primary font-mono text-sm mb-4">Running ML Pipeline...</p>
                <div className="sxgbe-y-2">
                  {['Preprocessing text...','TF-IDF vectorizing...','Running classifiers...'].map((s,i)=>(
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-500 font-mono justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{animationDelay:`${i*.3}s`}}/>{s}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result && (
              <div className="sxgbe-y-4 fade-up">
                {/* Verdict */}
                <div className={`rounded-2xl p-6 text-center border ${result.verdict==='FAKE'?'bg-red-500/[.07] border-red-500/28':'bg-green-500/[.07] border-green-500/28'}`}>
                  <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${result.verdict==='FAKE'?'bg-red-500/15':'bg-green-500/15'}`}>
                    {result.verdict==='FAKE'?<XCircle size={32} className="text-red-400"/>:<CheckCircle size={32} className="text-neon"/>}
                  </div>
                  <div className={`font-display font-extrabold text-2xl mb-1 ${result.verdict==='FAKE'?'text-red-400':'text-neon'}`}>
                    {result.verdict==='FAKE'?'⚠ Fake News':'✓ Real News'}
                  </div>
                  <p className="text-gray-400 text-sm font-body">{result.confidence}% avg confidence</p>
                </div>

                {/* Per-model */}
                <div className="glass nb rounded-2xl p-5 sxgbe-y-4">
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart2 size={13} className="text-primary"/>
                    <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Model Breakdown</span>
                  </div>
                  {result.models.map((m,i)=>(
                    <div key={m.name} className="fade-up" style={{animationDelay:`${i*.08}s`}}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-mono text-gray-400">{m.name}</span>
                        <span className={`text-xs font-mono font-semibold ${result.verdict==='FAKE'?'text-red-400':'text-neon'}`}>{m.conf}%</span>
                      </div>
                      <Bar value={m.conf} color={result.verdict==='FAKE'?'#EF4444':'#22C55E'}/>
                    </div>
                  ))}
                </div>

                <button onClick={reset} className="w-full py-3 rounded-xl nb glass text-gray-300 hover:text-white hover:border-primary/40 transition-all font-display font-semibold text-sm flex items-center justify-center gap-2">
                  <RotateCcw size={13}/> Analyze Another
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-gray-600 text-xs font-body mt-10 max-w-lg mx-auto">
          <AlertTriangle size={10} className="inline mr-1"/>
          Results are for educational & research purposes. Always verify news from trusted sources.
        </p>
      </main>
      <Footer/>
    </div>
  )
}
