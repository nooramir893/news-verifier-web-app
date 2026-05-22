import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  Shield, Zap, Brain, ChevronRight, CheckCircle,
  BarChart2, Lock, Globe, ArrowRight, TrendingUp,
  AlertTriangle, Cpu, Eye, FileText
} from 'lucide-react'

const STATS = [
  { value: '5',    label: 'ML Algorithms',    icon: Brain,      color: 'from-teal-700 to-teal-800' },
  { value: '97%+', label: 'Accuracy Rate',    icon: TrendingUp, color: 'from-cyan-600 to-cyan-700' },
  { value: '44K+', label: 'Training Articles',icon: FileText,   color: 'from-teal-800 to-navy-800' },
  { value: '<1s',  label: 'Detection Speed',  icon: Zap,        color: 'from-green-700 to-green-800' },
]

const FEATURES = [
  { icon: Brain,    title: 'Five-Model ML Pipeline',    desc: 'Trains and compares Logistic Regression, Naïve Bayes, SVM, Random Forest, and XGBoost for highest accuracy.', border: 'border-teal-600/25' },
  { icon: Eye,      title: 'TF-IDF Vectorization',      desc: 'Weights unique, meaningful words higher — capturing the linguistic signal that separates real journalism from fabricated content.', border: 'border-cyan-500/25' },
  { icon: Zap,      title: 'Real-Time Predictions',     desc: 'Paste any article and receive a Fake / Real verdict with per-model confidence scores in under a second.', border: 'border-green-500/25' },
  { icon: Globe,    title: 'Full NLP Preprocessing',    desc: 'Tokenization, stop-word removal, stemming and lemmatization ensure clean, standardized features before training.', border: 'border-teal-600/25' },
  { icon: BarChart2,'title': 'Five Evaluation Metrics', desc: 'Accuracy, Precision, Recall, F1-Score, and Confusion Matrix analysis for every trained model.', border: 'border-cyan-500/25' },
  { icon: Lock,     title: 'Kaggle Benchmark Dataset',  desc: 'Trained on the widely-used Kaggle Fake News Dataset — 44,000+ balanced and labeled real and fake news articles.', border: 'border-teal-600/25' },
]

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#020617' }}>
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-screen grid-bg flex items-center overflow-hidden">
        {/* Background radial glows */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px', height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(15,118,110,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}/>
        <div style={{
          position: 'absolute', top: '15%', right: '10%',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(6,182,212,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}/>

        <div className="max-w-7xl mx-auto px-6 pt-28 pb-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass nb px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" style={{ boxShadow: '0 0 8px #22C55E' }}/>
              <span className="text-xs font-mono tracking-widest uppercase" style={{ color: '#5eead4' }}>
                AI · NLP · Machine Learning
              </span>
            </div>

            {/* Headline */}
            <h1 className="mb-6 leading-tight" style={{ fontFamily: 'var(--font-syne)', fontWeight: 800 }}>
              <span className="block text-white" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.5rem)' }}>
                Detect
              </span>
              <span className="block grad" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.5rem)' }}>
                Fake News
              </span>
              <span className="block" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#9ca3af', fontWeight: 600 }}>
                Instantly.
              </span>
            </h1>

            {/* Description */}
            <p className="mb-10 leading-relaxed" style={{
              fontFamily: 'var(--font-dm)', fontSize: '1rem',
              color: '#9ca3af', maxWidth: '480px'
            }}>
              Powered by five ML classifiers and TF-IDF feature extraction,
              News Verifier classifies news as{' '}
              <span style={{ color: '#22C55E', fontWeight: 500 }}>real</span> or{' '}
              <span style={{ color: '#f87171', fontWeight: 500 }}>fake</span> in under a second.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/detect" className="btn flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-sm glow-t"
                style={{ fontFamily: 'var(--font-syne)' }}>
                <Zap size={16} />
                <span>Start Analyzing</span>
              </Link>
              <Link href="/how-it-works"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold nb glass transition-all hover:border-teal-500/50 hover:text-white"
                style={{ fontFamily: 'var(--font-syne)', color: '#d1d5db' }}>
                <span>How It Works</span>
                <ChevronRight size={15} />
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6">
              {['TF-IDF Vectorization', 'Multi-Model Comparison', 'Real-Time Results'].map(t => (
                <div key={t} className="flex items-center gap-2">
                  <CheckCircle size={13} style={{ color: '#22C55E' }} />
                  <span style={{ color: '#9ca3af', fontSize: '0.82rem', fontFamily: 'var(--font-dm)' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Orb */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-72 h-72">
              <div className="absolute inset-0 rounded-full spin-slow" style={{ border: '1px solid rgba(15,118,110,0.2)' }}/>
              <div className="absolute inset-6 rounded-full spin-rev" style={{ border: '1px solid rgba(6,182,212,0.15)' }}/>

              {/* Pulse rings */}
              <div className="absolute pulse-ring rounded-full" style={{
                width: '148px', height: '148px',
                top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                border: '1px solid rgba(15,118,110,0.3)',
              }}/>
              <div className="absolute pulse-ring rounded-full" style={{
                width: '148px', height: '148px',
                top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                border: '1px solid rgba(15,118,110,0.15)',
                animationDelay: '1s',
              }}/>

              {/* Center orb */}
              <div className="absolute float rounded-full flex items-center justify-center glow-t" style={{
                width: '148px', height: '148px',
                top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                background: 'linear-gradient(135deg, #0F766E, #134e4a, #0A1628)',
              }}>
                <Shield size={50} className="text-white" strokeWidth={1.5}/>
              </div>

              {/* Badges */}
              <div className="absolute glass nb-c px-3 py-1.5 rounded-xl flex items-center gap-2"
                style={{ top: '10%', right: '-8%' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
                <span className="text-xs font-mono" style={{ color: '#67e8f9' }}>97%+ Acc</span>
              </div>
              <div className="absolute glass nb px-3 py-1.5 rounded-xl flex items-center gap-2"
                style={{ bottom: '18%', left: '-10%' }}>
                <Cpu size={11} style={{ color: '#2dd4bf' }}/>
                <span className="text-xs font-mono" style={{ color: '#2dd4bf' }}>ML Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: '#6b7280', fontSize: '0.65rem' }}>Scroll</span>
          <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, #0F766E, transparent)' }}/>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(s => {
            const Icon = s.icon
            return (
              <div key={s.label} className="glass nb rounded-2xl p-6 text-center card">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} mx-auto mb-3 flex items-center justify-center`}>
                  <Icon size={19} className="text-white"/>
                </div>
                <p className="text-white mb-1" style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '1.75rem' }}>
                  {s.value}
                </p>
                <p style={{ color: '#9ca3af', fontSize: '0.82rem', fontFamily: 'var(--font-dm)' }}>{s.label}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 glass nb px-4 py-1.5 rounded-full mb-5">
              <span className="text-xs font-mono uppercase tracking-widest" style={{ color: '#2dd4bf' }}>Capabilities</span>
            </div>
            <h2 className="text-white mb-4" style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)' }}>
              What News Verifier <span className="grad">Offers</span>
            </h2>
            <p style={{ color: '#9ca3af', fontFamily: 'var(--font-dm)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              A complete pipeline from raw text to prediction — built with proven NLP and ML techniques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(f => {
              const Icon = f.icon
              return (
                <div key={f.title} className={`glass rounded-2xl p-6 border card ${f.border}`}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(15,118,110,0.15)', border: '1px solid rgba(15,118,110,0.25)' }}>
                    <Icon size={19} style={{ color: '#2dd4bf' }}/>
                  </div>
                  <h3 className="text-white mb-2" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '0.95rem' }}>
                    {f.title}
                  </h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.83rem', fontFamily: 'var(--font-dm)', lineHeight: 1.65 }}>
                    {f.desc}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-10">
            <Link href="/features" className="inline-flex items-center gap-2 font-semibold transition-colors text-sm"
              style={{ fontFamily: 'var(--font-syne)', color: '#2dd4bf' }}>
              View All Features <ArrowRight size={14}/>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="glass nb rounded-3xl p-12 relative overflow-hidden">
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'radial-gradient(ellipse at top, rgba(15,118,110,0.1), transparent 60%)',
            }}/>
            <AlertTriangle size={32} className="mx-auto mb-5" style={{ color: '#2dd4bf' }}/>
            <h2 className="text-white mb-4 relative" style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
              Don't Be Misled by <span className="grad">Fake News</span>
            </h2>
            <p className="mb-8 relative" style={{ color: '#9ca3af', fontFamily: 'var(--font-dm)', maxWidth: '420px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
              Paste any suspicious article and let our AI model tell you if it's real or fabricated in under a second.
            </p>
            <Link href="/detect" className="btn inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white glow-t relative"
              style={{ fontFamily: 'var(--font-syne)' }}>
              <Shield size={16}/>
              <span>Analyze Article Now</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
