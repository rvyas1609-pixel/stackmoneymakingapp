'use client'
import React from 'react'

// Minimal rich text editor placeholder. Replace with TipTap/Quill in future.
export default function RichTextEditor({ value, onChange }: { value?: string, onChange?: (v:string)=>void }) {
  return (
    <textarea className="w-full h-48 p-2 bg-[#071f30] border border-[#123045] rounded" value={value||''} onChange={(e)=>onChange?.(e.target.value)} />
  )
}
