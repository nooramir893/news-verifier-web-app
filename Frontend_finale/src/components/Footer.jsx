import Link from 'next/link'
import { Shield } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-primary/15 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center"><Shield size={15} className="text-white"/></div>
            <span className="font-display font-extrabold text-white">News<span className="grad-cyan">Verifier</span></span>
          </Link>
          <p className="text-gray-400 text-sm font-body leading-relaxed max-w-xs">AI-powered fake news detection using ML & NLP. Final Year Project — {new Date().getFullYear()}.</p>
        </div>
        <div>
          <p className="font-display font-semibold text-white text-sm mb-4">Navigation</p>
          <ul className="sxgbe-y-2.5">
            {['Home','Detect','How It Works','Features'].map(n=>(
              <li key={n}><Link href={n==='Home'?'/':`/${n.toLowerCase().replace(/ /g,'-')}`} className="text-gray-400 hover:text-primary text-sm font-body transition-colors">{n}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-display font-semibold text-white text-sm mb-4">Tech Stack</p>
          <ul className="sxgbe-y-2">
            {['Python · scikit-learn','TF-IDF Vectorizer','SVM · Naïve Bayes','Next.js 14 · React 18','Tailwind CSS'].map(t=>(
              <li key={t} className="text-gray-500 text-xs font-mono">{t}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-primary/10 py-5 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-gray-600 text-xs font-body">© {new Date().getFullYear()} News Verifier · FYP · Fake News Detection</p>
        <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-neon animate-pulse"/><span className="text-gray-600 text-xs font-mono">ML Model Active</span></div>
      </div>
    </footer>
  )
}
