'use client'
import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'
import DataTable from '@/components/admin/DataTable'
import ConfirmDialog from '@/components/admin/ConfirmDialog'

export default function PromptsAdminPage(){
  const [prompts, setPrompts] = useState<any[]>([])
  const [editing, setEditing] = useState<any|null>(null)
  const [del, setDel] = useState<any|null>(null)

  useEffect(()=>{
    load()
    const ch = supabase.channel('public:prompts').on('postgres_changes', { event: '*', schema: 'public', table: 'prompts' }, (p) => {
      if (p.eventType === 'DELETE') setPrompts((s) => s.filter(x => x.id !== p.old.id))
      else setPrompts((s) => { const i = s.findIndex(x => x.id === (p.new as any)?.id); if (i !== -1) { const c = [...s]; c[i] = p.new; return c } return [p.new, ...s] })
    })
    void ch.subscribe()
    return () => { void ch.unsubscribe() }
  },[])

  const load = async ()=>{ const { data } = await supabase.from('prompts').select('*').order('created_at', {ascending:false}); setPrompts(data||[]) }
  const save = async (row:any)=>{ if(row.id) await supabase.from('prompts').update(row).eq('id', row.id); else await supabase.from('prompts').insert(row); setEditing(null) }
  const remove = async (row:any)=>{ await supabase.from('prompts').delete().eq('id', row.id); setDel(null) }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Prompts Vault</h1>
        <button onClick={()=>setEditing({})} className="px-3 py-1 rounded bg-[#06b6d4]">New Prompt</button>
      </div>

      <DataTable columns={[{key:'title', label:'Title'},{key:'category', label:'Category'},{key:'copies', label:'Copies'},{key:'is_premium', label:'Premium'}]} data={prompts} renderRowActions={(r)=> (
        <div className="flex gap-2">
          <button onClick={()=>setEditing(r)} className="px-2 py-1 bg-[#0ea5a4] rounded">Edit</button>
          <button onClick={()=>setDel(r)} className="px-2 py-1 bg-red-600 rounded hover:bg-red-700">Delete</button>
        </div>
      )} />

      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-start justify-center p-6 overflow-auto">
          <div className="bg-[#06202a] p-6 rounded w-full max-w-3xl">
            <h2 className="text-xl font-semibold mb-4">{editing.id? 'Edit' : 'New'} Prompt</h2>
            <div className="grid gap-3">
              <input placeholder="Title" value={editing.title||''} onChange={(e)=>setEditing({...editing, title:e.target.value})} className="p-2 bg-[#071f30] rounded" />
              <textarea placeholder="Prompt text" value={editing.prompt_text||''} onChange={(e)=>setEditing({...editing, prompt_text:e.target.value})} className="p-2 bg-[#071f30] rounded h-48" />
              <div className="flex gap-2">
                <input placeholder="Category" value={editing.category||''} onChange={(e)=>setEditing({...editing, category:e.target.value})} className="p-2 bg-[#071f30] rounded" />
                <input placeholder="Use case" value={editing.use_case||''} onChange={(e)=>setEditing({...editing, use_case:e.target.value})} className="p-2 bg-[#071f30] rounded" />
              </div>
              <div className="flex gap-2">
                <label className="flex items-center gap-2"><input type="checkbox" checked={!!editing.is_premium} onChange={(e)=>setEditing({...editing, is_premium:e.target.checked})} /> Premium</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={!!editing.featured} onChange={(e)=>setEditing({...editing, featured:e.target.checked})} /> Featured</label>
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={()=>setEditing(null)} className="px-3 py-1 rounded border">Cancel</button>
                <button onClick={()=>save(editing)} className="px-3 py-1 rounded bg-[#06b6d4]">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {del && <ConfirmDialog title={`Delete ${del.title}?`} onConfirm={()=>remove(del)} onCancel={()=>setDel(null)} />}
    </div>
  )
}
