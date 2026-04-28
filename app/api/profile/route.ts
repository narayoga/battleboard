import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const session = await getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { lokasi, tipe, bulan, tahun } = await req.json()
    const profile = await prisma.employeeProfile.findFirst({
      where: { lokasi, tipe, bulan, tahun },
    })
    return NextResponse.json(profile ? [profile] : [])
  } catch (err) {
    console.error('[PROFILE ERROR]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
