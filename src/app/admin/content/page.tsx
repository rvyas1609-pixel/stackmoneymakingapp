'use client'
import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'
import DataTable from '@/components/admin/DataTable'
import RichTextEditor from '@/components/admin/RichTextEditor'
import ImageUpload from '@/components/admin/ImageUpload'
import ConfirmDialog from '@/components/admin/ConfirmDialog'

export default function ContentAdminPage() {
  const [items, setItems] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<any | null>(null)
  const [showDelete, setShowDelete] = useState<any | null>(null)

  useEffect(() => {
    load()
    const channel = supabase.channel('public:content')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'content' }, (payload) => {
        // simple replacement logic
        setItems((cur) => {
          if (payload.eventType === 'DELETE') return cur.filter((c) => c.id !== payload.old.id)
          const idx = cur.findIndex((c) => c.id === (payload.new as any)?.id)
          if (idx !== -1) { const copy = [...cur]; copy[idx] = payload.new; return copy }
          return [payload.new, ...cur]
        })
      })
    void channel.subscribe()

    return () => { void channel.unsubscribe() }
  }, [])

  const load = async () => {
    let q = supabase.from('content').select('*').order('created_at', { ascending: false })
    if (search) q = q.ilike('title', `%${search}%`)
    const { data, error } = await q
    if (error) { alert('Load failed: ' + error.message) }
    setItems(data || [])
  }

  const openNew = () => setEditing({})
  const openEdit = (row:any) => setEditing(row)
  const save = async (row:any) => {
    const clean = { ...row, tags: row.tags?.split?.(',').map((t:string)=>t.trim()) }
    if (row.id) {
      const { error } = await supabase.from('content').update(clean).eq('id', row.id)
      if (error) alert('Save failed: ' + error.message)
    } else {
      const { error } = await supabase.from('content').insert(clean)
      if (error) alert('Create failed: ' + error.message)
    }
    setEditing(null)
  }

  const remove = async (row:any) => {
    const { error } = await supabase.from('content').delete().eq('id', row.id)
    if (error) alert('Delete failed: ' + error.message)
    setShowDelete(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Content</h1>
        <div className="flex items-center gap-2">
          <input placeholder="Search title" value={search} onChange={(e)=>setSearch(e.target.value)} className="p-2 rounded bg-[#071f30] border border-[#123045]" />
          <button onClick={load} className="px-3 py-1 rounded bg-[#FFD166] text-black">Search</button>
          <button onClick={openNew} className="px-3 py-1 rounded bg-[#06b6d4]">New</button>
        </div>
      </div>

      <DataTable columns={[{key:'title', label:'Title'},{key:'type', label:'Type'},{key:'category', label:'Category'},{key:'is_premium', label:'Premium'},{key:'published', label:'Published'},{key:'views', label:'Views' }]} data={items} renderRowActions={(row)=> (
        <div className="flex gap-2">
          <button onClick={()=>openEdit(row)} className="px-2 py-1 bg-[#0ea5a4] rounded">Edit</button>
          <button onClick={()=>setShowDelete(row)} className="px-2 py-1 bg-red-600 rounded hover:bg-red-700">Delete</button>
        </div>
      )} />

      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-start justify-center p-6 overflow-auto">
          <div className="bg-[#06202a] p-6 rounded w-full max-w-3xl">
            <h2 className="text-xl font-semibold mb-4">{editing.id ? 'Edit' : 'New'} Content</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-300">Title</label>
                <input className="w-full p-2 rounded bg-[#071f30] border border-[#123045]" value={editing.title||''} onChange={(e)=>setEditing({...editing, title: e.target.value})} />
              </div>
              <div>
                <label className="text-sm text-gray-300">Type</label>
                <select className="w-full p-2 rounded bg-[#071f30]" value={editing.type||'playbook'} onChange={(e)=>setEditing({...editing, type: e.target.value})}>
                  <option value="playbook">Playbook</option>
                  <option value="resource">Resource</option>
                  <option value="guide">Guide</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300">Category</label>
                <input className="w-full p-2 rounded bg-[#071f30]" value={editing.category||''} onChange={(e)=>setEditing({...editing, category: e.target.value})} />
              </div>
              <div>
                <label className="text-sm text-gray-300">Tags (comma)</label>
                <input className="w-full p-2 rounded bg-[#071f30]" value={editing.tags||''} onChange={(e)=>setEditing({...editing, tags: e.target.value})} />
              </div>

              <div>
                <label className="text-sm text-gray-300">Thumbnail</label>
                <ImageUpload value={editing.thumbnail} onChange={(v)=>setEditing({...editing, thumbnail: v})} pathPrefix={`content/${editing.id||'new'}`} />
              </div>

              <div>
                <label className="text-sm text-gray-300">Options</label>
                <div className="flex flex-col gap-2 mt-2">
                  <label className="flex items-center gap-2"><input type="checkbox" checked={!!editing.is_premium} onChange={(e)=>setEditing({...editing, is_premium: e.target.checked})} /> Premium</label>
                  <label className="flex items-center gap-2"><input type="checkbox" checked={!!editing.published} onChange={(e)=>setEditing({...editing, published: e.target.checked})} /> Published</label>
                  <label className="flex items-center gap-2"><input type="checkbox" checked={!!editing.featured} onChange={(e)=>setEditing({...editing, featured: e.target.checked})} /> Featured</label>
                </div>
              </div>

              <div className="col-span-2">
                <label className="text-sm text-gray-300">Body</label>
                <RichTextEditor value={editing.body||''} onChange={(v)=>setEditing({...editing, body: v})} />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={()=>setEditing(null)} className="px-3 py-1 rounded border border-[#123047]">Cancel</button>
              <button onClick={()=>save(editing)} className="px-3 py-1 rounded bg-[#06b6d4]">Save</button>
            </div>
          </div>
        </div>
      )}

      {showDelete && (
        <ConfirmDialog title={`Delete ${showDelete.title}?`} onConfirm={()=>remove(showDelete)} onCancel={()=>setShowDelete(null)} />
      )}

    </div>
  )
}
