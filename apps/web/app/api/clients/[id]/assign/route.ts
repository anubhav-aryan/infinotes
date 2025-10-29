import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth/auth.config';
import { connectToDatabase } from '@/lib/db';
import { ClientModel, UserModel } from '@infilects/database';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { assignedUserId } = await request.json();
    const { id: clientId } = await params;

    await connectToDatabase();

    // Update client assignment
    const client = await ClientModel.findByIdAndUpdate(
      clientId,
      { assignedUserId: assignedUserId || null },
      { new: true }
    );

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    // Update user's assigned clients array
    if (assignedUserId) {
      await UserModel.findByIdAndUpdate(assignedUserId, {
        $addToSet: { assignedClients: clientId }
      });
    }

    // Remove from previous user's assigned clients
    const previousClient = await ClientModel.findById(clientId);
    if (previousClient?.assignedUserId && previousClient.assignedUserId !== assignedUserId) {
      await UserModel.findByIdAndUpdate(previousClient.assignedUserId, {
        $pull: { assignedClients: clientId }
      });
    }
    
    return NextResponse.json({ success: true, data: client });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
