import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth/auth.config';
import { connectToDatabase } from '@/lib/db';
import { ClientModel, UserModel } from '@infilects/database';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    
    // Find user by email
    const user = await UserModel.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get clients assigned to this user
    const assignedClientIds = user.assignedClients || [];
    const clients = await ClientModel.find({
      _id: { $in: assignedClientIds }
    }).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: clients });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

