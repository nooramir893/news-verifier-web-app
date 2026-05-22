import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import {
  Database, Scissors, Hash, Brain, BarChart2,
  Globe, ArrowRight, CheckCircle, Zap
} from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Database,
    title: 'Dataset Loading',
    subtitle: 'Kaggle Fake News Dataset',
    color: 'text-teal-400',
    borderColor: 'border-teal-600/40',
    bgColor: 'bg-teal-600/10',
    description:
      'The system loads the Kaggle Fake News Dataset containing thousands of labeled news articles. Each row contains a title, article text, subject, and a binary label: 0 for Fake, 1 for Real.',
    details: ['44,000+ labeled articles', 'Balanced real & fake samples', 'Title + Text columns used', 'Labels: 0 = Fake, 1 = Real'],
    code: `df = pd.read_csv("fake_news.csv")
df = df[["title", "text", "label"]]
df.dropna(inplace=True)`,
  },
  {
    number: '02',
    icon: Scissors,
    title: 'NLP Preprocessing',
    subtitle: 'Text Cleaning & Normalization',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/40',
    bgColor: 'bg-cyan-500/10',
    description:
      'Raw text is cleaned and standardized using Natural Language Processing. This removes noise and ensures the model focuses on meaningful linguistic patterns.',
    details: ['Lowercase conversion', 'Punctuation & symbol removal', 'Tokenization (word splitting)', 'Stop-word removal', 'Stemming & lemmatization'],
    code: `import nltk
from nltk.corpus import stopwords

def preprocess(text):
    text = text.lower()
    text = re.sub(r"[^a-z\\s]", "", text)
    tokens = nltk.word_tokenize(text)
    tokens = [w for w in tokens if w not in stopwords]
    return " ".join(tokens)`,
  },
  {
    number: '03',
    icon: Hash,
    title: 'TF-IDF Vectorization',
    subtitle: 'Feature Extraction',
    color: 'text-neon',
    borderColor: 'border-green-500/40',
    bgColor: 'bg-green-500/10',
    description:
      'Cleaned text is converted into numerical feature vectors using TF-IDF. Words that appear often in a document but rarely across all documents receive higher weights — capturing what makes each article unique.',
    details: ['Term Frequency (TF)', 'Inverse Document Frequency (IDF)', 'High weight = unique, important words', 'Low weight = common words (the, and)'],
    code: `from sklearn.feature_extraction.text import TfidfVectorizer

tfidf = TfidfVectorizer(max_features=5000, ngram_range=(1,2))
X_train = tfidf.fit_transform(train_texts)
X_test = tfidf.transform(test_texts)`,
  },
  {
    number: '04',
    icon: Brain,
    title: 'Model Training',
    subtitle: 'ML Classifier Pipeline',
    color: 'text-teal-300',
    borderColor: 'border-teal-500/40',
    bgColor: 'bg-teal-500/10',
    description:
      'Four machine learning classifiers are trained on the TF-IDF feature matrix. Each model learns to distinguish between fake and real news based on word patterns and writing style.',
    details: ['Logistic Regression', 'Naïve Bayes (MultinomialNB)', 'Support Vector Machine (SVM)', 'XGBoost'],
    code: `from sklearn.linear_model import LogisticRegression, XGBClassifier
from sklearn.svm import LinearSVC
from sklearn.naive_bayes import MultinomialNB

models = {
  "LR": LogisticRegression(),
  "NB": MultinomialNB(),
  "SVM": LinearSVC(),
  "XGB": XGBClassifier()
}
for name, model in models.items():
    model.fit(X_train, y_train)`,
  },
  {
    number: '05',
    icon: BarChart2,
    title: 'Evaluation',
    subtitle: 'Performance Metrics',
    color: 'text-cyan-300',
    borderColor: 'border-cyan-400/40',
    bgColor: 'bg-cyan-400/10',
    description:
      'Each model is rigorously evaluated on a held-out test set using standard classification metrics. The best-performing model is selected for deployment in the web application.',
    details: ['Accuracy score', 'Precision & Recall', 'F1-Score', 'Confusion Matrix'],
    code: `from sklearn.metrics import accuracy_score, f1_score, classification_report

y_pred = model.predict(X_test)
print(accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))`,
  },
  {
    number: '06',
    icon: Globe,
    title: 'Web Deployment',
    subtitle: 'Flask API + Next.js',
    color: 'text-neon',
    borderColor: 'border-green-500/40',
    bgColor: 'bg-green-500/10',
    description:
      'The best-performing model is serialized and deployed via a Flask REST API. The Next.js frontend sends user-submitted text to the API, receives a prediction, and displays the result in real time.',
    details: ['Model saved with pickle/joblib', 'Flask REST API endpoint', 'CORS enabled for frontend', 'Next.js fetches prediction', 'Result displayed instantly'],
    code: `from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)
model = pickle.load(open("model.pkl", "rb"))
vectorizer = pickle.load(open("tfidf.pkl", "rb"))

@app.route("/predict", methods=["POST"])
def predict():
    text = request.json["text"]
    vec = vectorizer.transform([text])
    pred = model.predict(vec)[0]
    return jsonify({"label": int(pred)})`,
  },
]

function StepCard({ step, index }) {
  const Icon = step.icon
  const isEven = index % 2 === 1

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
      {/* Text side */}
      <div className={isEven ? 'lg:order-2' : ''}>
        <div className="flex items-center gap-4 mb-5">
          <span className={`font-display font-800 text-6xl ${step.color} opacity-25 step-glow leading-none`}>
            {step.number}
          </span>
          <div className={`w-12 h-12 rounded-xl ${step.bgColor} border ${step.borderColor} flex items-center justify-center`}>
            <Icon size={22} className={step.color} />
          </div>
        </div>

        <h3 className="font-display font-800 text-2xl text-white mb-1">{step.title}</h3>
        <p className={`text-sm font-mono mb-4 ${step.color}`}>{step.subtitle}</p>
        <p className="text-gray-400 text-sm leading-relaxed font-body mb-5">{step.description}</p>

        <ul className="sxgbe-y-2">
          {step.details.map((d) => (
            <li key={d} className="flex items-center gap-2 text-sm text-gray-300 font-body">
              <CheckCircle size={13} className={step.color} />
              {d}
            </li>
          ))}
        </ul>
      </div>

      {/* Code side */}
      <div className={isEven ? 'lg:order-1' : ''}>
        <div className="terminal rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-teal-600/20 bg-navy-900/70">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-neon/60" />
            </div>
            <span className="text-xs text-gray-500 font-mono ml-2">step_{step.number}.py</span>
          </div>
          <pre className="px-5 py-5 text-xs text-gray-300 font-mono overflow-x-auto leading-relaxed whitesxgbe-pre-wrap">
            <code>{step.code}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-navy-950 relative">
      <div className="noise-overlay" />
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 glass neon-border px-4 py-1.5 rounded-full mb-5">
            <span className="text-xs font-mono text-teal-300 uppercase tracking-widest">ML Pipeline</span>
          </div>
          <h1 className="font-display font-800 text-4xl md:text-5xl text-white mb-5">
            How <span className="gradient-text">News Verifier</span> Works
          </h1>
          <p className="text-gray-400 font-body max-w-xl mx-auto text-base leading-relaxed">
            A complete step-by-step breakdown of the machine learning pipeline — from raw dataset to real-time web predictions.
          </p>
        </div>

        {/* Pipeline steps */}
        <div className="sxgbe-y-24">
          {steps.map((step, i) => (
            <div key={step.number}>
              <StepCard step={step} index={i} />
              {i < steps.length - 1 && (
                <div className="flex justify-center mt-14">
                  <div className="flex flex-col items-center gap-2 opacity-30">
                    <div className="w-px h-10 bg-gradient-to-b from-teal-600 to-transparent" />
                    <ArrowRight size={14} className="text-teal-600 rotate-90" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-20 pt-16 border-t border-teal-600/15">
          <h2 className="font-display font-800 text-3xl text-white mb-4">
            Ready to try it yourself?
          </h2>
          <p className="text-gray-400 font-body mb-8">
            Paste any news article and watch the pipeline classify it in real time.
          </p>
          <Link
            href="/detect"
            className="btn-primary inline-flex items-center gap-3 px-8 py-4 rounded-xl font-display font-700 text-white text-base glow-teal"
          >
            <Zap size={18} />
            <span>Try the Detector</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
