'use client'
import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'

export default function HomepageEditor() {
  const [hero, setHero] = useState<any[]>([])

  useEffect(()=>{
    load()
    const ch = supabase.channel('public:site_settings').on('postgres_changes', { event: '*', schema: 'public', table: 'site_settings' }, (payload) => {
      setHero((cur) => {
        const relevant = payload.new && (payload.new as any).section === 'hero'
        if (!relevant) return cur
        const idx = cur.findIndex(s => s.id === (payload.new as any)?.id)
        if (idx !== -1) { const c = [...cur]; c[idx] = payload.new; return c }
        return [payload.new, ...cur]
      })
    })
    void ch.subscribe()
    return () => { void ch.unsubscribe() }
  }, [])

  const load = async () => {
    const { data } = await supabase.from('site_settings').select('*').eq('section','hero').order('key')
    setHero(data||[])
  }

  const save = async (row:any) => {
    const { error } = await supabase.from('site_settings').update({ value: row.value, updated_at: new Date() }).eq('id', row.id)
    if (error) alert('Save failed: ' + error.message)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Homepage Editor</h1>
      <p className="text-sm text-gray-400 mb-4">Edit the hero section content below. Other homepage sections available in their pages.</p>

      <div className="grid gap-3">
        {hero.map(row=> (
          <div key={row.id} className="bg-[#07182b] p-4 rounded border border-[#123047] flex items-start gap-4">
            <div className="w-48">
              <div className="text-sm text-gray-300">{row.label || row.key}</div>
              <div className="text-xs text-gray-500">{row.key}</div>
            </div>
            <div className="flex-1">
              <input className="w-full p-2 rounded bg-[#0b2940] border border-[#12304a]" value={row.value||''} onChange={(e)=>{ const v=e.target.value; setHero(h=>h.map(x=>x.id===row.id?{...x,value:v}:x)) }} />
            </div>
            <div className="w-36 flex flex-col gap-2">
              <button className="px-3 py-1 rounded bg-[#FFD166] text-black" onClick={()=>save(row)}>Save</button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
