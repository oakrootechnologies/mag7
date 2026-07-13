import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const leads = await client.fetch(`*[_type == "lead"] | order(_createdAt desc)`);
    return NextResponse.json(leads);
  } catch (error) {
    console.error('Failed to fetch leads:', error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // We need a write client, so we create one with a token if available
    const writeClient = client.withConfig({
      token: process.env.SANITY_API_TOKEN,
      useCdn: false
    });

    const newLead = {
      _type: 'lead',
      date: new Date().toISOString(),
      status: 'Pending',
      ...data
    };

    const response = await writeClient.create(newLead);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Failed to create lead:', error);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}
