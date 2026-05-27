'use client'
import React from 'react'

export default function StatsCard({ title, value, children }: { title: string, value: string | number, children?: React.ReactNode }) {
  return (
    <div className="bg-[#07182b] p-4 rounded border border-[#123047]">
      <div className="text-sm text-gray-400">{title}</div>
      <div className="text-2xl font-bold mt-2">{value}</div>
      {children}
    </div>
  )
}
