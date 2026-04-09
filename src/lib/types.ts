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
  id: string | number;
  status: "pending" | "in-progress" | "resolved" | "rejected";
  severityScore: number;
  location: string;
  category: string;
  createdAt: string;
  updatedAt?: string;
  coordinates: { lat: number; lng: number };
  imageUrl?: string;
  cleanedImageUrl?: string;
  citizenId?: string;
  citizenName?: string;
  assignedWorkerId?: string;
  assignedWorkerName?: string;
  aiAnalysis?: string;
  cleaned?: boolean;
}

export interface AdminComplaintData {
  formattedId: string;
  trashType: string; // From TrashType enum
  location: string;
  citizenName: string;
  severityScore: number;
  volumeEstimate: string; // From VolumeEstimate enum
  complaintStatus: string; // From ComplaintStatus enum
  workerName: string;
  date: string;
}

export interface WorkerRouteComplaint {
  id: number;
  latitude: number;
  longitude: number;
  location: string;
  imageUrl: string;
  status: string; // From ComplaintStatus enum
  sequenceNo: number;
  severityScore: number;
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

export interface AdminDashboardData {
  name: string;
  totalComplaints: number;
  totalWorkers: number;
  totalCitizens: number;
  totalPendingComplaints: number;
  totalActiveVehicles: number;
  totalVehicles: number;
  efficiency: number;
}

export interface CitizenDashboardData {
  complaintResolvedPercentage: number;
  totalComplaints: number;
  resolvedComplaints: number;
  pendingComplaints: number;
  name: string;
}

export interface WorkerDashboardData {
  name: string;
  empId: string;
  vehicleNumber: string;
  routeStatus: string;
  totalRouteComplaints: number;
  resolvedRouteComplaints: number;
  clusterId: string;
}

export interface WorkerProfileData {
  name: string;
  empId: string;
  phone: string;
  totalCompletedRoutes: number;
  totalVerifications: number;
}

export interface CitizenProfileData {
  name: string;
  username: string;
  phone: string;
  address: string;
}

export interface AdminWorkerResponse {
  workerId: string;
  workerName: string;
  phoneNo: string;
  vehicleNo: string;
}

export interface AdminVehicleResponse {
  vehicleId: string;
  vehicleNo: string;
  vehicleStatus: "ACTIVE" | "MAINTENANCE" | "IDLE";
  workerName: string;
}

