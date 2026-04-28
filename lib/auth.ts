import { SignJWT, jwtVerify } from 'jose'
import { NextRequest } from 'next/server'

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export interface SessionPayload {
  id: number
  username: string
  role: string
}

export async function signJWT(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(secret)
}

export async function verifyJWT(token: string): Promise<SessionPayload> {
  const { payload } = await jwtVerify(token, secret)
  return payload as unknown as SessionPayload
}

export async function getSession(req: NextRequest): Promise<SessionPayload | null> {
  const token = req.cookies.get('token')?.value
  if (!token) return null
  try {
    return await verifyJWT(token)
  } catch {
    return null
  }
}
