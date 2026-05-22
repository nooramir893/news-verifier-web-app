'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const Ctx = createContext(null)

const HISTORY_SEED = [
  { id:'h1', date:'2025-04-20T10:23:00', title:'Coffee Reverses Aging Miracle Cure', text:'Scientists Discover That Drinking Coffee Reverses Aging By 30 Years! A new miracle study claims drinking 10 cups of coffee per day cures most diseases. The government is trying to suppress this information. Share before it gets deleted!', verdict:'FAKE', confidence:94.7, models:{lr:93,nb:88,svm:96,rf:96,xgb:97}, wordCount:38 },
  { id:'h2', date:'2025-04-19T14:45:00', title:'Federal Reserve Holds Interest Rates Steady', text:'The Federal Reserve announced it would hold interest rates steady, citing continued progress on inflation while noting uncertainty about the economic outlook. Fed Chair Jerome Powell said policymakers remain committed to bringing inflation back to the 2% target.', verdict:'REAL', confidence:91.3, models:{lr:89,nb:93,svm:91,rf:91,xgb:92}, wordCount:44 },
  { id:'h3', date:'2025-04-18T09:10:00', title:'Bill Gates Microchip Vaccine Conspiracy', text:'SHOCKING: Bill Gates admits vaccines contain microchips to track population. Leaked documents reveal globalist plan to control humanity through 5G towers and secret nanobots injected during COVID shots!', verdict:'FAKE', confidence:98.1, models:{lr:97,nb:96,svm:99,rf:97,xgb:98}, wordCount:31 },
  { id:'h4', date:'2025-04-17T16:30:00', title:'NASA Artemis II Crewed Lunar Flyby', text:'NASA confirmed the successful launch of its Artemis II mission, marking the first crewed lunar flyby in over 50 years. The four astronauts aboard will travel around the Moon and return to Earth after a 10-day journey.', verdict:'REAL', confidence:89.5, models:{lr:88,nb:91,svm:90,rf:88,xgb:89}, wordCount:42 },
  { id:'h5', date:'2025-04-15T11:00:00', title:'Backyard Treasure Suppressed by Government', text:'Local man discovers ancient treasure buried in backyard worth billions! Government officials immediately seized his property and are silencing him. Share before this gets deleted by mainstream media!', verdict:'FAKE', confidence:96.2, models:{lr:95,nb:94,svm:97,rf:97,xgb:98}, wordCount:33 },
  { id:'h6', date:'2025-04-13T08:20:00', title:"Pakistan Exports Grow 12% in Q1 2025", text:"Pakistan's exports grew by 12% in Q1 2025, driven by textile sector improvements and increased trade agreements with Gulf countries. The State Bank of Pakistan reported the figures in its quarterly economic review.", verdict:'REAL', confidence:87.8, models:{lr:86,nb:89,svm:88,rf:87,xgb:88}, wordCount:40 },
]

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null)
  const [history, setHistory] = useState(HISTORY_SEED)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const s = sessionStorage.getItem('tl_user')
      if (s) setUser(JSON.parse(s))
    } catch {}
    setLoading(false)
  }, [])

  const _save = (u) => { setUser(u); sessionStorage.setItem('tl_user', JSON.stringify(u)) }

  const login = ({ email }) => {
    const u = { name:'Muhammad Ali', email, username:'mali_detector', university:'University of Faisalabad', department:'Computer Science', role:'Student Researcher', joinDate:'2024-09-01', bio:'Final year CS student working on AI-powered fake news detection as my FYP project.' }
    _save(u); return u
  }

  const signup = ({ name, email }) => {
    const u = { name, email, username: name.toLowerCase().replace(/\s+/g,'_'), university:'', department:'', role:'Student', joinDate: new Date().toISOString().split('T')[0], bio:'' }
    _save(u); return u
  }

  const logout = () => { setUser(null); sessionStorage.removeItem('tl_user') }

  const addToHistory = (entry) => {
    const item = { id:`h${Date.now()}`, date: new Date().toISOString(), ...entry }
    setHistory(prev => [item, ...prev])
  }

  const stats = {
    total: history.length,
    fake:  history.filter(h => h.verdict==='FAKE').length,
    real:  history.filter(h => h.verdict==='REAL').length,
    avgConf: history.length ? +(history.reduce((s,h)=>s+h.confidence,0)/history.length).toFixed(1) : 0,
    fakePercent: history.length ? Math.round(history.filter(h=>h.verdict==='FAKE').length/history.length*100) : 0,
  }

  return <Ctx.Provider value={{ user, login, signup, logout, history, addToHistory, stats, loading }}>{children}</Ctx.Provider>
}

export const useAuth = () => { const c = useContext(Ctx); if (!c) throw new Error('useAuth outside provider'); return c }
