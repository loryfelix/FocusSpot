"use server"
import { pool } from '@/src/lib/db';
import { NextResponse } from 'next/server';

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type, x-bearer-key',
    },
  });
}

export async function GET(request: Request) {
  if (request.headers.get('x-bearer-key') !== process.env.BEARER_KEY) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      {
        status: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }

  try {
    const result = await pool.query(`
      SELECT id, place_name, place_lat, place_long, has_ticket, has_consumption
      FROM places
      WHERE stato=2
    `);

    const customData = result.rows.map(row => ({
      id: row.id,
      placeName: row.place_name,
      placeLat: row.place_lat,
      placeLong: row.place_long,
      isClosed: false,
      isTicket: row.has_ticket,
      isPaid: row.has_consumption,
    }));

    return NextResponse.json(customData, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error }, {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}

// TODOs:
// - aperto/chiuso giorni non americani 0 = lunedi

// **VULNERABILE**
// - sistemare con app-check