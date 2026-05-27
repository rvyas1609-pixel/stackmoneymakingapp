'use client'
import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'

export default function DiscountsAdmin(){
  const [codes, setCodes] = useState<any[]>([])
  const [newCode, setNewCode] = useState({ code:'', discount_percent:10, max_uses:1, expires_at:'', active:true })

  useEffect(()=>{ load() },[])
  const load = async ()=>{ const { data } = await supabase.from('discount_codes').select('*').order('created_at',{ascending:false}); setCodes(data||[]) }
  const saveNew = async ()=>{ await supabase.from('discount_codes').insert(newCode); setNewCode({ code:'', discount_percent:10, max_uses:1, expires_at:'', active:true }); load() }
  const remove = async (row:any)=>{ await supabase.from('discount_codes').delete().eq('id', row.id); load() }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Discount Codes</h1>
      <div className="grid gap-2 max-w-2xl mb-4">
        <div className="grid grid-cols-3 gap-2">
          <input className="p-2 bg-[#071f30] rounded" placeholder="Code" value={newCode.code} onChange={(e)=>setNewCode({...newCode, code:e.target.value})} />
          <input type="number" className="p-2 bg-[#071f30] rounded" placeholder="Discount %" value={newCode.discount_percent} onChange={(e)=>setNewCode({...newCode, discount_percent: parseInt(e.target.value||'0',10)})} />
          <input type="number" className="p-2 bg-[#071f30] rounded" placeholder="Max uses" value={newCode.max_uses} onChange={(e)=>setNewCode({...newCode, max_uses: parseInt(e.target.value||'0',10)})} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input type="datetime-local" className="p-2 bg-[#071f30] rounded" value={newCode.expires_at} onChange={(e)=>setNewCode({...newCode, expires_at:e.target.value})} />
          <label className="flex items-center gap-2"><input type="checkbox" checked={newCode.active} onChange={(e)=>setNewCode({...newCode, active:e.target.checked})} /> Active</label>
        </div>
        <button onClick={saveNew} className="px-3 py-1 rounded bg-[#06b6d4]">Create Code</button>
      </div>

      <div className="grid gap-2">
        {codes.map(code=> (
          <div key={code.id} className="bg-[#07182b] p-3 rounded flex items-center justify-between">
            <div>
              <div className="font-semibold">{code.code}</div>
              <div className="text-sm text-gray-400">{code.discount_percent}% • Uses: {code.used_count}/{code.max_uses} • {code.active? 'Active' : 'Inactive'}</div>
            </div>
            <button onClick={()=>remove(code)} className="px-2 py-1 rounded bg-red-600 hover:bg-red-700">Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}
