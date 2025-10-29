import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth/auth.config';
import { connectToDatabase } from '@/lib/db';
import { ClientModel } from '@infilects/database';
import { CreateClientForm } from '@infilects/types';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const clients = await ClientModel.find({}).populate('assignedUserId').sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: clients });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: CreateClientForm = await request.json();
    
    await connectToDatabase();
    const client = new ClientModel({
      name: body.name,
      email: body.email,
      company: body.company,
      status: body.status || 'prospect',
      assignedUserId: body.assignedUserId || null,
      notes: body.notes || '',
    });

    await client.save();
    
    return NextResponse.json({ success: true, data: client }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
