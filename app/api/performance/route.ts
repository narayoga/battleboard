import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const session = await getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { performance, tahun, lokasi, tipe } = await req.json()
    const data = await prisma.performanceMonthly.findFirst({
      where: { lokasi, tipe, tahun, type: performance },
    })
    return NextResponse.json(data ? [data] : [])
  } catch (err) {
    console.error('[PERFORMANCE ERROR]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
