'use client'

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('user_token')
    localStorage.removeItem('user_data')

    router.push('/login')
  }

  return (
    <Button onClick={handleLogout} variant="outline">
      Logout
    </Button>
  )
}