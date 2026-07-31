import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

// Server in-memory fallback cache for leads
let localLeadsStore: any[] = [];

export async function GET() {
  try {
    const sanityLeads = await client.fetch(`*[_type == "lead"] | order(_createdAt desc)`);
    if (sanityLeads && Array.isArray(sanityLeads) && sanityLeads.length > 0) {
      return NextResponse.json([...sanityLeads, ...localLeadsStore]);
    }
    return NextResponse.json(localLeadsStore);
  } catch (error) {
    console.error('Failed to fetch leads from Sanity, using store fallback:', error);
    return NextResponse.json(localLeadsStore);
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    const newLead = {
      _id: "lead-" + Math.random().toString(36).substr(2, 9),
      _type: 'lead',
      date: new Date().toISOString(),
      status: 'Pending',
      ...data
    };

    if (process.env.SANITY_API_TOKEN) {
      try {
        const writeClient = client.withConfig({
          token: process.env.SANITY_API_TOKEN,
          useCdn: false
        });
        const sanityResponse = await writeClient.create(newLead);
        return NextResponse.json(sanityResponse);
      } catch (err) {
        console.warn('Sanity API write failed, storing lead in API memory store:', err);
      }
    }

    localLeadsStore.unshift(newLead);
    return NextResponse.json(newLead, { status: 200 });
  } catch (error) {
    console.error('Failed to create lead:', error);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}
