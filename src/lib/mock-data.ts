import { Complaint, Worker, Vehicle, Route, AdminDashboardData, CitizenDashboardData, WorkerDashboardData, WorkerProfileData, CitizenProfileData, AdminComplaintData, WorkerRouteComplaint, AdminWorkerResponse, AdminVehicleResponse } from "./types";

export const adminDashboardData: AdminDashboardData = {
  name: "System Admin",
  totalComplaints: 89,
  totalWorkers: 142,
  totalCitizens: 540,
  totalPendingComplaints: 18,
  totalActiveVehicles: 34,
  totalVehicles: 42,
  efficiency: 92,
};

export const citizenDashboardData: CitizenDashboardData = {
  complaintResolvedPercentage: 92,
  totalComplaints: 12,
  resolvedComplaints: 10,
  pendingComplaints: 2,
  name: "Rahul Sharma"
};

export const workerDashboardData: WorkerDashboardData = {
  name: "Ramesh Negi",
  empId: "EMP-4521",
  vehicleNumber: "UK07 AB 1234",
  routeStatus: "Active",
  totalRouteComplaints: 8,
  resolvedRouteComplaints: 3,
  clusterId: "CLUSTER-WRD12-01"
};

export const workerProfileData: WorkerProfileData = {
  name: "Ramesh Negi",
  empId: "EMP-4521",
  phone: "+91 98765 43210",
  totalCompletedRoutes: 142,
  totalVerifications: 56
};

export const citizenProfileData: CitizenProfileData = {
  name: "Rahul Sharma",
  username: "rahul_s",
  phone: "+91 98765 43210",
  address: "42, Clock Tower Road, Ward 12, Dehradun"
};

export const complaints: Complaint[] = [
  { 
    id: "CMP-2847", 
    status: "in-progress", 
    severityScore: 8,
    cleaned: false,
    location: "Clock Tower, Dehradun", 
    coordinates: { lat: 30.3255, lng: 78.0421 }, 
    createdAt: "2026-04-06T08:30:00Z", 
    updatedAt: "2026-04-06T14:20:00Z", 
    citizenId: "CIT-001", 
    citizenName: "Rahul Sharma", 
    assignedWorkerId: "WRK-012", 
    assignedWorkerName: "Ramesh Negi", 
    category: "Overflow",
    imageUrl: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?q=80&w=600&auto=format&fit=crop",
    cleanedImageUrl: "https://images.unsplash.com/photo-1516245834210-c4c142787335?w=800&q=80",
    aiAnalysis: "AI Confidence: 94% — Severe waste accumulation spanning 2x2 meters. Organic decay detected." 
  },
  { 
    id: "CMP-2846", 
    status: "pending", 
    severityScore: 10,
    cleaned: false, 
    location: "Rajpur Road, Dehradun", 
    coordinates: { lat: 30.3442, lng: 78.0489 }, 
    createdAt: "2026-04-06T06:15:00Z", 
    updatedAt: "2026-04-06T06:15:00Z", 
    citizenId: "CIT-002", 
    citizenName: "Priya Rawat", 
    category: "Illegal Dumping",
    imageUrl: "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?q=80&w=600&auto=format&fit=crop",
  },
  { 
    id: "CMP-2845", 
    status: "resolved", 
    severityScore: 4,
    cleaned: true,
    location: "Sector 5, Haridwar", 
    coordinates: { lat: 29.9457, lng: 78.1642 }, 
    createdAt: "2026-04-05T07:00:00Z", 
    updatedAt: "2026-04-05T16:30:00Z", 
    citizenId: "CIT-003", 
    citizenName: "Amit Bisht", 
    assignedWorkerId: "WRK-008", 
    assignedWorkerName: "Suresh Panwar", 
    category: "Missed Collection",
    imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=600&auto=format&fit=crop",
    cleanedImageUrl: "https://images.unsplash.com/photo-1621255869389-9b97b0aae90f?q=80&w=600&auto=format&fit=crop"
  },
  { 
    id: "CMP-2844", 
    status: "pending", 
    severityScore: 2,
    cleaned: false,
    location: "Har-ki-Pauri, Haridwar", 
    coordinates: { lat: 29.9544, lng: 78.1688 }, 
    createdAt: "2026-04-05T11:00:00Z", 
    updatedAt: "2026-04-05T11:00:00Z", 
    citizenId: "CIT-004", 
    citizenName: "Suman Dobhal", 
    category: "Scattered Waste" 
  },
  { 
    id: "CMP-2843", 
    status: "in-progress", 
    severityScore: 7,
    cleaned: false,
    location: "MG Road, Rishikesh", 
    coordinates: { lat: 30.0869, lng: 78.2676 }, 
    createdAt: "2026-04-04T09:45:00Z", 
    updatedAt: "2026-04-05T10:00:00Z", 
    citizenId: "CIT-005", 
    citizenName: "Deepak Joshi", 
    assignedWorkerId: "WRK-015", 
    assignedWorkerName: "Vikram Singh", 
    category: "Odor/Sanitation" 
  },
  { 
    id: "CMP-2842", 
    status: "resolved", 
    severityScore: 5,
    cleaned: true,
    location: "Vasant Vihar, Dehradun", 
    coordinates: { lat: 30.3165, lng: 78.0322 }, 
    createdAt: "2026-04-04T14:20:00Z", 
    updatedAt: "2026-04-05T08:00:00Z", 
    citizenId: "CIT-006", 
    citizenName: "Kavita Rana", 
    category: "Animal Interference" 
  },
];

export const workers: Worker[] = [
  { id: "WRK-001", name: "Ramesh Negi", employeeId: "EMP-4521", phone: "+91 98765 43210", status: "on-shift", assignedRoute: "RT-007", shiftStart: "06:00", shiftEnd: "14:00" },
  { id: "WRK-002", name: "Suresh Panwar", employeeId: "EMP-4522", phone: "+91 98765 43211", status: "on-shift", assignedRoute: "RT-003", shiftStart: "06:00", shiftEnd: "14:00" },
  { id: "WRK-003", name: "Vikram Singh", employeeId: "EMP-4523", phone: "+91 98765 43212", status: "off-duty", shiftStart: "14:00", shiftEnd: "22:00" },
  { id: "WRK-004", name: "Pradeep Kumar", employeeId: "EMP-4524", phone: "+91 98765 43213", status: "on-shift", assignedRoute: "RT-011", shiftStart: "06:00", shiftEnd: "14:00" },
  { id: "WRK-005", name: "Mohan Rawat", employeeId: "EMP-4525", phone: "+91 98765 43214", status: "on-leave" },
  { id: "WRK-006", name: "Ajay Bisht", employeeId: "EMP-4526", phone: "+91 98765 43215", status: "on-shift", assignedRoute: "RT-005", shiftStart: "06:00", shiftEnd: "14:00" },
];

export const vehicles: Vehicle[] = [
  { id: "VH-001", registrationNumber: "UK07 AB 1234", type: "truck", status: "active", assignedDriver: "Ramesh Negi", assignedRoute: "RT-007" },
  { id: "VH-002", registrationNumber: "UK07 CD 5678", type: "mini-truck", status: "active", assignedDriver: "Suresh Panwar", assignedRoute: "RT-003" },
  { id: "VH-003", registrationNumber: "UK07 EF 9012", type: "truck", status: "maintenance" },
  { id: "VH-004", registrationNumber: "UK14 GH 3456", type: "auto", status: "active", assignedDriver: "Pradeep Kumar", assignedRoute: "RT-011" },
  { id: "VH-005", registrationNumber: "UK14 IJ 7890", type: "mini-truck", status: "idle" },
  { id: "VH-006", registrationNumber: "UK07 KL 2345", type: "truck", status: "active", assignedDriver: "Ajay Bisht", assignedRoute: "RT-005" },
];

export const routes: Route[] = [
  { 
    id: "RT-007", 
    status: "active", 
    assignedWorker: "Ramesh Negi", 
    assignedVehicle: "UK07 AB 1234", 
    stops: [
      { sequenceNo: 1, complaintId: "CMP-2847" },
      { sequenceNo: 2, complaintId: "CMP-2846" },
      { sequenceNo: 3, complaintId: "CMP-2843" }
    ], 
    distance: "12.4 km", 
    estimatedTime: "3h 20m", 
    startTime: "06:15",
    name: "Central Sector R1",
    ward: "Ward 12"
  },
  { 
    id: "RT-003", 
    status: "active", 
    assignedWorker: "Suresh Panwar", 
    assignedVehicle: "UK07 CD 5678", 
    stops: [
       { sequenceNo: 1, complaintId: "CMP-2845" }
    ], 
    distance: "8.7 km", 
    estimatedTime: "2h 10m", 
    startTime: "06:30",
    name: "South Sector R2",
    ward: "Ward 15"
  },
  { 
    id: "RT-011", 
    status: "active", 
    assignedWorker: "Pradeep Kumar", 
    assignedVehicle: "UK14 GH 3456", 
    stops: [
      { sequenceNo: 1, complaintId: "CMP-2844" }
    ], 
    distance: "6.2 km", 
    estimatedTime: "1h 45m", 
    startTime: "06:00",
    name: "Haridwar Central",
    ward: "Ward 15"
  },
  { 
    id: "RT-005", 
    status: "active", 
    assignedWorker: "Ajay Bisht", 
    assignedVehicle: "UK07 KL 2345", 
    stops: [
      { sequenceNo: 1, complaintId: "CMP-2842" }
    ], 
    distance: "9.8 km", 
    estimatedTime: "2h 30m", 
    startTime: "06:45",
    name: "Paltan Bazaar Loop",
    ward: "Ward 10"
  },
  { 
    id: "RT-009", 
    status: "pending", 
    stops: [
      { sequenceNo: 1, complaintId: "CMP-2843" }
    ], 
    distance: "7.1 km", 
    estimatedTime: "2h 00m",
    name: "Rishikesh Ghat Route",
    ward: "Ward 3"
  },
];

export const chartData = {
  weeklyCollection: [
    { day: "Mon", collected: 42, target: 50 },
    { day: "Tue", collected: 48, target: 50 },
    { day: "Wed", collected: 39, target: 45 },
    { day: "Thu", collected: 51, target: 60 },
    { day: "Fri", collected: 47, target: 50 },
    { day: "Sat", collected: 38, target: 40 },
    { day: "Sun", collected: 29, target: 30 },
  ],
  complaintsByCategory: [
    { name: "Overflow", value: 35 },
    { name: "Missed Collection", value: 22 },
    { name: "Illegal Dumping", value: 15 },
    { name: "Scattered Waste", value: 10 },
    { name: "Odor/Sanitation", value: 7 },
  ],
  hourlyActivity: [
    { hour: "6AM", activity: 12 },
    { hour: "8AM", activity: 45 },
    { hour: "10AM", activity: 78 },
    { hour: "12PM", activity: 56 },
    { hour: "2PM", activity: 42 },
    { hour: "4PM", activity: 65 },
    { hour: "6PM", activity: 38 },
    { hour: "8PM", activity: 15 },
  ],
};

// Helper: get severity color class for a complaint
export function getSeverityColor(score: number): string {
  if (score >= 8) return "text-red-500";
  if (score >= 5) return "text-orange-500";
  return "text-amber-400";
}

export function getSeverityBg(score: number): string {
  if (score >= 8) return "bg-red-500";
  if (score >= 5) return "bg-orange-500";
  return "bg-amber-400";
}

export function getSeverityBorder(score: number): string {
  if (score >= 8) return "border-l-red-500";
  if (score >= 5) return "border-l-orange-500";
  return "border-l-amber-400";
}

export const workerRouteComplaints: WorkerRouteComplaint[] = [
  {
    id: 1,
    latitude: 30.3255,
    longitude: 78.0421,
    location: "Clock Tower, Dehradun",
    imageUrl: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?q=80&w=600&auto=format&fit=crop",
    status: "IN_PROGRESS",
    sequenceNo: 1,
    severityScore: 8
  },
  {
    id: 2,
    latitude: 30.3442,
    longitude: 78.0489,
    location: "Rajpur Road, Dehradun",
    imageUrl: "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?q=80&w=600&auto=format&fit=crop",
    status: "PENDING",
    sequenceNo: 2,
    severityScore: 10
  },
  {
    id: 3,
    latitude: 30.3165,
    longitude: 78.0322,
    location: "Vasant Vihar, Dehradun",
    imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=600&auto=format&fit=crop",
    status: "PENDING",
    sequenceNo: 3,
    severityScore: 5
  }
];

export function searchComplaints(query: string) {
  return complaints.filter(c => 
    c.location.toLowerCase().includes(query.toLowerCase()) || 
    c.id.toString().toLowerCase().includes(query.toLowerCase())
  );
}

export const adminComplaints: AdminComplaintData[] = complaints.map(c => ({
  formattedId: String(c.id),
  trashType: c.category.toUpperCase().replace(' ', '_'),
  location: c.location,
  citizenName: c.citizenName || "Unknown",
  severityScore: c.severityScore,
  volumeEstimate: "MEDIUM",
  complaintStatus: c.status.toUpperCase(),
  workerName: c.assignedWorkerName || "Unassigned",
  date: c.createdAt
}));

export const adminWorkers: AdminWorkerResponse[] = workers.map(w => ({
  workerId: w.id,
  workerName: w.name,
  phoneNo: w.phone,
  vehicleNo: w.assignedRoute ? "UK07 AB 1234" : "N/A" // Simplified mapping
}));

export const adminVehicles: AdminVehicleResponse[] = vehicles.map(v => ({
  vehicleId: v.id,
  vehicleNo: v.registrationNumber,
  vehicleStatus: v.status.toUpperCase() as any,
  workerName: v.assignedDriver || "Unassigned"
}));


