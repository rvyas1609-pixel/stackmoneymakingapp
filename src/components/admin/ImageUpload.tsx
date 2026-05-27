'use client'
import React, { useState } from 'react'
import supabase from '../../lib/supabase'

export default function ImageUpload({ value, onChange, pathPrefix }: { value?: string, onChange?: (v:string)=>void, pathPrefix?: string }) {
  const [loading, setLoading] = useState(false)
  const handle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setLoading(true)
    const path = `${pathPrefix || 'site-assets'}/${file.name}`
    const { error } = await supabase.storage.from('site-assets').upload(path, file, { upsert: true })
    if (error) { alert('Upload failed: ' + error.message); setLoading(false); return }
    const { data } = supabase.storage.from('site-assets').getPublicUrl(path)
    onChange?.(data.publicUrl)
    setLoading(false)
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handle} />
      {loading && <div className="text-sm text-gray-400">Uploading…</div>}
      {value && <img src={value} alt="preview" className="mt-2 h-24 rounded" />}
    </div>
  )
}
