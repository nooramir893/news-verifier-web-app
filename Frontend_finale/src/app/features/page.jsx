import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import {
  Brain, Eye, Zap, BarChart2, Lock, Globe,
  Database, Shield, Code2, Layers, Target, Clock,
  CheckCircle, ArrowRight
} from 'lucide-react'

const mainFeatures = [
  {
    icon: Brain,
    title: 'Multi-Algorithm ML Pipeline',
    description: 'News Verifier doesn\'t rely on a single model. It trains and evaluates four distinct machine learning algorithms and selects the best performer — giving you the most accurate classification possible.',
    bullets: ['Logistic Regression', 'Naïve Bayes (MultinomialNB)', 'Support Vector Machine (SVM)', 'XGBoost'],
    color: 'from-teal-600 to-teal-700',
    accent: '#0F766E',
  },
  {
    icon: Eye,
    title: 'TF-IDF Feature Engineering',
    description: 'Term Frequency–Inverse Document Frequency gives more weight to unique, meaningful words in an article — enabling models to distinguish editorial quality from fabricated clickbait.',
    bullets: ['Word importance scoring', 'N-gram support (1 to 2 grams)', 'Dimensionality control', 'Sparse matrix optimization'],
    color: 'from-cyan-500 to-cyan-600',
    accent: '#06B6D4',
  },
  {
    icon: Globe,
    title: 'Full NLP Preprocessing',
    description: 'Text is fully cleaned and normalized before entering the pipeline — removing noise, standardizing format, and isolating the linguistic signal that separates real journalism from misinformation.',
    bullets: ['Tokenization', 'Stop-word removal', 'Stemming & lemmatization', 'Punctuation stripping'],
    color: 'from-teal-700 to-navy-800',
    accent: '#0F766E',
  },
  {
    icon: BarChart2,
    title: 'Rigorous Model Evaluation',
    description: 'Every model is evaluated against a held-out test set using five performance metrics. This ensures the final deployed model is not just accurate — but robust and reliable.',
    bullets: ['Accuracy score', 'Precision & Recall', 'F1-Score (harmonic mean)', 'Confusion Matrix analysis'],
    color: 'from-cyan-600 to-teal-600',
    accent: '#06B6D4',
  },
]

const smallFeatures = [
  { icon: Zap, title: 'Real-Time Predictions', description: 'Analyze any news text and receive a verdict in under 1 second via the live web app.' },
  { icon: Database, title: 'Kaggle Benchmark Dataset', description: 'Trained on the gold-standard Kaggle Fake News Dataset with 44,000+ labeled articles.' },
  { icon: Shield, title: 'Binary Classification', description: 'Clean, clear output — news is labeled as either Real or Fake with a confidence score.' },
  { icon: Code2, title: 'Flask REST API', description: 'Backend built with Flask, exposing a clean API that the frontend calls for live predictions.' },
  { icon: Layers, title: 'Component Architecture', description: 'Frontend built in Next.js with reusable components, clean routing, and full responsiveness.' },
  { icon: Target, title: 'High Precision Output', description: 'SVM and XGBoost consistently achieve 95%+ accuracy on test data.' },
  { icon: Lock, title: 'Academic-Grade Research', description: 'Methodology based on published NLP & ML research; suitable for FYP academic evaluation.' },
  { icon: Clock, title: 'Scalable Architecture', description: 'Model serialized with pickle/joblib for fast loading — no retraining needed per request.' },
]

function MainFeatureCard({ feature }) {
  const Icon = feature.icon
  return (
    <div className="glass neon-border rounded-2xl p-8 card-hover relative overflow-hidden group">
      <div
        className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-8 transition-opacity duration-500"
        style={{ background: feature.accent }}
      />
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={26} className="text-white" />
      </div>
      <h3 className="font-display font-700 text-white text-xl mb-3">{feature.title}</h3>
      <p className="text-gray-400 font-body text-sm leading-relaxed mb-5">{feature.description}</p>
      <ul className="sxgbe-y-2">
        {feature.bullets.map((b) => (
          <li key={b} className="flex items-center gap-2 text-sm text-gray-300">
            <CheckCircle size={13} className="text-teal-400 flex-shrink-0" />
            <span className="font-body">{b}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SmallFeatureCard({ feature }) {
  const Icon = feature.icon
  return (
    <div className="glass neon-border rounded-xl p-5 card-hover group">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-teal-600/15 border border-teal-600/25 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-600/25 transition-colors duration-300">
          <Icon size={18} className="text-teal-400" />
        </div>
        <div>
          <h4 className="font-display font-600 text-white text-sm mb-1.5">{feature.title}</h4>
          <p className="text-gray-400 text-xs font-body leading-relaxed">{feature.description}</p>
        </div>
      </div>
    </div>
  )
}

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-navy-950 relative">
      <div className="noise-overlay" />
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass neon-border px-4 py-1.5 rounded-full mb-5">
            <span className="text-xs font-mono text-teal-300 uppercase tracking-widest">System Overview</span>
          </div>
          <h1 className="font-display font-800 text-4xl md:text-5xl text-white mb-5">
            Features &{' '}
            <span className="gradient-text">Capabilities</span>
          </h1>
          <p className="text-gray-400 font-body max-w-xl mx-auto leading-relaxed">
            News Verifier combines proven NLP techniques with multiple ML classifiers, xgbkaged into a modern, accessible web application.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {mainFeatures.map((f) => (
            <MainFeatureCard key={f.title} feature={f} />
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-teal-600/15" />
          <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Additional Capabilities</span>
          <div className="flex-1 h-px bg-teal-600/15" />
        </div>

        {/* Small Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {smallFeatures.map((f) => (
            <SmallFeatureCard key={f.title} feature={f} />
          ))}
        </div>

        {/* Model Comparison Table */}
        <div className="mb-16">
          <h2 className="font-display font-800 text-2xl text-white mb-6 text-center">
            ML Model <span className="gradient-text">Comparison</span>
          </h2>
          <div className="glass neon-border rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-teal-600/20">
                  <th className="text-left px-6 py-4 text-xs font-mono text-gray-400 uppercase tracking-widest">Algorithm</th>
                  <th className="text-center px-4 py-4 text-xs font-mono text-gray-400 uppercase tracking-widest">Accuracy</th>
                  <th className="text-center px-4 py-4 text-xs font-mono text-gray-400 uppercase tracking-widest">Speed</th>
                  <th className="text-center px-4 py-4 text-xs font-mono text-gray-400 uppercase tracking-widest">Best For</th>
                  <th className="text-center px-4 py-4 text-xs font-mono text-gray-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Logistic Regression', accuracy: '~93%', speed: 'Fast', best: 'Baseline', active: false },
                  { name: 'Naïve Bayes', accuracy: '~91%', speed: 'Very Fast', best: 'Text classif.', active: false },
                  { name: 'SVM (LinearSVC)', accuracy: '~96%', speed: 'Fast', best: 'High-dim data', active: true },
                  { name: 'XGBoost', accuracy: '~97%', speed: 'Very Fast', best: 'Online learning', active: false },
                ].map((row, i) => (
                  <tr
                    key={row.name}
                    className={`border-b border-teal-600/10 last:border-0 transition-colors hover:bg-teal-600/5 ${row.active ? 'bg-teal-600/8' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="font-display font-600 text-white text-sm">{row.name}</span>
                        {row.active && (
                          <span className="text-[10px] font-mono text-neon bg-green-500/15 border border-green-500/25 px-2 py-0.5 rounded-full">
                            Deployed
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`font-mono text-sm font-500 ${row.active ? 'text-neon' : 'text-teal-300'}`}>{row.accuracy}</span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-gray-400 text-sm font-mono">{row.speed}</span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-gray-400 text-xs font-body">{row.best}</span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className={`w-2 h-2 rounded-full mx-auto ${row.active ? 'bg-neon animate-pulse' : 'bg-gray-600'}`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/detect"
            className="btn-primary inline-flex items-center gap-3 px-8 py-4 rounded-xl font-display font-700 text-white text-base glow-teal"
          >
            <Shield size={18} />
            <span>Try the Detector</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
