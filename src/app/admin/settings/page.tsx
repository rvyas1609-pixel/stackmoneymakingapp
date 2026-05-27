'use client'
import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'

export default function SettingsAdmin(){
  const [settings, setSettings] = useState<any[]>([])

  useEffect(()=>{
    load()
    const ch = supabase.channel('public:site_settings').on('postgres_changes', { event: '*', schema: 'public', table: 'site_settings' }, (p) => {
      setSettings((cur) => {
        const idx = cur.findIndex(x => x.id === (p.new as any)?.id)
        if (idx !== -1) { const copy = [...cur]; copy[idx] = p.new; return copy }
        return [p.new, ...cur]
      })
    })
    void ch.subscribe()
    return () => { void ch.unsubscribe() }
  },[])

  const load = async ()=>{ const { data } = await supabase.from('site_settings').select('*').order('section',{ascending:true}).order('key',{ascending:true}); setSettings(data||[]) }
  const save = async (row:any)=>{ await supabase.from('site_settings').update({ value: row.value }).eq('id', row.id) }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Site Settings</h1>
      <div className="grid gap-3">
        {settings.map(row=> (
          <div key={row.id} className="bg-[#07182b] p-4 rounded border border-[#123047] flex flex-col gap-2">
            <div className="text-sm text-gray-300">{row.section} • {row.label || row.key}</div>
            <div className="flex gap-2">
              <input className="flex-1 p-2 bg-[#0b2940] rounded" value={row.value||''} onChange={(e)=>setSettings(s=>s.map(x=>x.id===row.id?{...x,value:e.target.value}:x))} />
              <button onClick={()=>save(row)} className="px-3 py-1 rounded bg-[#06b6d4]">Save</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
