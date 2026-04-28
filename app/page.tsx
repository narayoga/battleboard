import { redirect } from 'next/navigation'

// Root: redirect ke /profile (middleware akan handle jika belum login → /login)
export default function Home() {
  redirect('/profile')
}
