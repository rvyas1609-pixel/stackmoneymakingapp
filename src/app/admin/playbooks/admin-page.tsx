'use client'
import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'

interface Playbook {
  id: string
  title: string
  slug: string
  category: string
  description: string
  tier: string
  status: string
  created_at: string
}

export default function PlaybooksAdminPage() {
  const [playbooks, setPlaybooks] = useState<Playbook[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Playbook>>({})

  useEffect(() => {
    loadPlaybooks()
    const ch = supabase.channel('public:playbooks').on('postgres_changes', { event: '*', schema: 'public', table: 'playbooks' }, (payload) => {
      if (payload.eventType === 'DELETE') setPlaybooks(p => p.filter(x => x.id !== payload.old.id))
      else loadPlaybooks()
    })
    void ch.subscribe()
    return () => { void ch.unsubscribe() }
  }, [])

  const loadPlaybooks = async () => {
    try {
      const { data, error } = await supabase.from('playbooks').select('*').order('created_at', { ascending: false })
      if (error) throw error
      setPlaybooks(data || [])
    } finally {
      setLoading(false)
    }
  }

  const savePlaybook = async () => {
    if (!editingId || !formData.title) return
    const { error } = await supabase.from('playbooks').update(formData).eq('id', editingId)
    if (error) alert('Error: ' + error.message)
    else {
      setEditingId(null)
      loadPlaybooks()
    }
  }

  const deletePlaybook = async (id: string) => {
    if (!confirm('Delete this playbook?')) return
    const { error } = await supabase.from('playbooks').delete().eq('id', id)
    if (error) alert('Error: ' + error.message)
    else loadPlaybooks()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Playbooks</h1>
        <button className="px-4 py-2 bg-emerald-600 rounded-lg hover:bg-emerald-700 transition">
          + New Playbook
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <div className="space-y-3">
          {playbooks.map((playbook) => (
            <div key={playbook.id} className="bg-[#111] border border-[#222] rounded-lg p-4 hover:border-[#333] transition">
              {editingId === playbook.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Title"
                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#222] rounded text-white placeholder-gray-500"
                  />
                  <input
                    type="text"
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Description"
                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#222] rounded text-white placeholder-gray-500"
                  />
                  <div className="flex gap-2">
                    <button onClick={savePlaybook} className="px-3 py-1 bg-emerald-600 rounded hover:bg-emerald-700">Save</button>
                    <button onClick={() => setEditingId(null)} className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-700">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{playbook.title}</h3>
                    <p className="text-sm text-gray-400">{playbook.description}</p>
                    <div className="flex gap-2 mt-2 text-xs text-gray-500">
                      <span className="bg-[#0a0a0a] px-2 py-1 rounded">{playbook.category}</span>
                      <span className="bg-[#0a0a0a] px-2 py-1 rounded">{playbook.tier}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingId(playbook.id); setFormData(playbook); }} className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700">Edit</button>
                    <button onClick={() => deletePlaybook(playbook.id)} className="px-3 py-1 bg-red-600 rounded hover:bg-red-700">Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
