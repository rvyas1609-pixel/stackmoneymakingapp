'use client'
import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'

export default function AnnouncementsAdmin(){
  const [items, setItems] = useState<any[]>([])
  const [editing, setEditing] = useState<any|null>(null)

  useEffect(()=>{ load(); const ch = supabase.channel('public:announcements').on('postgres_changes',{event:'*',schema:'public',table:'announcements'},(p)=>{
      if(p.eventType==='DELETE') setItems((s)=>s.filter(x=>x.id!==p.old.id))
      else setItems((s)=>{ const i=s.findIndex(x=>x.id=== (p.new as any)?.id); if(i!==-1){ const c=[...s]; c[i]=p.new; return c } return [p.new,...s] })
    }).subscribe(); return ()=>{ void ch.unsubscribe() } },[])

  const load = async ()=>{ const { data } = await supabase.from('announcements').select('*').order('created_at',{ascending:false}); setItems(data||[]) }
  const save = async (row:any)=>{ if(row.id) await supabase.from('announcements').update(row).eq('id', row.id); else await supabase.from('announcements').insert(row); setEditing(null) }
  const remove = async (row:any)=>{ await supabase.from('announcements').delete().eq('id', row.id) }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Announcements</h1>
        <button onClick={()=>setEditing({active:true})} className="px-3 py-1 rounded bg-[#06b6d4]">New</button>
      </div>

      <div className="grid gap-2">
        {items.map(it=> (
          <div key={it.id} className="bg-[#07182b] p-3 rounded flex items-center justify-between">
            <div>
              <div className="font-semibold">{it.title}</div>
              <div className="text-sm text-gray-400">{it.type} • {it.show_to}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>setEditing(it)} className="px-2 py-1 bg-[#0ea5a4] rounded">Edit</button>
              <button onClick={()=>remove(it)} className="px-2 py-1 bg-red-600 rounded hover:bg-red-700">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-start justify-center p-6 overflow-auto">
          <div className="bg-[#06202a] p-6 rounded w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">{editing.id? 'Edit' : 'New'} Announcement</h2>
            <input placeholder="Title" className="w-full p-2 bg-[#071f30] rounded" value={editing.title||''} onChange={(e)=>setEditing({...editing, title:e.target.value})} />
            <textarea placeholder="Body" className="w-full p-2 bg-[#071f30] rounded h-36 mt-2" value={editing.body||''} onChange={(e)=>setEditing({...editing, body:e.target.value})} />
            <div className="flex gap-2 mt-2">
              <select className="p-2 bg-[#071f30]" value={editing.show_to||'all'} onChange={(e)=>setEditing({...editing, show_to:e.target.value})}>
                <option value="all">All</option>
                <option value="premium">Premium</option>
                <option value="free">Free</option>
              </select>
              <label className="flex items-center gap-2"><input type="checkbox" checked={!!editing.active} onChange={(e)=>setEditing({...editing, active:e.target.checked})} /> Active</label>
              <div className="flex-1" />
              <button onClick={()=>setEditing(null)} className="px-3 py-1 rounded border">Cancel</button>
              <button onClick={()=>save(editing)} className="px-3 py-1 rounded bg-[#06b6d4]">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
