'use client'
import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'

export default function TestimonialsAdmin(){
  const [items, setItems] = useState<any[]>([])
  const [editing, setEditing] = useState<any|null>(null)

  useEffect(()=>{
    load()
    const ch = supabase.channel('public:testimonials').on('postgres_changes', { event: '*', schema: 'public', table: 'testimonials' }, (p) => {
      if (p.eventType === 'DELETE') setItems((s) => s.filter(x => x.id !== p.old.id))
      else setItems((s) => { const i = s.findIndex(x => x.id === (p.new as any)?.id); if (i !== -1) { const c = [...s]; c[i] = p.new; return c } return [p.new, ...s] })
    })
    void ch.subscribe()
    return () => { void ch.unsubscribe() }
  },[])

  const load = async ()=>{ const { data } = await supabase.from('testimonials').select('*').order('order_index',{ascending:true}); setItems(data||[]) }
  const save = async (row:any)=>{ if(row.id) await supabase.from('testimonials').update(row).eq('id', row.id); else await supabase.from('testimonials').insert(row); setEditing(null) }
  const remove = async (row:any)=>{ await supabase.from('testimonials').delete().eq('id', row.id) }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <button onClick={()=>setEditing({published:true})} className="px-3 py-1 rounded bg-[#06b6d4]">New</button>
      </div>
      <div className="grid gap-2">
        {items.map(item=> (
          <div key={item.id} className="bg-[#07182b] p-3 rounded flex items-center justify-between">
            <div>
              <div className="font-semibold">{item.name}</div>
              <div className="text-sm text-gray-400">{item.role}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>setEditing(item)} className="px-2 py-1 bg-[#0ea5a4] rounded">Edit</button>
              <button onClick={()=>remove(item)} className="px-2 py-1 bg-red-600 rounded hover:bg-red-700">Delete</button>
            </div>
          </div>
        ))}
      </div>
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-start justify-center p-6 overflow-auto">
          <div className="bg-[#06202a] p-6 rounded w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">{editing.id? 'Edit' : 'New'} Testimonial</h2>
            <input placeholder="Name" className="w-full p-2 bg-[#071f30] rounded mb-2" value={editing.name||''} onChange={(e)=>setEditing({...editing, name:e.target.value})} />
            <input placeholder="Role" className="w-full p-2 bg-[#071f30] rounded mb-2" value={editing.role||''} onChange={(e)=>setEditing({...editing, role:e.target.value})} />
            <textarea placeholder="Content" className="w-full p-2 bg-[#071f30] rounded mb-2 h-32" value={editing.content||''} onChange={(e)=>setEditing({...editing, content:e.target.value})} />
            <div className="flex gap-2 items-center">
              <input placeholder="Avatar URL" className="flex-1 p-2 bg-[#071f30] rounded" value={editing.avatar_url||''} onChange={(e)=>setEditing({...editing, avatar_url:e.target.value})} />
              <input type="number" className="w-24 p-2 bg-[#071f30] rounded" placeholder="Rating" value={editing.rating||5} onChange={(e)=>setEditing({...editing, rating:parseInt(e.target.value||'5',10)})} />
            </div>
            <label className="flex items-center gap-2 mt-2"><input type="checkbox" checked={!!editing.published} onChange={(e)=>setEditing({...editing, published:e.target.checked})} /> Published</label>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={()=>setEditing(null)} className="px-3 py-1 rounded border">Cancel</button>
              <button onClick={()=>save(editing)} className="px-3 py-1 rounded bg-[#06b6d4]">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
