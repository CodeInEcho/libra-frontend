import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import http from 'axios'

export async function GET(req: Request) {
  let res = null;
  const token = cookies().get('refresh_token')?.value
  if (token) {
    try {
      const data = await http.post('http://localhost:3001/auth/refreshToken', { token: token })
      res = data.data.data;
    } catch (error) {}
  }

  return NextResponse.json(res)
}