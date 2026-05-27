'use client'
import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'
import DataTable from '@/components/admin/DataTable'

export default function RoadmapsAdminPage(){
  const [roadmaps, setRoadmaps] = useState<any[]>([])
  const [editing, setEditing] = useState<any|null>(null)

  useEffect(()=>{
    load()
    const ch = supabase.channel('public:roadmaps').on('postgres_changes', { event: '*', schema: 'public', table: 'roadmaps' }, (p) => {
      if (p.eventType === 'DELETE') setRoadmaps((s) => s.filter(x => x.id !== p.old.id))
      else setRoadmaps((s) => { const i = s.findIndex(x => x.id === (p.new as any)?.id); if (i !== -1) { const c = [...s]; c[i] = p.new; return c } return [p.new, ...s] })
    })
    void ch.subscribe()
    return () => { void ch.unsubscribe() }
  },[])

  const load = async ()=>{ const { data } = await supabase.from('roadmaps').select('*').order('created_at',{ascending:false}); setRoadmaps(data||[]) }
  const save = async (row:any)=>{ if(row.id) await supabase.from('roadmaps').update(row).eq('id', row.id); else await supabase.from('roadmaps').insert(row); setEditing(null) }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Roadmaps</h1>
        <button onClick={()=>setEditing({steps:[]})} className="px-3 py-1 rounded bg-[#06b6d4]">New Roadmap</button>
      </div>

      <DataTable columns={[{key:'title', label:'Title'},{key:'target_income', label:'Target Income'},{key:'duration', label:'Duration'},{key:'difficulty', label:'Difficulty'}]} data={roadmaps} renderRowActions={(r)=> (
        <div className="flex gap-2">
          <button onClick={()=>setEditing(r)} className="px-2 py-1 bg-[#0ea5a4] rounded">Edit</button>
        </div>
      )} />

      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-start justify-center p-6 overflow-auto">
          <div className="bg-[#06202a] p-6 rounded w-full max-w-4xl">
            <h2 className="text-xl font-semibold mb-4">{editing.id? 'Edit' : 'New'} Roadmap</h2>
            <div className="grid gap-3">
              <input placeholder="Title" value={editing.title||''} onChange={(e)=>setEditing({...editing, title:e.target.value})} className="p-2 bg-[#071f30] rounded" />
              <input placeholder="Target income" value={editing.target_income||''} onChange={(e)=>setEditing({...editing, target_income:e.target.value})} className="p-2 bg-[#071f30] rounded" />
              <input placeholder="Duration" value={editing.duration||''} onChange={(e)=>setEditing({...editing, duration:e.target.value})} className="p-2 bg-[#071f30] rounded" />
              <input placeholder="Difficulty" value={editing.difficulty||''} onChange={(e)=>setEditing({...editing, difficulty:e.target.value})} className="p-2 bg-[#071f30] rounded" />

              <div>
                <label className="text-sm text-gray-300">Steps (JSON)</label>
                <textarea className="w-full h-48 p-2 bg-[#071f30] rounded" value={JSON.stringify(editing.steps||[],null,2)} onChange={(e)=>{
                  try{ setEditing({...editing, steps: JSON.parse(e.target.value)}) }catch(err){ }
                }} />
                <div className="text-xs text-gray-400">Steps are stored as JSON array: [{`{title, description, resources, estimated_time}`}]</div>
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
