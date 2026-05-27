'use client'
import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'
import DataTable from '@/components/admin/DataTable'
import ImageUpload from '@/components/admin/ImageUpload'

export default function ToolsAdminPage(){
  const [tools, setTools] = useState<any[]>([])
  const [editing, setEditing] = useState<any|null>(null)

  useEffect(()=>{
    load()
    const ch = supabase.channel('public:tools').on('postgres_changes', { event: '*', schema: 'public', table: 'tools' }, (p) => {
      if (p.eventType === 'DELETE') setTools((s) => s.filter(x => x.id !== p.old.id))
      else setTools((s) => { const i = s.findIndex(x => x.id === (p.new as any)?.id); if (i !== -1) { const c = [...s]; c[i] = p.new; return c } return [p.new, ...s] })
    })
    void ch.subscribe()
    return () => { void ch.unsubscribe() }
  },[])

  const load = async ()=>{ const { data } = await supabase.from('tools').select('*').order('created_at',{ascending:false}); setTools(data||[]) }
  const save = async (row:any)=>{ if(row.id) await supabase.from('tools').update(row).eq('id', row.id); else await supabase.from('tools').insert(row); setEditing(null) }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">AI Tools</h1>
        <button onClick={()=>setEditing({})} className="px-3 py-1 rounded bg-[#06b6d4]">New Tool</button>
      </div>

      <DataTable columns={[{key:'name', label:'Name'},{key:'category', label:'Category'},{key:'rating', label:'Rating'},{key:'is_premium', label:'Premium'}]} data={tools} renderRowActions={(r)=> (
        <div className="flex gap-2">
          <button onClick={()=>setEditing(r)} className="px-2 py-1 bg-[#0ea5a4] rounded">Edit</button>
        </div>
      )} />

      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-start justify-center p-6 overflow-auto">
          <div className="bg-[#06202a] p-6 rounded w-full max-w-3xl">
            <h2 className="text-xl font-semibold mb-4">{editing.id? 'Edit' : 'New'} Tool</h2>
            <div className="grid gap-3">
              <input placeholder="Name" value={editing.name||''} onChange={(e)=>setEditing({...editing, name:e.target.value})} className="p-2 bg-[#071f30] rounded" />
              <textarea placeholder="Description" value={editing.description||''} onChange={(e)=>setEditing({...editing, description:e.target.value})} className="p-2 bg-[#071f30] rounded h-36" />
              <div className="flex gap-2">
                <input placeholder="URL" value={editing.url||''} onChange={(e)=>setEditing({...editing, url:e.target.value})} className="p-2 bg-[#071f30] rounded" />
                <input placeholder="Category" value={editing.category||''} onChange={(e)=>setEditing({...editing, category:e.target.value})} className="p-2 bg-[#071f30] rounded" />
              </div>
              <div>
                <label className="text-sm text-gray-300">Logo</label>
                <ImageUpload value={editing.logo_url} onChange={(v)=>setEditing({...editing, logo_url:v})} pathPrefix={`tools/${editing.id||'new'}`} />
              </div>
              <div className="flex gap-2 items-center">
                <input placeholder="Income angle" value={editing.income_angle||''} onChange={(e)=>setEditing({...editing, income_angle:e.target.value})} className="p-2 bg-[#071f30] rounded flex-1" />
                <input placeholder="Tutorial URL" value={editing.tutorial_url||''} onChange={(e)=>setEditing({...editing, tutorial_url:e.target.value})} className="p-2 bg-[#071f30] rounded flex-1" />
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={()=>setEditing(null)} className="px-3 py-1 rounded border">Cancel</button>
                <button onClick={()=>save(editing)} className="px-3 py-1 rounded bg-[#06b6d4]">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
