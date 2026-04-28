import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const session = await getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { lokasi, tipe, tahun } = await req.json()
    const history = await prisma.odpHistory.findMany({
      where: { lokasi, tipe, tahun },
      orderBy: { bulan: 'asc' },
    })
    return NextResponse.json(history)
  } catch (err) {
    console.error('[ODP HISTORY ERROR]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
