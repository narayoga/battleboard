import { NextRequest, NextResponse } from 'next/server'
import { verifyJWT } from '@/lib/auth'

export async function proxy(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const { pathname } = req.nextUrl

  const isLoginPage = pathname === '/login'
  const isApiAuth   = pathname.startsWith('/api/auth')

  // Endpoint auth (login/logout) selalu lewat
  if (isApiAuth) return NextResponse.next()

  if (!token) {
    if (isLoginPage) return NextResponse.next()
    return NextResponse.redirect(new URL('/login', req.url))
  }

  try {
    await verifyJWT(token)
    // Sudah login, jangan akses halaman login
    if (isLoginPage) return NextResponse.redirect(new URL('/profile', req.url))
    return NextResponse.next()
  } catch {
    // Token expired atau invalid — hapus cookie, redirect ke login
    const res = NextResponse.redirect(new URL('/login', req.url))
    res.cookies.delete('token')
    return res
  }
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/login',
    '/api/((?!auth).+)', // semua /api/* kecuali /api/auth/*
  ],
}
