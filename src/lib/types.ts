export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "citizen" | "worker" | "admin";
  avatar?: string;
  ward?: string;
  address?: string;
  points?: number;
  employeeId?: string;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "resolved" | "rejected";
  priority: "low" | "medium" | "high" | "critical";
  location: string;
  coordinates: { lat: number; lng: number };
  createdAt: string;
  updatedAt: string;
  citizenId: string;
  citizenName: string;
  assignedWorkerId?: string;
  assignedWorkerName?: string;
  images?: string[];
  aiAnalysis?: string;
  category: string;
}

export interface Worker {
  id: string;
  name: string;
  employeeId: string;
  phone: string;
  ward: string;
  status: "on-shift" | "off-duty" | "on-leave";
  assignedRoute?: string;
  binsCollected: number;
  rating: number;
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
  fuelLevel: number;
  lastMaintenance: string;
  capacity: string;
  currentLocation?: { lat: number; lng: number };
}

export interface Bin {
  id: string;
  location: string;
  coordinates: { lat: number; lng: number };
  fillLevel: number;
  type: "wet" | "dry" | "mixed";
  status: "normal" | "overflow" | "maintenance";
  lastCollected: string;
  ward: string;
}

export interface Route {
  id: string;
  name: string;
  ward: string;
  status: "active" | "completed" | "pending";
  assignedWorker?: string;
  assignedVehicle?: string;
  bins: string[];
  distance: string;
  estimatedTime: string;
  completedBins: number;
  totalBins: number;
  startTime?: string;
  endTime?: string;
}

export interface DashboardStats {
  totalBins: number;
  activeWorkers: number;
  totalComplaints: number;
  resolvedComplaints: number;
  efficiency: number;
  activeRoutes: number;
  vehiclesActive: number;
  totalVehicles: number;
}
