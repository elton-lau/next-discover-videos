import { useRouter } from 'next/router'
import { useAuthenticationStatus } from '@nhost/nextjs'

export function authProtected(Comp) {
  return function AuthProtected(props) {
    const router = useRouter()
    const { isLoading, isAuthenticated } = useAuthenticationStatus()

    if (isLoading) {
      return <div>Loading...</div>
    }

    if (!isAuthenticated) {
      router.push('/login')
      return null
    }

    return <Comp {...props} />
  }
}