'use client'
import React from 'react'

export default function UserProfileDetail({ profile, onAction }: { profile: any, onAction?: (action:string)=>void }) {
  return (
    <div className="bg-[#061428] p-4 rounded border border-[#123047]">
      <div className="flex items-center gap-4">
        <img src={profile.avatar_url || '/default-avatar.png'} className="w-20 h-20 rounded" alt="avatar" />
        <div>
          <div className="text-lg font-semibold">{profile.full_name || profile.username}</div>
          <div className="text-sm text-gray-400">{profile.email}</div>
          <div className="text-sm mt-2">Plan: <strong>{profile.plan}</strong></div>
          <div className="text-sm">XP: <strong>{profile.xp}</strong> • Level: <strong>{profile.level}</strong></div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button className="px-3 py-1 rounded bg-[#06b6d4]" onClick={()=>onAction?.('make_admin')}>Make Admin</button>
        <button className="px-3 py-1 rounded bg-[#FFD166]" onClick={()=>onAction?.('give_xp')}>Give XP</button>
        <button className="px-3 py-1 rounded bg-red-600 hover:bg-red-700" onClick={()=>onAction?.('ban')}>Ban</button>
      </div>
    </div>
  )
}
