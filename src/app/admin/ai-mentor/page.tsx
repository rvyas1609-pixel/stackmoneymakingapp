'use client'
import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'

export default function AIMentorAdmin(){
  const [settings, setSettings] = useState<any | null>(null)
  const [questions, setQuestions] = useState<any[]>([])

  useEffect(()=>{
    load()
    const ch = supabase.channel('public:ai_mentor_settings').on('postgres_changes', { event: '*', schema: 'public', table: 'ai_mentor_settings' }, (p) => { if (p.new) setSettings(p.new) })
    const qCh = supabase.channel('public:ai_conversations').on('postgres_changes', { event: '*', schema: 'public', table: 'ai_conversations' }, (p) => { if (p.eventType !== 'DELETE') setQuestions((s) => [p.new, ...s]) })
    void ch.subscribe()
    void qCh.subscribe()
    return () => { void ch.unsubscribe(); void qCh.unsubscribe() }
  }, [])

  const load = async ()=>{
    const { data } = await supabase.from('ai_mentor_settings').select('*').limit(1).single()
    const qs = await supabase.from('ai_conversations').select('*').order('created_at',{ascending:false}).limit(100)
    setSettings(data||{})
    setQuestions(qs.data||[])
  }

  const save = async ()=>{ await supabase.from('ai_mentor_settings').upsert(settings) }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">AI Mentor</h1>
      <div className="bg-[#07182b] p-4 rounded mb-4">
        <div className="mb-2">System Prompt</div>
        <textarea className="w-full p-2 bg-[#071f30] rounded h-36" value={settings?.system_prompt||''} onChange={(e)=>setSettings({...settings, system_prompt: e.target.value})} />
        <div className="flex gap-2 mt-2">
          <input className="p-2 bg-[#071f30] rounded" value={settings?.free_daily_limit||3} onChange={(e)=>setSettings({...settings, free_daily_limit: parseInt(e.target.value||'0',10)})} />
          <input className="p-2 bg-[#071f30] rounded" value={settings?.premium_daily_limit||50} onChange={(e)=>setSettings({...settings, premium_daily_limit: parseInt(e.target.value||'0',10)})} />
          <button onClick={save} className="px-3 py-1 rounded bg-[#06b6d4]">Save</button>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-2">Recent Questions</h2>
      <div className="grid gap-2">
        {questions.map(q=> (
          <div key={q.id} className="bg-[#07182b] p-2 rounded">
            <div className="text-sm text-gray-400">{q.user_id} • {new Date(q.created_at).toLocaleString()}</div>
            <div className="mt-1">Q: {q.question}</div>
            <div className="mt-1 text-gray-200">A: {q.answer}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
