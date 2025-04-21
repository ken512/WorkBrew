import { createSupabaseClient } from "@/_utils/supabase";
import { Session } from '@supabase/supabase-js' 
import { usePathname } from "next/navigation";
import { useState, useEffect } from 'react'

export const useSupabaseSession = () => {
  const pathname = usePathname()
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoding] = useState(true);
  
  useEffect(() => {
    const supabase = createSupabaseClient();
    const fetcher = async() => {
      const {
        data: {session},
      } = await supabase.auth.getSession()
      setSession(session)
      setToken(session?.access_token || null)
      setIsLoding(false)
    }
    fetcher()  
  }, [pathname])

  return {session, isLoading, token}
}