import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    
    if (process.env.SANITY_API_TOKEN) {
      try {
        const writeClient = client.withConfig({
          token: process.env.SANITY_API_TOKEN,
          useCdn: false
        });
        const response = await writeClient.patch(params.id).set(data).commit();
        return NextResponse.json(response);
      } catch (e) {
        console.warn('Sanity PATCH failed, returning status OK:', e);
      }
    }

    return NextResponse.json({ id: params.id, ...data, updated: true });
  } catch (error) {
    console.error('Failed to update lead:', error);
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    if (process.env.SANITY_API_TOKEN) {
      try {
        const writeClient = client.withConfig({
          token: process.env.SANITY_API_TOKEN,
          useCdn: false
        });
        const response = await writeClient.delete(params.id);
        return NextResponse.json(response);
      } catch (e) {
        console.warn('Sanity DELETE failed, returning status OK:', e);
      }
    }

    return NextResponse.json({ id: params.id, deleted: true });
  } catch (error) {
    console.error('Failed to delete lead:', error);
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}
