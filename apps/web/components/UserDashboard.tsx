"use client"

import { useState, useEffect } from 'react';
import { Client, User, ClientStatus, UserRole } from '@infilects/types';
import { useSession } from 'next-auth/react'

interface UserDashboardProps {
  user?: User;
}

export default function UserDashboard({ user: userProp }: UserDashboardProps) {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | null>(userProp ?? null);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      fetchUser().then(() => fetchAssignedClients());
    } else {
      fetchAssignedClients();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchUser = async () => {
    try {
      if (status !== 'authenticated' || !session?.user?.email) return;
      const response = await fetch('/api/users');
      const data = await response.json();
      if (data.success) {
        const currentUser = data.data.find((u: User) => u.email === session.user?.email)
        setUser(currentUser || null)
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  const fetchAssignedClients = async () => {
    try {
      const response = await fetch('/api/clients');
      const data = await response.json();
      
      if (data.success && user) {
        // Filter clients assigned to this user
        const assignedClients = data.data.filter((client: Client) => 
          client.assignedUserId === (user._id || user.id)
        );
        setClients(assignedClients);
      }
    } catch (error) {
      console.error('Error fetching assigned clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: ClientStatus) => {
    switch (status) {
      case ClientStatus.ACTIVE: return 'bg-green-100 text-green-800';
      case ClientStatus.INACTIVE: return 'bg-gray-100 text-gray-800';
      case ClientStatus.PROSPECT: return 'bg-blue-100 text-blue-800';
      case ClientStatus.ON_HOLD: return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleDisplayName = (role: UserRole) => {
    switch (role) {
      case UserRole.L0_ADMIN: return 'L0 Admin';
      case UserRole.L1_ADMIN: return 'L1 Admin';
      case UserRole.MANAGER: return 'Manager';
      case UserRole.DEVELOPER: return 'Developer';
      case UserRole.VIEWER: return 'Viewer';
      default: return role;
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case UserRole.L0_ADMIN: return 'bg-red-100 text-red-800';
      case UserRole.L1_ADMIN: return 'bg-orange-100 text-orange-800';
      case UserRole.MANAGER: return 'bg-purple-100 text-purple-800';
      case UserRole.DEVELOPER: return 'bg-blue-100 text-blue-800';
      case UserRole.VIEWER: return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading || !user) {
    return <div className="text-center py-8">Loading your assigned clients...</div>;
  }

  return (
    <div className="space-y-8">
      {/* User Info Card */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 h-16 w-16">
            {user.avatar ? (
              <img className="h-16 w-16 rounded-full" src={user.avatar} alt="" />
            ) : (
              <div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-xl font-medium text-gray-700">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <div className="mt-2 flex items-center space-x-2">
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                {getRoleDisplayName(user.role)}
              </span>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {user.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Assigned Clients</h3>
          <p className="text-3xl font-bold text-blue-600">{clients.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Active Clients</h3>
          <p className="text-3xl font-bold text-green-600">
            {clients.filter(c => c.status === ClientStatus.ACTIVE).length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Prospects</h3>
          <p className="text-3xl font-bold text-blue-600">
            {clients.filter(c => c.status === ClientStatus.PROSPECT).length}
          </p>
        </div>
      </div>

      {/* Assigned Clients */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">My Assigned Clients</h2>
        
        {clients.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No clients assigned</h3>
              <p className="mt-1 text-sm text-gray-500">You don't have any clients assigned to you yet.</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clients.map((client) => (
                  <tr key={client._id || client.id || client.email}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{client.name}</div>
                        <div className="text-sm text-gray-500">{client.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.company}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(client.status)}`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {client.notes || 'No notes'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-4">
                        View Details
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

