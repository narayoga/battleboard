import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const session = await getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { lokasi, tipe } = await req.json()
    const ports = await prisma.odpPort.findMany({ where: { lokasi, tipe } })
    return NextResponse.json(ports)
  } catch (err) {
    console.error('[ODP READ ERROR]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
