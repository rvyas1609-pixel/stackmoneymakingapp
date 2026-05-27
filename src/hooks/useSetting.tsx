'use client'
import { useEffect, useState } from 'react'
import supabase from '../lib/supabase'

// Hook to read one setting and subscribe to realtime updates.
export default function useSetting(key: string) {
  const [value, setValue] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      const { data } = await supabase.from('site_settings').select('value').eq('key', key).single()
      if (mounted) setValue((data as any)?.value ?? null)

      supabase
        .channel(`public:site_settings:${key}`)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'site_settings', filter: `key=eq.${key}` }, (payload) => {
          if ((payload.new as any)?.value) setValue((payload.new as any).value)
        })
        .subscribe()
    }
    load()
    return () => { mounted = false }
  }, [key])

  return value
}
