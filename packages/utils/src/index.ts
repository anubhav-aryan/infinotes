import { ClientStatus, ProjectStatus, Priority } from '@infilects/types';

// Date utilities
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const isDateInPast = (date: Date | string): boolean => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d < new Date();
};

export const isDateInFuture = (date: Date | string): boolean => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d > new Date();
};

// Status utilities
export const getStatusColor = (status: ClientStatus | ProjectStatus): string => {
  switch (status) {
    case ClientStatus.ACTIVE:
    case ProjectStatus.IN_PROGRESS:
      return 'text-green-600 bg-green-50';
    case ClientStatus.INACTIVE:
    case ProjectStatus.COMPLETED:
      return 'text-gray-600 bg-gray-50';
    case ClientStatus.PROSPECT:
    case ProjectStatus.PLANNING:
      return 'text-blue-600 bg-blue-50';
    case ClientStatus.ON_HOLD:
    case ProjectStatus.ON_HOLD:
      return 'text-yellow-600 bg-yellow-50';
    case ProjectStatus.REVIEW:
      return 'text-purple-600 bg-purple-50';
    case ProjectStatus.CANCELLED:
      return 'text-red-600 bg-red-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

export const getPriorityColor = (priority: Priority): string => {
  switch (priority) {
    case Priority.LOW:
      return 'text-gray-600 bg-gray-50';
    case Priority.MEDIUM:
      return 'text-blue-600 bg-blue-50';
    case Priority.HIGH:
      return 'text-orange-600 bg-orange-50';
    case Priority.URGENT:
      return 'text-red-600 bg-red-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

// Validation utilities
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// String utilities
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Array utilities
export const groupBy = <T, K extends string | number>(
  array: T[],
  key: (item: T) => K
): Record<K, T[]> => {
  return array.reduce((groups, item) => {
    const groupKey = key(item);
    groups[groupKey] = groups[groupKey] || [];
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<K, T[]>);
};

export const sortBy = <T>(array: T[], key: (item: T) => string | number): T[] => {
  return [...array].sort((a, b) => {
    const aVal = key(a);
    const bVal = key(b);
    return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
  });
};

// Debounce utility
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
