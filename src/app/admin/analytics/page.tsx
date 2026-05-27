'use client'
import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'

export default function AnalyticsAdmin(){
  const [totals, setTotals] = useState({ users:0, premium:0, free:0, revenue:0, signups:0 })
  const [topContent, setTopContent] = useState<any[]>([])
  const [topPrompts, setTopPrompts] = useState<any[]>([])

  useEffect(()=>{ load() },[])
  const load = async ()=>{
    const users = await supabase.from('profiles').select('id', { count: 'exact' })
    const premium = await supabase.from('profiles').select('id', { count: 'exact' }).eq('plan','premium')
    const free = await supabase.from('profiles').select('id', { count: 'exact' }).eq('plan','free')
    const revenue = await supabase.from('subscriptions').select('price_paid', { count: 'exact' })
    const topc = await supabase.from('content').select('*').order('views',{ascending:false}).limit(5)
    const topp = await supabase.from('prompts').select('*').order('copies',{ascending:false}).limit(5)
    setTotals({ users: users.count || 0, premium: premium.count || 0, free: free.count || 0, revenue: revenue.data?.reduce((sum:any,item:any)=>sum+(item.price_paid||0),0) || 0, signups: 0 })
    setTopContent(topc.data||[])
    setTopPrompts(topp.data||[])
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>
      <div className="grid gap-3 md:grid-cols-3 mb-6">
        <div className="bg-[#07182b] p-4 rounded">Total users<div className="text-3xl font-bold mt-2">{totals.users}</div></div>
        <div className="bg-[#07182b] p-4 rounded">Premium<div className="text-3xl font-bold mt-2">{totals.premium}</div></div>
        <div className="bg-[#07182b] p-4 rounded">Revenue<div className="text-3xl font-bold mt-2">${totals.revenue}</div></div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="bg-[#07182b] p-4 rounded">
          <h2 className="font-semibold mb-2">Top Content</h2>
          <ul className="space-y-2">{topContent.map(item=> <li key={item.id}>{item.title} ({item.views})</li>)}</ul>
        </div>
        <div className="bg-[#07182b] p-4 rounded">
          <h2 className="font-semibold mb-2">Top Prompts</h2>
          <ul className="space-y-2">{topPrompts.map(item=> <li key={item.id}>{item.title} ({item.copies})</li>)}</ul>
        </div>
      </div>
    </div>
  )
}
