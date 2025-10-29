import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth/auth.config';
import { connectToDatabase } from '@/lib/db';
import { UserModel } from '@infilects/database';
import { redirect } from 'next/navigation';
import { UserRole } from '@infilects/types';

export async function requireUser() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect('/');
  }

  await connectToDatabase();
  const user = await UserModel.findOne({ email: session.user.email });
  
  if (!user) {
    redirect('/');
  }

  return { session, user };
}

export async function requireAssignedUser() {
  const { session, user } = await requireUser();
  
  // Check if user has assigned clients or is L0 admin
  const hasAssignedClients = user.assignedClients && user.assignedClients.length > 0;
  const isL0Admin = user.role === UserRole.L0_ADMIN;
  
  if (!hasAssignedClients && !isL0Admin) {
    redirect('/');
  }

  return { session, user };
}

export function canManageClients(role: UserRole): boolean {
  return role === UserRole.L0_ADMIN || role === UserRole.L1_ADMIN || role === UserRole.MANAGER;
}

export function canViewClients(role: UserRole): boolean {
  return role === UserRole.L0_ADMIN || role === UserRole.L1_ADMIN || role === UserRole.MANAGER || role === UserRole.DEVELOPER;
}

