// Client and Project Types
export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  status: ClientStatus;
  createdAt: Date;
  updatedAt: Date;
  projects?: Project[];
}

export interface Project {
  id: string;
  clientId: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  priority: Priority;
  startDate: Date;
  endDate?: Date;
  budget?: number;
  team?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Enums
export enum ClientStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PROSPECT = 'prospect',
  ON_HOLD = 'on_hold',
}

export enum ProjectStatus {
  PLANNING = 'planning',
  IN_PROGRESS = 'in_progress',
  REVIEW = 'review',
  COMPLETED = 'completed',
  ON_HOLD = 'on_hold',
  CANCELLED = 'cancelled',
}

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

// User and Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  DEVELOPER = 'developer',
  VIEWER = 'viewer',
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface CreateClientForm {
  name: string;
  email: string;
  company: string;
}

export interface UpdateClientForm extends Partial<CreateClientForm> {
  status?: ClientStatus;
}

export interface CreateProjectForm {
  clientId: string;
  name: string;
  description?: string;
  priority: Priority;
  startDate: Date;
  endDate?: Date;
  budget?: number;
}

export interface UpdateProjectForm extends Partial<CreateProjectForm> {
  status?: ProjectStatus;
}
