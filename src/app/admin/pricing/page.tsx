'use client'
import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'

export default function PricingAdmin(){
  const [monthly, setMonthly] = useState('')
  const [yearly, setYearly] = useState('')
  const [headline, setHeadline] = useState('')

  useEffect(()=>{ load() },[])
  const load = async ()=>{
    const { data } = await supabase.from('site_settings').select('key,value').in('key',['pricing_monthly','pricing_yearly','pricing_headline'])
    const map = Object.fromEntries((data||[]).map((d:any)=>[d.key, d.value]))
    setMonthly(map.pricing_monthly||'')
    setYearly(map.pricing_yearly||'')
    setHeadline(map.pricing_headline||'')
  }

  const save = async ()=>{
    await supabase.from('site_settings').upsert([{ key: 'pricing_monthly', value: monthly }, { key: 'pricing_yearly', value: yearly }, { key: 'pricing_headline', value: headline }])
    alert('Saved')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Pricing Editor</h1>
      <div className="grid gap-3 max-w-md">
        <label>Monthly price</label>
        <input className="p-2 bg-[#071f30] rounded" value={monthly} onChange={(e)=>setMonthly(e.target.value)} />
        <label>Yearly price</label>
        <input className="p-2 bg-[#071f30] rounded" value={yearly} onChange={(e)=>setYearly(e.target.value)} />
        <label>Headline</label>
        <input className="p-2 bg-[#071f30] rounded" value={headline} onChange={(e)=>setHeadline(e.target.value)} />
        <div className="flex gap-2">
          <button onClick={save} className="px-3 py-1 rounded bg-[#06b6d4]">Save</button>
        </div>
      </div>
    </div>
  )
}
