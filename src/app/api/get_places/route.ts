"use server"
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  if (request.headers.get('x-cron-key') !== process.env.CRON_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    return NextResponse.json("DONE");
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// TODOs:
// - script api che return JSON con key_segreta

// **VULNERABILE**
// - sistemare con app-check