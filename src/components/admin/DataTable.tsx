'use client'
import React from 'react'

export default function DataTable({ columns, data, renderRowActions }: { columns: { key: string, label: string }[], data: any[], renderRowActions?: (row:any)=>React.ReactNode }) {
  return (
    <div className="overflow-x-auto bg-[#061828] rounded border border-[#123047]">
      <table className="w-full table-auto text-left">
        <thead className="bg-[#051220] text-sm text-gray-300">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="px-4 py-3">{c.label}</th>
            ))}
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-t border-[#0e2a3d] hover:bg-[#071e2b]">
              {columns.map((c) => (
                <td key={c.key} className="px-4 py-3 align-top">{String(row[c.key] ?? '')}</td>
              ))}
              <td className="px-4 py-3">{renderRowActions ? renderRowActions(row) : null}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
