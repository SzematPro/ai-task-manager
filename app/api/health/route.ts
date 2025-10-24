import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const uptime = process.uptime()
    const timestamp = new Date().toISOString()
    
    return NextResponse.json({
      status: 'ok',
      timestamp,
      uptime,
    })
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Health check failed',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}