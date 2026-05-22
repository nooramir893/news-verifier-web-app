import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'

const syne = Syne({ subsets:['latin'], variable:'--font-syne', weight:['400','500','600','700','800'] })
const dm   = DM_Sans({ subsets:['latin'], variable:'--font-dm', weight:['300','400','500','600'] })
const jb   = JetBrains_Mono({ subsets:['latin'], variable:'--font-jb', weight:['400','500'] })

export const metadata = {
  title: 'News Verifier — AI Fake News Detector',
  description: 'Detect fake news with ML & NLP',
  icons: {
    icon: '/favicon.jpg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${dm.variable} ${jb.variable}`}>
      <body className="bg-navy-950 text-gray-200 font-body antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}