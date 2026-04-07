export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "citizen" | "worker" | "admin";
  avatar?: string;
  address?: string;
  employeeId?: string;
}

export interface Complaint {
  id: string;
  status: "pending" | "in-progress" | "resolved" | "rejected";
  priority: "low" | "medium" | "high" | "critical";
  severityScore: number;
  cleaned: boolean;
  location: string;
  coordinates: { lat: number; lng: number };
  createdAt: string;
  updatedAt: string;
  citizenId: string;
  citizenName: string;
  assignedWorkerId?: string;
  assignedWorkerName?: string;
  imageUrl?: string;
  afterImageUrl?: string;
  aiAnalysis?: string;
  category: string;
}

export interface Worker {
  id: string;
  name: string;
  employeeId: string;
  phone: string;
  status: "on-shift" | "off-duty" | "on-leave";
  assignedRoute?: string;
  avatar?: string;
  shiftStart?: string;
  shiftEnd?: string;
}

export interface Vehicle {
  id: string;
  registrationNumber: string;
  type: "truck" | "mini-truck" | "auto";
  status: "active" | "maintenance" | "idle";
  assignedDriver?: string;
  assignedRoute?: string;
}

export interface Route {
  id: string;
  name: string;
  ward: string;
  status: "active" | "completed" | "pending";
  assignedWorker?: string;
  assignedVehicle?: string;
  stops: { sequenceNo: number; complaintId: string }[];
  distance: string;
  estimatedTime: string;
  startTime?: string;
  endTime?: string;
}

export interface DashboardStats {
  activeWorkers: number;
  totalComplaints: number;
  resolvedComplaints: number;
  activeRoutes: number;
  vehiclesActive: number;
  totalVehicles: number;
  efficiency: number;
}
