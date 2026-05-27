'use client'
import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'

// Site Settings admin page. Lists keys from `site_settings` and allows inline edits.
export default function SiteSettingsPage() {
  const [settings, setSettings] = useState<any[]>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      const { data } = await supabase.from('site_settings').select('*').order('section')
      if (mounted) setSettings(data || [])

      // Realtime subscription for instant frontend updates
      supabase
        .channel('public:site_settings')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'site_settings' }, (payload) => {
          // Replace or add
            setSettings((cur) => {
              const idx = cur.findIndex((s) => s.id === (payload.new as any)?.id)
            if (idx !== -1) {
              const copy = [...cur]
              copy[idx] = payload.new
              return copy
            }
            return [payload.new, ...cur]
          })
        })
        .subscribe()
    }
    load()
    return () => { mounted = false }
  }, [])

  const handleChange = (id: string, value: any) => {
    setSettings((s) => s.map((row) => (row.id === id ? { ...row, value } : row)))
  }

  const saveRow = async (row: any) => {
    setSaving(true)
    const { error } = await supabase.from('site_settings').update({ value: row.value, updated_at: new Date() }).eq('id', row.id)
    setSaving(false)
    if (error) alert('Save failed: ' + error.message)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Site Settings</h1>
      <div className="grid gap-3">
        {settings.map((row) => (
          <div key={row.id} className="bg-[#07182b] p-4 rounded border border-[#0f2b43] flex items-start gap-4">
            <div className="w-48">
              <div className="text-sm text-gray-300">{row.section} • {row.label || row.key}</div>
              <div className="text-xs text-gray-500">{row.key}</div>
            </div>
            <div className="flex-1">
              {row.type === 'text' && (
                <input className="w-full p-2 rounded bg-[#0b2940] border border-[#12304a]" value={row.value || ''} onChange={(e) => handleChange(row.id, e.target.value)} />
              )}
              {row.type === 'boolean' && (
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={row.value === 'true' || row.value === true} onChange={(e) => handleChange(row.id, e.target.checked ? 'true' : 'false')} />
                  <span className="text-sm">Enabled</span>
                </label>
              )}
              {row.type === 'image' && (
                <div>
                  <input type="file" onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    const path = `site-assets/${row.key}/${file.name}`
                    const { error: upErr } = await supabase.storage.from('site-assets').upload(path, file, { upsert: true })
                    if (upErr) { alert('Upload failed: ' + upErr.message); return }
                    const { data } = supabase.storage.from('site-assets').getPublicUrl(path)
                    handleChange(row.id, data.publicUrl)
                  }} />
                  {row.value && <img src={row.value} alt={row.key} className="mt-2 h-24 rounded" />}
                </div>
              )}
            </div>
            <div className="w-36 flex flex-col gap-2">
              <button className="px-3 py-1 rounded bg-[#FFD166] text-black" onClick={() => saveRow(row)} disabled={saving}>Save</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
