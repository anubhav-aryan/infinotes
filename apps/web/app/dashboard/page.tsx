import { requireAssignedUser } from '@/lib/user-auth';
import UserDashboard from '@/components/UserDashboard';

export default async function DashboardPage() {
  await requireAssignedUser(); // This will redirect if not authorized

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back</p>
        </div>
        
        <UserDashboard />
      </div>
    </div>
  );
}

