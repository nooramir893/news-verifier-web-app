'use client'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { User, Mail, Building2, BookOpen, Calendar, Hash, Edit3, Save, X, Shield, CheckCircle, BarChart2 } from 'lucide-react'

const Row = ({ icon:Icon, label, value, mono=false }) => (
  <div className="flex items-start gap-4 py-4 border-b border-primary/10 last:border-0">
    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/18 flex items-center justify-center flex-shrink-0 mt-0.5">
      <Icon size={14} className="text-primary"/>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">{label}</p>
      <p className={`text-white text-sm break-all ${mono?'font-mono':'font-body'}`}>{value || <span className="text-gray-600">Not set</span>}</p>
    </div>
  </div>
)

export default function ProfilePage() {
  const { user, stats } = useAuth()
  const [editing,setEditing] = useState(false)
  const [saved,setSaved]     = useState(false)
  const [form,setForm]       = useState({ name:user?.name||'', bio:user?.bio||'', university:user?.university||'', department:user?.department||'', role:user?.role||'' })

  const initials = user?.name?.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2) || '?'
  const joinFmt  = user?.joinDate ? new Date(user.joinDate).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'}) : '—'

  const save = () => { setSaved(true); setEditing(false); setTimeout(()=>setSaved(false),3000) }

  const Field = ({ k, label, placeholder, textarea=false }) => (
    <div>
      <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase tracking-widest">{label}</label>
      {textarea
        ? <textarea value={form[k]} onChange={e=>setForm(p=>({...p,[k]:e.target.value}))} placeholder={placeholder} rows={3}
            className="w-full bg-navy-900/70 border border-primary/20 rounded-xl px-4 py-2.5 text-sm text-gray-200 font-body placeholder-gray-600 outline-none focus:border-primary/60 focus:shadow-[0_0_0_3px_rgba(15,118,110,.12)] transition-all resize-none"/>
        : <input value={form[k]} onChange={e=>setForm(p=>({...p,[k]:e.target.value}))} placeholder={placeholder}
            className="w-full bg-navy-900/70 border border-primary/20 rounded-xl px-4 py-2.5 text-sm text-gray-200 font-body placeholder-gray-600 outline-none focus:border-primary/60 focus:shadow-[0_0_0_3px_rgba(15,118,110,.12)] transition-all"/>
      }
    </div>
  )

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display font-extrabold text-3xl text-white mb-1">My Profile</h1>
        <p className="text-gray-400 font-body text-sm">View and manage your account information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="sxgbe-y-4">
          <div className="glass nb rounded-2xl p-6 text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-display font-extrabold text-3xl glow-t mx-auto">
                {initials}
              </div>
              <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-neon rounded-full border-2 border-navy-950 flex items-center justify-center">
                <CheckCircle size={13} className="text-navy-950"/>
              </div>
            </div>
            <h2 className="font-display font-bold text-white text-lg mb-0.5">{user?.name}</h2>
            <p className="text-primary font-mono text-xs">@{user?.username}</p>
            <p className="text-gray-500 text-xs font-body mt-0.5">{user?.role}</p>
            <div className="mt-5 pt-4 border-t border-primary/15 grid grid-cols-3 gap-2 text-center">
              {[{v:stats.total,l:'Total',c:'text-white'},{v:stats.fake,l:'Fake',c:'text-red-400'},{v:stats.real,l:'Real',c:'text-neon'}].map(({v,l,c})=>(
                <div key={l}><p className={`font-display font-bold text-xl ${c}`}>{v}</p><p className="text-gray-500 text-[10px] font-mono uppercase">{l}</p></div>
              ))}
            </div>
          </div>

          <div className="glass nb rounded-2xl p-5">
            <p className="font-display font-semibold text-white text-sm mb-3">Account Status</p>
            <div className="sxgbe-y-2.5">
              {[{l:'Email Verified',ok:true},{l:'ML Access Active',ok:true},{l:'Premium Plan',ok:false}].map(({l,ok})=>(
                <div key={l} className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs font-body">{l}</span>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${ok?'text-neon bg-green-500/10 border-green-500/22':'text-gray-500 bg-gray-500/10 border-gray-500/22'}`}>{ok?'Active':'Inactive'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-2 sxgbe-y-5">
          <div className="glass nb rounded-2xl p-6">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-display font-bold text-white">Personal Information</h3>
              {!editing
                ? <button onClick={()=>setEditing(true)} className="flex items-center gap-1.5 text-xs text-primary hover:text-secondary font-mono nb px-3 py-1.5 rounded-lg transition-all glass"><Edit3 size={11}/>Edit</button>
                : <div className="flex gap-2">
                    <button onClick={save} className="flex items-center gap-1.5 text-xs text-neon font-mono nb-g px-3 py-1.5 rounded-lg transition-all glass"><Save size={11}/>Save</button>
                    <button onClick={()=>setEditing(false)} className="flex items-center gap-1.5 text-xs text-gray-400 font-mono nb px-3 py-1.5 rounded-lg glass"><X size={11}/>Cancel</button>
                  </div>
              }
            </div>

            {saved && <div className="flex items-center gap-2 my-3 px-3 py-2 bg-green-500/10 nb-g rounded-lg"><CheckCircle size={12} className="text-neon"/><span className="text-neon text-xs font-mono">Profile updated!</span></div>}

            {editing ? (
              <div className="sxgbe-y-4 mt-4">
                <Field k="name" label="Full Name" placeholder="Your full name"/>
                <Field k="university" label="University" placeholder="Your university"/>
                <Field k="department" label="Department" placeholder="e.g. Computer Science"/>
                <Field k="role" label="Role" placeholder="e.g. Student Researcher"/>
                <Field k="bio" label="Bio" placeholder="A short bio..." textarea/>
              </div>
            ) : (
              <div className="mt-2">
                <Row icon={User} label="Full Name" value={user?.name}/>
                <Row icon={Mail} label="Email" value={user?.email} mono/>
                <Row icon={Hash} label="Username" value={`@${user?.username}`} mono/>
                <Row icon={Building2} label="University" value={user?.university}/>
                <Row icon={BookOpen} label="Department" value={user?.department}/>
                <Row icon={Shield} label="Role" value={user?.role}/>
                <Row icon={Calendar} label="Member Since" value={joinFmt}/>
              </div>
            )}
          </div>

          {!editing && user?.bio && (
            <div className="glass nb rounded-2xl p-6">
              <h3 className="font-display font-bold text-white mb-3">Bio</h3>
              <p className="text-gray-400 font-body text-sm leading-relaxed">{user.bio}</p>
            </div>
          )}

          <div className="glass nb rounded-2xl p-6">
            <h3 className="font-display font-bold text-white mb-4">Activity Summary</h3>
            <div className="grid grid-cols-2 gap-3">
              {[{l:'Total Analyses',v:stats.total,c:'text-primary'},{l:'Avg Confidence',v:`${stats.avgConf}%`,c:'text-secondary'},{l:'Fake Detected',v:stats.fake,c:'text-red-400'},{l:'Real Verified',v:stats.real,c:'text-neon'}].map(({l,v,c})=>(
                <div key={l} className="bg-navy-900/50 rounded-xl p-4 border border-primary/10">
                  <p className={`font-display font-bold text-2xl ${c} mb-0.5`}>{v}</p>
                  <p className="text-gray-500 text-xs font-body">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
