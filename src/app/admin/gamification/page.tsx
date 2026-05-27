'use client'
import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'

export default function GamificationAdmin(){
  const [rules, setRules] = useState<any[]>([])
  const [achievements, setAchievements] = useState<any[]>([])
  const [levels, setLevels] = useState<any[]>([])

  useEffect(()=>{ load(); },[])
  const load = async ()=>{
    const r = await supabase.from('xp_rules').select('*').order('action')
    const a = await supabase.from('achievements').select('*').order('created_at')
    const l = await supabase.from('levels').select('*').order('level_number')
    setRules(r.data||[]); setAchievements(a.data||[]); setLevels(l.data||[])
  }

  const saveRule = async (row:any)=>{ await supabase.from('xp_rules').upsert(row) }
  const saveAchievement = async (row:any)=>{ await supabase.from('achievements').upsert(row) }
  const saveLevel = async (row:any)=>{ await supabase.from('levels').upsert(row) }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gamification</h1>
      <section className="mb-6">
        <h2 className="font-semibold mb-2">XP Rules</h2>
        <div className="grid gap-2">
          {rules.map(r=> (
            <div key={r.id} className="bg-[#07182b] p-2 rounded flex items-center gap-2">
              <div className="w-48">{r.action}</div>
              <input className="p-1 bg-[#071f30] rounded" value={String(r.xp_value||'')} onChange={(e)=>setRules(rs=>rs.map(x=>x.id===r.id?{...x, xp_value: parseInt(e.target.value||'0',10)}:x))} />
              <button onClick={()=>saveRule(r)} className="px-2 py-1 bg-[#06b6d4] rounded">Save</button>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold mb-2">Achievements</h2>
        <div className="grid gap-2">
          {achievements.map(a=> (
            <div key={a.id} className="bg-[#07182b] p-2 rounded flex items-center gap-2">
              <div className="flex-1">{a.name}</div>
              <div className="w-24">XP: {a.xp_reward}</div>
              <button onClick={()=>saveAchievement(a)} className="px-2 py-1 bg-[#06b6d4] rounded">Save</button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-2">Levels</h2>
        <div className="grid gap-2">
          {levels.map(l=> (
            <div key={l.id} className="bg-[#07182b] p-2 rounded flex items-center gap-2">
              <div className="w-24">Level {l.level_number}</div>
              <input className="p-1 bg-[#071f30] rounded" value={l.title||''} onChange={(e)=>setLevels(ls=>ls.map(x=>x.id===l.id?{...x, title:e.target.value}:x))} />
              <button onClick={()=>saveLevel(l)} className="px-2 py-1 bg-[#06b6d4] rounded">Save</button>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
