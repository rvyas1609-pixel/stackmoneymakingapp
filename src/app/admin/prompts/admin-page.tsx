'use client'
import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'

interface Prompt {
  id: string
  title: string
  category: string
  content: string
  tier: string
  tags: string[]
  created_at: string
}

export default function PromptsAdminPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Prompt>>({})

  useEffect(() => {
    loadPrompts()
    const ch = supabase.channel('public:prompts').on('postgres_changes', { event: '*', schema: 'public', table: 'prompts' }, (payload) => {
      if (payload.eventType === 'DELETE') setPrompts(p => p.filter(x => x.id !== payload.old.id))
      else loadPrompts()
    })
    void ch.subscribe()
    return () => { void ch.unsubscribe() }
  }, [])

  const loadPrompts = async () => {
    try {
      const { data, error } = await supabase.from('prompts').select('*').order('created_at', { ascending: false })
      if (error) throw error
      setPrompts(data || [])
    } finally {
      setLoading(false)
    }
  }

  const savePrompt = async () => {
    if (!editingId || !formData.title) return
    const { error } = await supabase.from('prompts').update(formData).eq('id', editingId)
    if (error) alert('Error: ' + error.message)
    else {
      setEditingId(null)
      loadPrompts()
    }
  }

  const deletePrompt = async (id: string) => {
    if (!confirm('Delete this prompt?')) return
    const { error } = await supabase.from('prompts').delete().eq('id', id)
    if (error) alert('Error: ' + error.message)
    else loadPrompts()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Prompts</h1>
        <button className="px-4 py-2 bg-emerald-600 rounded-lg hover:bg-emerald-700 transition">
          + New Prompt
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <div className="space-y-3">
          {prompts.map((prompt) => (
            <div key={prompt.id} className="bg-[#111] border border-[#222] rounded-lg p-4 hover:border-[#333] transition">
              {editingId === prompt.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Title"
                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#222] rounded text-white placeholder-gray-500"
                  />
                  <textarea
                    value={formData.content || ''}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Content"
                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#222] rounded text-white placeholder-gray-500 h-32"
                  />
                  <div className="flex gap-2">
                    <button onClick={savePrompt} className="px-3 py-1 bg-emerald-600 rounded hover:bg-emerald-700">Save</button>
                    <button onClick={() => setEditingId(null)} className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-700">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{prompt.title}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{prompt.content}</p>
                    <div className="flex gap-2 mt-2 text-xs text-gray-500">
                      <span className="bg-[#0a0a0a] px-2 py-1 rounded">{prompt.category}</span>
                      <span className="bg-[#0a0a0a] px-2 py-1 rounded">{prompt.tier}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button onClick={() => { setEditingId(prompt.id); setFormData(prompt); }} className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 whitespace-nowrap">Edit</button>
                    <button onClick={() => deletePrompt(prompt.id)} className="px-3 py-1 bg-red-600 rounded hover:bg-red-700 whitespace-nowrap">Delete</button>
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
