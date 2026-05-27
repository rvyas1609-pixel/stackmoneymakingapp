'use client'
import { useEffect } from 'react'
import supabase from '../lib/supabase'

// Generic realtime hook helper
export default function useRealtime(table: string, callback: (payload:any)=>void) {
  useEffect(() => {
    const channel = supabase.channel(`public:${table}`)
      .on('postgres_changes', { event: '*', schema: 'public', table }, (payload) => {
        callback(payload)
      })
      .subscribe()

    return () => { channel.unsubscribe() }
  }, [table, callback])
}
