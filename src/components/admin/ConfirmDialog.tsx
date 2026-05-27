'use client'
import React from 'react'

export default function ConfirmDialog({ title, onConfirm, onCancel }: { title: string, onConfirm: ()=>void, onCancel: ()=>void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-[#061528] p-4 rounded border border-[#123047] w-full max-w-md">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onCancel} className="px-3 py-1 rounded bg-transparent border border-[#123047]">Cancel</button>
          <button onClick={onConfirm} className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white">Delete</button>
        </div>
      </div>
    </div>
  )
}
