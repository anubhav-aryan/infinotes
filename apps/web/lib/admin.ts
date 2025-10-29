import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth/auth.config';
import { UserRole } from '@infilects/types';
import { redirect } from 'next/navigation';

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect('/');
  }

  // For now, we'll check if the user is the first user (L0 Admin)
  // In a real app, you'd check the user's role from the database
  const isFirstUser = session.user.email === 'aryananubhav08@gmail.com'; // Your email as L0 Admin
  
  if (!isFirstUser) {
    redirect('/');
  }

  return session;
}

export function isAdminRole(role: UserRole): boolean {
  return role === UserRole.L0_ADMIN || role === UserRole.L1_ADMIN;
}

export function canManageUsers(role: UserRole): boolean {
  return role === UserRole.L0_ADMIN;
}

export function canManageClients(role: UserRole): boolean {
  return role === UserRole.L0_ADMIN || role === UserRole.L1_ADMIN || role === UserRole.MANAGER;
}
