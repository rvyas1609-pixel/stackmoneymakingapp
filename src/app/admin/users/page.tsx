'use client'
import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'
import DataTable from '@/components/admin/DataTable'
import ConfirmDialog from '@/components/admin/ConfirmDialog'

export default function UsersAdminPage() {
  const [users, setUsers] = useState<any[]>([])
  const [selected, setSelected] = useState<any | null>(null)
  const [showDelete, setShowDelete] = useState<any | null>(null)

  useEffect(() => {
    load()
    const ch = supabase.channel('public:profiles').on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, (payload) => {
      if (payload.eventType === 'DELETE') setUsers((u) => u.filter(x => x.id !== payload.old.id))
      else setUsers((u) => { const idx = u.findIndex(x => x.id === (payload.new as any)?.id); if (idx !== -1) { const c = [...u]; c[idx] = payload.new; return c } return [payload.new, ...u] })
    })
    void ch.subscribe()
    return () => { void ch.unsubscribe() }
  }, [])

  const load = async () => {
    const { data, error } = await supabase.from('profiles').select('id, username, full_name, avatar_url, plan, xp, level, role, banned, created_at, email')
    if (error) alert('Load failed: ' + error.message)
    setUsers(data || [])
  }

  const makeAdmin = async (row:any) => {
    const { error } = await supabase.from('profiles').update({ role: 'admin' }).eq('id', row.id)
    if (error) alert('Update failed: ' + error.message)
  }

  const removeAdmin = async (row:any) => {
    const { error } = await supabase.from('profiles').update({ role: 'user' }).eq('id', row.id)
    if (error) alert('Update failed: ' + error.message)
  }

  const banUser = async (row:any) => {
    const { error } = await supabase.from('profiles').update({ banned: true }).eq('id', row.id)
    if (error) alert('Ban failed: ' + error.message)
  }

  const unbanUser = async (row:any) => {
    const { error } = await supabase.from('profiles').update({ banned: false }).eq('id', row.id)
    if (error) alert('Unban failed: ' + error.message)
  }

  const giveXP = async (row:any) => {
    const amount = prompt('Give how much XP?')
    if (!amount) return
    const { error } = await supabase.from('profiles').update({ xp: (row.xp||0) + parseInt(amount,10) }).eq('id', row.id)
    if (error) alert('Give XP failed: ' + error.message)
  }

  const deleteUser = async (row:any) => {
    // caution: does not delete auth.users entry
    const { error } = await supabase.from('profiles').delete().eq('id', row.id)
    if (error) alert('Delete failed: ' + error.message)
    setShowDelete(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
      </div>

      <DataTable columns={[{key:'full_name', label:'Name'},{key:'email', label:'Email'},{key:'plan', label:'Plan'},{key:'xp', label:'XP'},{key:'level', label:'Level'},{key:'role', label:'Role'}]} data={users} renderRowActions={(row)=> (
        <div className="flex gap-2">
          <button onClick={()=>setSelected(row)} className="px-2 py-1 bg-[#06b6d4] rounded">View</button>
          {row.role !== 'admin' ? <button onClick={()=>makeAdmin(row)} className="px-2 py-1 bg-[#FFD166] rounded">Make Admin</button> : <button onClick={()=>removeAdmin(row)} className="px-2 py-1 bg-[#888] rounded">Revoke Admin</button>}
          {!row.banned ? <button onClick={()=>banUser(row)} className="px-2 py-1 bg-red-600 rounded hover:bg-red-700">Ban</button> : <button onClick={()=>unbanUser(row)} className="px-2 py-1 bg-green-600 rounded hover:bg-green-700">Unban</button>}
          <button onClick={()=>giveXP(row)} className="px-2 py-1 bg-gold text-bg-primary rounded font-semibold hover:bg-gold/90">Give XP</button>
          <button onClick={()=>setShowDelete(row)} className="px-2 py-1 bg-red-600 rounded hover:bg-red-700">Delete</button>
        </div>
      )} />

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-start justify-center p-6 overflow-auto">
          <div className="bg-[#06202a] p-6 rounded w-full max-w-3xl">
            <button className="mb-4" onClick={()=>setSelected(null)}>Back</button>
            <h2 className="text-xl font-semibold mb-4">{selected.full_name || selected.username}</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <img src={selected.avatar_url || '/default-avatar.png'} className="w-32 h-32 rounded" alt="avatar" />
              </div>
              <div>
                <div>Email: {selected.email}</div>
                <div>Plan: {selected.plan}</div>
                <div>XP: {selected.xp}</div>
                <div>Level: {selected.level}</div>
                <div>Role: {selected.role}</div>
                <div>Joined: {new Date(selected.created_at).toLocaleString()}</div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button onClick={()=>giveXP(selected)} className="px-3 py-1 rounded bg-[#06b6d4]">Give XP</button>
              <button onClick={()=>setShowDelete(selected)} className="px-3 py-1 rounded bg-red-600 hover:bg-red-700">Delete Profile</button>
            </div>
          </div>
        </div>
      )}

      {showDelete && (
        <ConfirmDialog title={`Delete ${showDelete.full_name}?`} onConfirm={()=>deleteUser(showDelete)} onCancel={()=>setShowDelete(null)} />
      )}
    </div>
  )
}
