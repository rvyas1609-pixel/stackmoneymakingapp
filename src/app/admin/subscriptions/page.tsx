'use client'
import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'
import DataTable from '@/components/admin/DataTable'

export default function SubscriptionsAdminPage(){
  const [subs, setSubs] = useState<any[]>([])

  useEffect(()=>{
    load()
    const ch = supabase.channel('public:subscriptions').on('postgres_changes', { event: '*', schema: 'public', table: 'subscriptions' }, (p) => {
      if (p.eventType === 'DELETE') setSubs((s) => s.filter(x => x.id !== p.old.id))
      else setSubs((s) => { const i = s.findIndex(x => x.id === (p.new as any)?.id); if (i !== -1) { const c = [...s]; c[i] = p.new; return c } return [p.new, ...s] })
    })
    void ch.subscribe()
    return () => { void ch.unsubscribe() }
  },[])

  const load = async ()=>{ const { data } = await supabase.from('subscriptions').select('*, profiles(full_name, email)').order('started_at',{ascending:false}); setSubs(data||[]) }
  const cancel = async (row:any)=>{ await supabase.from('subscriptions').update({ status: 'cancelled' }).eq('id', row.id) }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Subscriptions</h1>
      <DataTable columns={[{key:'plan', label:'Plan'},{key:'status', label:'Status'},{key:'price_paid', label:'Amount'},{key:'started_at', label:'Started'}]} data={subs} renderRowActions={(r)=> (
        <div className="flex gap-2">
          <button onClick={()=>cancel(r)} className="px-2 py-1 bg-red-600 rounded hover:bg-red-700">Cancel</button>
        </div>
      )} />
    </div>
  )
}
