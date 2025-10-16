import mongoose, { Schema, Document } from 'mongoose';
import { Client, Project, User, ClientStatus, ProjectStatus, Priority, UserRole } from '@infilects/types';

// User Schema
const UserSchema = new Schema<User & Document>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, enum: Object.values(UserRole), default: UserRole.VIEWER },
  avatar: { type: String },
  assignedClients: [{ type: String }],
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true,
});

// Client Schema
const ClientSchema = new Schema<Client & Document>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String, required: true },
  status: { type: String, enum: Object.values(ClientStatus), default: ClientStatus.PROSPECT },
  assignedUserId: { type: String },
  notes: { type: String },
}, {
  timestamps: true,
});

// Project Schema
const ProjectSchema = new Schema<Project & Document>({
  clientId: { type: String, ref: 'Client', required: true },
  name: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: Object.values(ProjectStatus), default: ProjectStatus.PLANNING },
  priority: { type: String, enum: Object.values(Priority), default: Priority.MEDIUM },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  budget: { type: Number },
  team: [{ type: String, ref: 'User' }],
}, {
  timestamps: true,
});

// Create and export models
export const UserModel = mongoose.models.User || mongoose.model<User & Document>('User', UserSchema);
export const ClientModel = mongoose.models.Client || mongoose.model<Client & Document>('Client', ClientSchema);
export const ProjectModel = mongoose.models.Project || mongoose.model<Project & Document>('Project', ProjectSchema);
