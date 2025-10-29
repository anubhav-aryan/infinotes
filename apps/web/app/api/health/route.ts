import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/db';

export async function GET() {
  try {
    await connectToDatabase();

    const state = mongoose.connection.readyState; // 0=disconnected,1=connected,2=connecting,3=disconnecting

    return NextResponse.json({
      ok: true,
      mongodb: {
        state,
        host: mongoose.connection.host,
        name: mongoose.connection.name,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
