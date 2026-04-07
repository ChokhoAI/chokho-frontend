import { Complaint, Worker, Vehicle, Bin, Route, DashboardStats } from "./types";

export const dashboardStats: DashboardStats = {
  totalBins: 2847,
  activeWorkers: 142,
  totalComplaints: 89,
  resolvedComplaints: 71,
  efficiency: 94.2,
  activeRoutes: 28,
  vehiclesActive: 34,
  totalVehicles: 42,
};

export const complaints: Complaint[] = [
  { id: "CMP-2847", title: "Overflowing bin near Clock Tower", description: "The bin near Clock Tower has been overflowing for 2 days. Waste is spilling onto the road causing hygiene issues.", status: "in-progress", priority: "high", location: "Clock Tower, Dehradun", coordinates: { lat: 30.3255, lng: 78.0421 }, createdAt: "2026-04-06T08:30:00Z", updatedAt: "2026-04-06T14:20:00Z", citizenId: "CIT-001", citizenName: "Rahul Sharma", assignedWorkerId: "WRK-012", assignedWorkerName: "Ramesh Negi", category: "Overflow", aiAnalysis: "AI Confidence: 94% — Overflow detected via IoT sensor. Estimated 48hrs since last collection." },
  { id: "CMP-2846", title: "Illegal dumping at Rajpur Road", description: "Construction debris dumped illegally near the park entrance. Blocking pedestrian path.", status: "pending", priority: "critical", location: "Rajpur Road, Dehradun", coordinates: { lat: 30.3442, lng: 78.0489 }, createdAt: "2026-04-06T06:15:00Z", updatedAt: "2026-04-06T06:15:00Z", citizenId: "CIT-002", citizenName: "Priya Rawat", category: "Illegal Dumping" },
  { id: "CMP-2845", title: "Missed collection at Sector 5", description: "Scheduled collection was missed today morning. Bins are now full.", status: "resolved", priority: "medium", location: "Sector 5, Haridwar", coordinates: { lat: 29.9457, lng: 78.1642 }, createdAt: "2026-04-05T07:00:00Z", updatedAt: "2026-04-05T16:30:00Z", citizenId: "CIT-003", citizenName: "Amit Bisht", assignedWorkerId: "WRK-008", assignedWorkerName: "Suresh Panwar", category: "Missed Collection" },
  { id: "CMP-2844", title: "Broken bin at Har-ki-Pauri", description: "The green waste bin near the ghat is broken and needs replacement.", status: "pending", priority: "low", location: "Har-ki-Pauri, Haridwar", coordinates: { lat: 29.9544, lng: 78.1688 }, createdAt: "2026-04-05T11:00:00Z", updatedAt: "2026-04-05T11:00:00Z", citizenId: "CIT-004", citizenName: "Suman Dobhal", category: "Damaged Bin" },
  { id: "CMP-2843", title: "Foul odor from waste station", description: "Strong foul odor emanating from waste collection station on MG Road affecting nearby shops.", status: "in-progress", priority: "high", location: "MG Road, Rishikesh", coordinates: { lat: 30.0869, lng: 78.2676 }, createdAt: "2026-04-04T09:45:00Z", updatedAt: "2026-04-05T10:00:00Z", citizenId: "CIT-005", citizenName: "Deepak Joshi", assignedWorkerId: "WRK-015", assignedWorkerName: "Vikram Singh", category: "Odor/Sanitation" },
  { id: "CMP-2842", title: "Stray animals scattering waste", description: "Stray dogs are tearing open garbage bags left outside bins in the colony.", status: "resolved", priority: "medium", location: "Vasant Vihar, Dehradun", coordinates: { lat: 30.3165, lng: 78.0322 }, createdAt: "2026-04-04T14:20:00Z", updatedAt: "2026-04-05T08:00:00Z", citizenId: "CIT-006", citizenName: "Kavita Rana", category: "Animal Interference" },
];

export const workers: Worker[] = [
  { id: "WRK-001", name: "Ramesh Negi", employeeId: "EMP-4521", phone: "+91 98765 43210", ward: "Ward 12 — Clock Tower", status: "on-shift", assignedRoute: "RT-007", binsCollected: 34, rating: 4.8, shiftStart: "06:00", shiftEnd: "14:00" },
  { id: "WRK-002", name: "Suresh Panwar", employeeId: "EMP-4522", phone: "+91 98765 43211", ward: "Ward 8 — Rajpur", status: "on-shift", assignedRoute: "RT-003", binsCollected: 28, rating: 4.6, shiftStart: "06:00", shiftEnd: "14:00" },
  { id: "WRK-003", name: "Vikram Singh", employeeId: "EMP-4523", phone: "+91 98765 43212", ward: "Ward 5 — MG Road", status: "off-duty", binsCollected: 0, rating: 4.5, shiftStart: "14:00", shiftEnd: "22:00" },
  { id: "WRK-004", name: "Pradeep Kumar", employeeId: "EMP-4524", phone: "+91 98765 43213", ward: "Ward 15 — Haridwar Central", status: "on-shift", assignedRoute: "RT-011", binsCollected: 41, rating: 4.9, shiftStart: "06:00", shiftEnd: "14:00" },
  { id: "WRK-005", name: "Mohan Rawat", employeeId: "EMP-4525", phone: "+91 98765 43214", ward: "Ward 3 — Rishikesh", status: "on-leave", binsCollected: 0, rating: 4.3 },
  { id: "WRK-006", name: "Ajay Bisht", employeeId: "EMP-4526", phone: "+91 98765 43215", ward: "Ward 10 — Paltan Bazaar", status: "on-shift", assignedRoute: "RT-005", binsCollected: 22, rating: 4.7, shiftStart: "06:00", shiftEnd: "14:00" },
];

export const vehicles: Vehicle[] = [
  { id: "VH-001", registrationNumber: "UK07 AB 1234", type: "truck", status: "active", assignedDriver: "Ramesh Negi", assignedRoute: "RT-007", fuelLevel: 72, lastMaintenance: "2026-03-28", capacity: "5 Tons" },
  { id: "VH-002", registrationNumber: "UK07 CD 5678", type: "mini-truck", status: "active", assignedDriver: "Suresh Panwar", assignedRoute: "RT-003", fuelLevel: 85, lastMaintenance: "2026-04-01", capacity: "2 Tons" },
  { id: "VH-003", registrationNumber: "UK07 EF 9012", type: "truck", status: "maintenance", fuelLevel: 30, lastMaintenance: "2026-04-05", capacity: "5 Tons" },
  { id: "VH-004", registrationNumber: "UK14 GH 3456", type: "auto", status: "active", assignedDriver: "Pradeep Kumar", assignedRoute: "RT-011", fuelLevel: 60, lastMaintenance: "2026-03-20", capacity: "500 Kg" },
  { id: "VH-005", registrationNumber: "UK14 IJ 7890", type: "mini-truck", status: "idle", fuelLevel: 95, lastMaintenance: "2026-04-03", capacity: "2 Tons" },
  { id: "VH-006", registrationNumber: "UK07 KL 2345", type: "truck", status: "active", assignedDriver: "Ajay Bisht", assignedRoute: "RT-005", fuelLevel: 55, lastMaintenance: "2026-03-15", capacity: "5 Tons" },
];

export const bins: Bin[] = [
  { id: "BIN-0847", location: "Clock Tower Junction", coordinates: { lat: 30.3255, lng: 78.0421 }, fillLevel: 92, type: "mixed", status: "overflow", lastCollected: "2026-04-04T14:00:00Z", ward: "Ward 12" },
  { id: "BIN-0848", location: "Rajpur Road Park", coordinates: { lat: 30.3442, lng: 78.0489 }, fillLevel: 45, type: "dry", status: "normal", lastCollected: "2026-04-06T08:00:00Z", ward: "Ward 8" },
  { id: "BIN-0849", location: "Paltan Bazaar", coordinates: { lat: 30.3195, lng: 78.0445 }, fillLevel: 78, type: "wet", status: "normal", lastCollected: "2026-04-05T16:00:00Z", ward: "Ward 10" },
  { id: "BIN-0850", location: "Har-ki-Pauri Ghat", coordinates: { lat: 29.9544, lng: 78.1688 }, fillLevel: 15, type: "mixed", status: "normal", lastCollected: "2026-04-06T10:00:00Z", ward: "Ward 15" },
  { id: "BIN-0851", location: "MG Road Market", coordinates: { lat: 30.0869, lng: 78.2676 }, fillLevel: 88, type: "dry", status: "overflow", lastCollected: "2026-04-04T12:00:00Z", ward: "Ward 3" },
  { id: "BIN-0852", location: "ISBT Dehradun", coordinates: { lat: 30.2867, lng: 78.0002 }, fillLevel: 30, type: "mixed", status: "normal", lastCollected: "2026-04-06T06:00:00Z", ward: "Ward 14" },
];

export const routes: Route[] = [
  { id: "RT-007", name: "Clock Tower Circuit", ward: "Ward 12", status: "active", assignedWorker: "Ramesh Negi", assignedVehicle: "UK07 AB 1234", bins: ["BIN-0847", "BIN-0853", "BIN-0854"], distance: "12.4 km", estimatedTime: "3h 20m", completedBins: 8, totalBins: 14, startTime: "06:15" },
  { id: "RT-003", name: "Rajpur Road North", ward: "Ward 8", status: "active", assignedWorker: "Suresh Panwar", assignedVehicle: "UK07 CD 5678", bins: ["BIN-0848", "BIN-0855"], distance: "8.7 km", estimatedTime: "2h 10m", completedBins: 12, totalBins: 18, startTime: "06:30" },
  { id: "RT-011", name: "Haridwar Central", ward: "Ward 15", status: "active", assignedWorker: "Pradeep Kumar", assignedVehicle: "UK14 GH 3456", bins: ["BIN-0850"], distance: "6.2 km", estimatedTime: "1h 45m", completedBins: 15, totalBins: 22, startTime: "06:00" },
  { id: "RT-005", name: "Paltan Bazaar Loop", ward: "Ward 10", status: "active", assignedWorker: "Ajay Bisht", assignedVehicle: "UK07 KL 2345", bins: ["BIN-0849"], distance: "9.8 km", estimatedTime: "2h 30m", completedBins: 5, totalBins: 16, startTime: "06:45" },
  { id: "RT-009", name: "Rishikesh Ghat Route", ward: "Ward 3", status: "pending", bins: ["BIN-0851"], distance: "7.1 km", estimatedTime: "2h 00m", completedBins: 0, totalBins: 12 },
];

export const chartData = {
  weeklyCollection: [
    { day: "Mon", collected: 420, target: 450 },
    { day: "Tue", collected: 480, target: 450 },
    { day: "Wed", collected: 390, target: 450 },
    { day: "Thu", collected: 510, target: 450 },
    { day: "Fri", collected: 470, target: 450 },
    { day: "Sat", collected: 380, target: 450 },
    { day: "Sun", collected: 290, target: 350 },
  ],
  complaintsByCategory: [
    { name: "Overflow", value: 35 },
    { name: "Missed Collection", value: 22 },
    { name: "Illegal Dumping", value: 15 },
    { name: "Damaged Bin", value: 10 },
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
