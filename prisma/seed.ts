import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { parse } from 'csv-parse/sync'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

function readCSV(filename: string) {
  const filePath = path.join(__dirname, 'data', filename)
  return parse(fs.readFileSync(filePath), { columns: true, skip_empty_lines: true })
}

function readJSON(filename: string) {
  const filePath = path.join(__dirname, 'data', filename)
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

function toFloat(val: string | undefined): number | null {
  if (!val || val.trim() === '') return null
  return parseFloat(val)
}

async function main() {
  console.log('🌱 Mulai seeding...')

  // 1. Locations — dari locations.json (data.json lama)
  console.log('📍 Seeding locations...')
  const locations = readJSON('locations.json')
  await prisma.location.createMany({ data: locations, skipDuplicates: true })
  console.log(`   ✓ ${locations.length} locations`)

  // 2. Users — dari users.csv (password di-hash bcrypt)
  console.log('👤 Seeding users...')
  const users: any[] = readCSV('users.csv')
  for (const u of users) {
    const hashed = await bcrypt.hash(u.password, 10)
    await prisma.user.upsert({
      where: { username: u.username },
      update: { password: hashed, role: u.role, handphone: u.handphone },
      create: { username: u.username, password: hashed, role: u.role, handphone: u.handphone },
    })
  }
  console.log(`   ✓ ${users.length} users`)

  // 3. Employee Profiles — dari employee_profiles.csv
  console.log('🧑‍💼 Seeding employee profiles...')
  const profiles: any[] = readCSV('employee_profiles.csv')
  const profileData = profiles.map((p) => ({
    lokasi: p.lokasi,
    tipe: p.tipe,
    bulan: p.bulan,
    tahun: p.tahun,
    nama: p.nama,
    jabatan: p.jabatan,
    level: p.level,
    photoUrl: p.photoUrl || null,
    lis: toFloat(p.lis) ?? 0,
    billingAmount: toFloat(p.billingAmount) ?? 0,
    newSales: toFloat(p.newSales) ?? 0,
  }))
  await prisma.employeeProfile.createMany({ data: profileData, skipDuplicates: true })
  console.log(`   ✓ ${profileData.length} employee profiles`)

  // 4. Performance Monthly — dari performance.csv
  console.log('📊 Seeding performance monthly...')
  const perfs: any[] = readCSV('performance.csv')
  const perfData = perfs.map((p) => ({
    lokasi: p.lokasi,
    tipe: p.tipe,
    tahun: p.tahun,
    type: p.type,
    jan: toFloat(p.jan),
    feb: toFloat(p.feb),
    mar: toFloat(p.mar),
    apr: toFloat(p.apr),
    mei: toFloat(p.mei),
    jun: toFloat(p.jun),
    jul: toFloat(p.jul),
    agu: toFloat(p.agu),
    sep: toFloat(p.sep),
    okt: toFloat(p.okt),
    nov: toFloat(p.nov),
    des: toFloat(p.des),
  }))
  await prisma.performanceMonthly.createMany({ data: perfData, skipDuplicates: true })
  console.log(`   ✓ ${perfData.length} performance records`)

  // 5. ODP Ports — dari odp_ports.csv
  console.log('🗺️  Seeding ODP ports...')
  const ports: any[] = readCSV('odp_ports.csv')
  const portData = ports.map((p) => ({
    lokasi: p.lokasi,
    tipe: p.tipe,
    latitude: toFloat(p.latitude) ?? 0,
    longitude: toFloat(p.longitude) ?? 0,
  }))
  await prisma.odpPort.createMany({ data: portData, skipDuplicates: true })
  console.log(`   ✓ ${portData.length} ODP ports`)

  // 6. ODP History — dari odp_history.csv
  console.log('📈 Seeding ODP history...')
  const histories: any[] = readCSV('odp_history.csv')
  const historyData = histories.map((h) => ({
    lokasi: h.lokasi,
    tipe: h.tipe,
    tahun: h.tahun,
    bulan: parseInt(h.bulan),
    isTotal: toFloat(h.isTotal) ?? 0,
    avai: toFloat(h.avai) ?? 0,
    used: toFloat(h.used) ?? 0,
  }))
  await prisma.odpHistory.createMany({ data: historyData, skipDuplicates: true })
  console.log(`   ✓ ${historyData.length} ODP history records`)

  console.log('\n✅ Seeding selesai!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding gagal:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
