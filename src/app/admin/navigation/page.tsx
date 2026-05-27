'use client'
import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'

export default function NavigationAdmin(){
  const [links, setLinks] = useState<any[]>([])

  useEffect(()=>{
    load()
    const ch = supabase.channel('public:nav_links').on('postgres_changes', { event: '*', schema: 'public', table: 'nav_links' }, (p) => { if (p.eventType === 'DELETE') setLinks(l => l.filter(x => x.id !== p.old.id)); else setLinks(l => { const i = l.findIndex(x => x.id === (p.new as any)?.id); if (i !== -1) { const c = [...l]; c[i] = p.new; return c } return [p.new, ...l] }) })
    void ch.subscribe()
    return () => { void ch.unsubscribe() }
  },[])

  const load = async ()=>{ const { data } = await supabase.from('nav_links').select('*').order('order_index',{ascending:true}); setLinks(data||[]) }
  const save = async (row:any)=>{ if(row.id) await supabase.from('nav_links').update(row).eq('id', row.id); else await supabase.from('nav_links').insert(row) }
  const remove = async (row:any)=>{ await supabase.from('nav_links').delete().eq('id', row.id) }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Navigation</h1>
      <div className="mb-4">
        <button onClick={()=>setLinks(l=>[{label:'New', url:'/', order_index: l.length}, ...l])} className="px-3 py-1 rounded bg-[#06b6d4]">Add Link</button>
      </div>

      <div className="grid gap-2">
        {links.map(link=> (
          <div key={link.id||link.order_index} className="bg-[#07182b] p-2 rounded flex items-center gap-2">
            <input className="p-1 bg-[#071f30] rounded" value={link.label||''} onChange={(e)=>setLinks(ls=>ls.map(x=>x===link?{...x,label:e.target.value}:x))} />
            <input className="p-1 bg-[#071f30] rounded" value={link.url||''} onChange={(e)=>setLinks(ls=>ls.map(x=>x===link?{...x,url:e.target.value}:x))} />
            <input className="w-20 p-1 bg-[#071f30] rounded" value={link.order_index||0} onChange={(e)=>setLinks(ls=>ls.map(x=>x===link?{...x, order_index: parseInt(e.target.value||'0',10)}:x))} />
            <button onClick={()=>save(link)} className="px-2 py-1 bg-[#06b6d4] rounded">Save</button>
            <button onClick={()=>remove(link)} className="px-2 py-1 bg-red-600 rounded hover:bg-red-700">Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}
