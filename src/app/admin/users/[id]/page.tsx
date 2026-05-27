'use client'
import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'
import UserProfileDetail from '@/components/admin/UserProfileDetail'

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [profile, setProfile] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('profiles').select('*').eq('id', id).single()
      setProfile(data)
      setLoading(false)
    }
    load()
  }, [id])

  const handleAction = async (action: string) => {
    if (!profile) return
    if (action === 'make_admin') await supabase.from('profiles').update({ role: 'admin' }).eq('id', id)
    if (action === 'give_xp') {
      const amount = prompt('Amount of XP to give')
      if (!amount) return
      await supabase.from('profiles').update({ xp: (profile.xp||0) + parseInt(amount,10) }).eq('id', id)
    }
    if (action === 'ban') await supabase.from('profiles').update({ banned: true }).eq('id', id)
    // reload
    const { data } = await supabase.from('profiles').select('*').eq('id', id).single()
    setProfile(data)
  }

  if (loading) return <div>Loading…</div>
  if (!profile) return <div>User not found</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Detail</h1>
      <UserProfileDetail profile={profile} onAction={handleAction} />

      <section className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Subscription History</h2>
        <UserSubscriptions userId={id} />
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Achievements</h2>
        <UserAchievements userId={id} />
      </section>
    </div>
  )
}

function UserSubscriptions({ userId }: { userId: string }) {
  const [subs, setSubs] = useState<any[]>([])
  useEffect(()=>{ supabase.from('subscriptions').select('*').eq('user_id', userId).then(r=>setSubs(r.data||[])) },[userId])
  return (
    <div>
      {subs.length===0 && <div>No subscriptions</div>}
      {subs.map(s=> (
        <div key={s.id} className="p-2 bg-[#07182b] rounded my-2 border border-[#123047]">
          <div>Plan: {s.plan}</div>
          <div>Status: {s.status}</div>
          <div>Started: {new Date(s.started_at).toLocaleString()}</div>
          <div>Expires: {s.expires_at ? new Date(s.expires_at).toLocaleString() : 'N/A'}</div>
        </div>
      ))}
    </div>
  )
}

function UserAchievements({ userId }: { userId: string }) {
  const [ach, setAch] = useState<any[]>([])
  useEffect(()=>{ supabase.from('user_achievements').select('earned_at, achievement_id, achievements(name, badge_image, xp_reward)').eq('user_id', userId).then(r=>setAch(r.data||[])) },[userId])
  return (
    <div>
      {ach.length===0 && <div>No achievements</div>}
      {ach.map(a=> (
        <div key={a.achievement_id} className="p-2 bg-[#07182b] rounded my-2 border border-[#123047] flex items-center gap-4">
          <img src={a.achievements?.badge_image} className="w-12 h-12" />
          <div>
            <div className="font-semibold">{a.achievements?.name}</div>
            <div className="text-sm">XP: {a.achievements?.xp_reward}</div>
            <div className="text-xs text-gray-400">Earned: {new Date(a.earned_at).toLocaleString()}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
