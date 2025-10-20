import { useAuth as useAuthContext } from '@/components/providers'

export function useAuth() {
  return useAuthContext()
}
