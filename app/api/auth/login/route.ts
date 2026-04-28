import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { signJWT } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()

    if (!username || !password) {
      return NextResponse.json({ message: 'Username dan password wajib diisi' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { username } })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ message: 'Incorrect username or password' }, { status: 401 })
    }

    const token = await signJWT({ id: user.id, username: user.username, role: user.role })

    const res = NextResponse.json({
      message: 'Login berhasil',
      username: user.username,
      role: user.role,
      handphone: user.handphone,
    })

    res.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8, // 8 jam
      path: '/',
    })

    return res
  } catch (err) {
    console.error('[LOGIN ERROR]', err)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
