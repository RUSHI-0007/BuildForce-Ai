

// High-fidelity construction operational datasets modeled after 10,000+ small & mid-sized builders

export const PROJECTS_DATA = [
  {
    id: "PRJ1xrlss20hj9p",
    name: "Kothrud Residence Villa & Renovation",
    client: "Ramesh Chavan (Private Owner)",
    location: "Shanti Heights, Kothrud, Pune",
    type: "Residential Bungalow (G+2)",
    totalArea: "3,400 sq.ft",
    budget: "₹18.50 Lakhs",
    spent: "₹8.85 Lakhs",
    plannedProgress: 65,
    actualProgress: 62,
    variance: -3,
    delayDays: 3,
    status: "In Progress",
    startDate: "01 Aug 2026",
    endDate: "15 Jan 2027",
    stages: ["Foundation & Plinth", "Ground Floor Slab", "First Floor Slab", "Brickwork & Plaster", "Finishing & Handover"],
    currentStage: "First Floor Slab & Brickwork (Site A1)"
  },
  {
    id: "PRJ2mzk994pl82k",
    name: "Katraj Commercial Complex (G+2)",
    client: "Sunita Patil (Local Business Owner)",
    location: "Plot 88, Katraj Bypass Road, Pune",
    type: "Commercial Showroom & Offices",
    totalArea: "6,800 sq.ft",
    budget: "₹45.00 Lakhs",
    spent: "₹26.50 Lakhs",
    plannedProgress: 60,
    actualProgress: 56,
    variance: -4,
    delayDays: 6,
    status: "In Progress",
    startDate: "15 Jun 2026",
    endDate: "28 Feb 2027",
    stages: ["Foundation", "RCC Structure", "External Brickwork", "MEP & Finishing"],
    currentStage: "RCC Structure - 2nd Floor Columns Pour"
  },
  {
    id: "PRJ3abx451qw90c",
    name: "Baner 3BHK Luxury Turnkey Interior",
    client: "Dr. Amit Kulkarni",
    location: "Baner Road, Pune, Maharashtra",
    type: "Turnkey Apartment Interior",
    totalArea: "1,850 sq.ft",
    budget: "₹14.20 Lakhs",
    spent: "₹6.40 Lakhs",
    plannedProgress: 45,
    actualProgress: 48,
    variance: 3,
    delayDays: 0,
    status: "Ahead of Schedule",
    startDate: "10 Sep 2026",
    endDate: "20 Dec 2026",
    stages: ["Civil Alterations", "Concealed MEP", "False Ceiling", "Woodwork & Tiles", "Painting"],
    currentStage: "False Ceiling & Electrical Wiring"
  },
  {
    id: "PRJ4wkd112pl99",
    name: "Wakad Row-House Expansion",
    client: "Deepak Deshmukh",
    location: "Datta Mandir Road, Wakad, Pune",
    type: "Residential Extension (G+1)",
    totalArea: "2,200 sq.ft",
    budget: "₹12.00 Lakhs",
    spent: "₹4.80 Lakhs",
    plannedProgress: 40,
    actualProgress: 40,
    variance: 0,
    delayDays: 0,
    status: "In Progress",
    startDate: "01 Sep 2026",
    endDate: "30 Jan 2027",
    stages: ["Plinth Extension", "1st Floor Slab", "Brickwork", "Waterproofing"],
    currentStage: "Brickwork & Lintel Beams"
  }
];

// The 5 BuildForce Core AI Agents - Redesigned for Small Contractors (1 to 10 Sites)
export const AI_AGENTS = [
  {
    id: "estimation",
    number: "01",
    name: "Residential Takeoff AI",
    badge: "Pre-construction",
    role: "Automated BOQ & Drawing Takeoff Specialist",
    description: "Reads bungalow, villa & apartment CAD floor plans, extracts concrete, steel, brick, plaster & tile quantities, and builds accurate quotation BOQs with contractor markup in 4 minutes.",
    metrics: "10x Faster Bids • 99% Takeoff Accuracy",
    color: "#2563EB",
    lightBg: "#EFF6FF",
    iconName: "FileSpreadsheet",
    stats: {
      drawingsAnalyzed: 84,
      boqItemsGenerated: 620,
      turnaroundTime: "4.2 mins (vs 3 days manual)",
      errorReduction: "98.4%"
    }
  },
  {
    id: "project_manager",
    number: "02",
    name: "Site Supervisor & Quality AI",
    badge: "Progress & Quality",
    role: "Proactive Site Supervisor & Roadblock Clearer",
    description: "Continuously correlates daily WhatsApp site photos, worker haazri, and cement bag counts to flag schedule delays, mason productivity deficits, and concrete honeycombing snags.",
    metrics: "Zero Untracked Delays • Instant WhatsApp Sync",
    color: "#059669",
    lightBg: "#ECFDF5",
    iconName: "Activity",
    stats: {
      activeAlerts: 2,
      snagsAutoDetected: 14,
      avgResolutionHours: "6 hrs",
      productivityUptime: "+28%"
    }
  },
  {
    id: "planning_schedule",
    number: "03",
    name: "Milestone Schedule AI",
    badge: "Critical Path Optimizer",
    role: "Dynamic Schedule Recovery & Milestone Engine",
    description: "Recovers delayed residential milestones (plinth, slab casting, curing, brickwork). Automatically simulates mason crew transfers between active sites to recover delay days.",
    metrics: "Save 4–8 Days per Site Delay",
    color: "#7C3AED",
    lightBg: "#F5F3FF",
    iconName: "CalendarClock",
    stats: {
      delaysPrevented: 7,
      daysSavedThisQuarter: 18,
      criticalPathsTracked: 3,
      sequenceSimulations: 12
    }
  },
  {
    id: "procurement",
    number: "04",
    name: "Local Vendor RFQ AI",
    badge: "Field Supply Chain",
    role: "Local Supplier Comparison & WhatsApp PO Dispatch",
    description: "Compares live cement, sand, brick, and TMT rebar rates across 3 nearest local hardware depots. Dispatches confirmed WhatsApp Purchase Orders with verified contractor credit terms.",
    metrics: "Save ₹8,000–₹18,000 per Order",
    color: "#EA580C",
    lightBg: "#FFF7ED",
    iconName: "ShoppingBag",
    stats: {
      vendorsConnected: 16,
      poDispatchedThisMonth: 28,
      avgPriceDiscount: "7.8%",
      deliveryLeadTime: "Same Day (3 hrs)"
    }
  },
  {
    id: "credit_cashflow",
    number: "05",
    name: "Contractor Credit AI",
    badge: "Working Capital",
    role: "Emergency Capital & Saturday Labour Payout Buffer",
    description: "Provides an instant ₹5 Lakh to ₹50 Lakh revolving credit line to fund Saturday worker wages and emergency cement loads when client milestone payments are delayed.",
    metrics: "Instant UPI Payouts • 0% for 30 Days",
    color: "#0284C7",
    lightBg: "#F0F9FF",
    iconName: "BadgeIndianRupee",
    stats: {
      creditUnlocked: "₹15,00,000",
      drawnCredit: "₹4,50,000",
      invoicesAudited: 48,
      taxDiscrepanciesCaught: "₹42,800"
    }
  }
];

// Architectural Drawings & AI Takeoff Line Items for Residential / Commercial Small Builder (Agent 1)
export const TAKEOFF_DATA = [
  {
    id: "TK-101",
    dwg: "DWG A-3",
    sheetTitle: "First Floor Slab & Dropped Beams Layout",
    category: "Concrete Works",
    description: "5\" Reinforced Concrete Slab & Beams (M20 Grade Machine Mixed)",
    qty: 48,
    unit: "cum",
    rate: 6800,
    total: 326400,
    confidence: 99.2,
    formula: "Roof Slab Area (280 sqm) × Thk (0.125m) + Dropped Beams (13 cum)",
    status: "Verified",
    highlightZone: { x: 22, y: 26, w: 54, h: 44 }
  },
  {
    id: "TK-102",
    dwg: "DWG A-3",
    sheetTitle: "First Floor Architectural Plan & Wall Openings",
    category: "Masonry",
    description: "9\" External Red Clay Brick Masonry in 1:6 Cement Mortar",
    qty: 112,
    unit: "cum",
    rate: 5200,
    total: 582400,
    confidence: 98.8,
    formula: "Perimeter Wall (62m) × Height (3.1m) × 0.23m - Doors/Windows (14.2 cum)",
    status: "Verified",
    highlightZone: { x: 68, y: 18, w: 24, h: 36 }
  },
  {
    id: "TK-103",
    dwg: "DWG S-02",
    sheetTitle: "Slab & Column Reinforcement Schedule (BBS)",
    category: "Rebar Steel",
    description: "High-yield Fe550D TMT Steel Rebar (8mm, 10mm, 12mm, 16mm Mix)",
    qty: 4.8,
    unit: "MT",
    rate: 62500,
    total: 300000,
    confidence: 99.4,
    formula: "Bar Bending Schedule (BBS) for Slab Mesh + Column Stirrups & Ties",
    status: "Verified",
    highlightZone: { x: 12, y: 12, w: 38, h: 46 }
  },
  {
    id: "TK-104",
    dwg: "DWG A-4",
    sheetTitle: "Internal Finishes & Wall Surface Schedule",
    category: "Plastering",
    description: "Internal Sand-Faced Cement Plaster (12mm) with Smooth Neeru Finish",
    qty: 680,
    unit: "sqm",
    rate: 340,
    total: 231200,
    confidence: 98.4,
    formula: "Internal Wall Area (740 sqm) - Tile Dado Zones (60 sqm)",
    status: "Review Recommended",
    highlightZone: { x: 42, y: 65, w: 36, h: 22 }
  },
  {
    id: "TK-105",
    dwg: "DWG A-4",
    sheetTitle: "Flooring Layout Plan & Skirting Details",
    category: "Flooring",
    description: "Vitrified Floor Tiles (800×800mm Double Charged) with Chemical Adhesive",
    qty: 220,
    unit: "sqm",
    rate: 1450,
    total: 319000,
    confidence: 99.1,
    formula: "Living (58 sqm) + Kitchen (24 sqm) + 3 Bedrooms (120 sqm) + 10% Skirting",
    status: "Verified",
    highlightZone: { x: 18, y: 60, w: 42, h: 28 }
  },
  {
    id: "TK-106",
    dwg: "DWG P-01",
    sheetTitle: "Plumbing Line Routing & Drainage Core",
    category: "Plumbing",
    description: "CPVC & SWR Concealed Plumbing Lines & Sanitary Fittings",
    qty: 180,
    unit: "Rmt",
    rate: 420,
    total: 75600,
    confidence: 97.9,
    formula: "3 Attached Bathrooms + Kitchen Sink + Terrace Water Tank Inward",
    status: "Verified",
    highlightZone: { x: 58, y: 52, w: 26, h: 28 }
  }
];

// Project Manager Roadblocks & Quality Alerts for Agent 2 (Small Site Realities)
export const PM_ALERTS = [
  {
    id: "ALT-801",
    severity: "critical",
    category: "Productivity",
    title: "Mason Productivity Deficit on 1st Floor Brickwork",
    description: "Planned progress: 65% • Actual progress: 58% (7% lag). Team of 6 masons completed 42 sqm vs 60 sqm expected due to mortar mixer downtime.",
    impact: "Potential Slab Delay: +3 Days if not recovered",
    timestamp: "Today, 11:20 AM",
    actionable: {
      type: "replan",
      label: "Transfer 2 Masons from Katraj Site",
      actionText: "Katraj Site B1 currently has 2 idle masons post-column pour. Reallocate for 2 days."
    }
  },
  {
    id: "ALT-802",
    severity: "warning",
    category: "Quality Defect",
    title: "Honeycomb Void Detected in Column C-4",
    description: "Supervisor photo flagged surface honeycombing at 1.8m height on Ground Floor RCC column pour at Kothrud Site A1.",
    impact: "Client inspection next Tuesday requires structural patch",
    timestamp: "Yesterday, 4:15 PM",
    photoUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=600&q=80",
    actionable: {
      type: "snag",
      label: "Raise Snag Rectification Ticket",
      actionText: "Auto-assign non-shrink polymer grout repair ticket to site supervisor Rushi."
    }
  },
  {
    id: "ALT-803",
    severity: "info",
    category: "Material Deficit",
    title: "Low Stock Alert: UltraTech 53 Grade Cement",
    description: "Current on-site inventory: 60 Bags. Daily usage: 20 Bags/day. Tuesday slab pour requires 120 bags minimum (Deficit: 60 Bags).",
    impact: "Risk of Concreting Stoppage in 48 hours",
    timestamp: "Today, 09:30 AM",
    actionable: {
      type: "order",
      label: "Auto-trigger Local RFQ Agent",
      actionText: "Dispatched RFQ to Mahalaxmi Hardware & Shree Balaji Traders for 150 bags delivery."
    }
  }
];

// Vendor Quotes Matrix for Agent 4 (Local Hardware Depots)
export const PROCUREMENT_QUOTES = [
  {
    id: "VND-1",
    vendorName: "Mahalaxmi Hardware & Cement (Kothrud Depot)",
    badge: "Recommended Local Match",
    isRecommended: true,
    rating: 4.9,
    cementRate: 365,
    cementPrev: 395,
    pvcRate: 85,
    steelRate: 58500,
    leadTime: "Same Day (3 hrs)",
    paymentTerms: "15 Days Credit (0% Advance)",
    gstCompliant: true,
    totalOrderAmount: 54750,
    savings: 4500,
    reliabilityScore: "99.4%"
  },
  {
    id: "VND-2",
    vendorName: "Shree Balaji Building Traders (Warje)",
    badge: "Nearby Depot",
    isRecommended: false,
    rating: 4.6,
    cementRate: 372,
    cementPrev: 395,
    pvcRate: 88,
    steelRate: 59200,
    leadTime: "Tomorrow Morning",
    paymentTerms: "7 Days Credit",
    gstCompliant: true,
    totalOrderAmount: 55800,
    savings: 3450,
    reliabilityScore: "94.2%"
  },
  {
    id: "VND-3",
    vendorName: "Pune City Building Mart",
    badge: "Regional Supplier",
    isRecommended: false,
    rating: 4.2,
    cementRate: 385,
    cementPrev: 395,
    pvcRate: 92,
    steelRate: 60500,
    leadTime: "In 2 Days",
    paymentTerms: "100% Advance (UPI)",
    gstCompliant: true,
    totalOrderAmount: 57750,
    savings: 1500,
    reliabilityScore: "88.7%"
  }
];

// Financial Health & Cashflow for Agent 5 (Small Contractor 1-10 Sites Scale)
export const CASHFLOW_METRICS = {
  totalReceived: 42.50, // in Lakhs
  totalPaid: 36.80, // in Lakhs
  netCashflow: 5.70, // in Lakhs
  currentMonthInflow: 7.80, // in Lakhs
  materialExpense: 4.20, // in Lakhs
  manpowerExpense: 1.85, // in Lakhs
  machineryExpense: 0.45, // in Lakhs
  creditLimitUnlocked: 15.0, // in Lakhs (Working Capital Micro-line)
  creditDrawn: 4.50,
  creditAvailable: 10.50,
  interestRate: "0% for first 30 days",
  monthlyTrend: [
    { month: "May 26", received: 6.2, paid: 5.4 },
    { month: "Jun 26", received: 7.1, paid: 6.3 },
    { month: "Jul 26", received: 8.4, paid: 7.6 },
    { month: "Aug 26", received: 7.8, paid: 6.9 },
    { month: "Sep 26", received: 8.5, paid: 7.4 },
    { month: "Oct 26", received: 9.1, paid: 7.8 }
  ]
};

// Social proof partner logos - Top Regional Builders & Trade Associations
export const PARTNER_LOGOS = [
  { name: "MAHA-BUILD", sub: "Builders Association" },
  { name: "SHREE INFRA", sub: "Turnkey Civil Works" },
  { name: "KOTHARI & SONS", sub: "Residential Developers" },
  { name: "DESHMUKH BUILDERS", sub: "Pune & PCMC" }
];

// Customer Testimonials - Real Small Contractors & Builders
export const TESTIMONIALS = [
  {
    quote: "As an independent contractor handling 3 residential sites, I used to spend every Sunday evening calculating labour diaries and fighting over cement bills. BuildForce gave me complete peace of mind.",
    author: "Santosh More",
    role: "Proprietor & Builder",
    company: "More Associates Civil Works",
    city: "Pune"
  },
  {
    quote: "The WhatsApp client room alone saved me ₹85,000 in extra plumbing and electrical work on our Kothrud bungalow project. The homeowner approved the cost and timeline with one click.",
    author: "Rajesh Sawant",
    role: "Turnkey Contractor",
    company: "Sawant Civil & Interiors",
    city: "Pune"
  },
  {
    quote: "BuildForce Takeoff AI scans our architect CAD drawings and gives us exact concrete, rebar, brick, and tile quantities in 4 minutes. We quote residential bids 5x faster with 100% confidence.",
    author: "Nilesh Patil",
    role: "Chief Estimator & Partner",
    company: "Patil Constructions",
    city: "Nashik"
  }
];

// ============================================================================
// SMALL CONTRACTOR & KRITISPERE OPERATIONAL DATASETS
// Designed for Builders, Sub-Contractors & Trade Specialists (1-10 sites)
// ============================================================================

export const USER_PERSONAS = [
  {
    id: "omkar_contractor",
    name: "Omkar (Contractor)",
    role: "Contractor Owner",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    sitesCount: 3,
    activeBudget: "₹57.5L"
  },
  {
    id: "rushi_supervisor",
    name: "Rushi Khalate (Supervisor)",
    role: "Site Supervisor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    assignedSite: "Kothrud Site A1 - Main Structure",
    labourCount: 9
  },
  {
    id: "padmakar_supervisor",
    name: "Padmakar (Supervisor)",
    role: "Site Supervisor",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    assignedSite: "Katraj Commercial Site B1",
    labourCount: 8
  }
];

export const SMALL_CONTRACTOR_PROJECTS = [
  {
    id: "ks-proj-1",
    name: "Kothrud Residence Renovation",
    clientName: "Ramesh Chavan",
    clientPhone: "+91 98220 12345",
    address: "Flat 402, Shanti Heights, Kothrud, Pune",
    contractBudget: 1250000,
    actualCostSpent: 885000,
    projectedFinalCost: 1315000,
    costOverrun: 65000,
    isOverrunRisk: true,
    progressPercentage: 62,
    daysElapsed: 68,
    daysRemaining: 38,
    projectedDelayDays: 8,
    status: "In Progress",
    sites: [
      {
        id: "site-a1",
        name: "Kothrud Site A1 - Main Structure & Brickwork",
        phase: "Brickwork",
        supervisor: "Rushi Khalate",
        labourCount: 9,
        progress: 68
      },
      {
        id: "site-a2",
        name: "Kothrud Site A2 - Interior & Plumbing Work",
        phase: "Plumbing",
        supervisor: "Padmakar",
        labourCount: 5,
        progress: 42
      }
    ]
  },
  {
    id: "ks-proj-2",
    name: "Katraj Commercial Building",
    clientName: "Sunita Patil",
    clientPhone: "+91 98231 67890",
    address: "Plot 88, Katraj Bypass Road, Pune",
    contractBudget: 4500000,
    actualCostSpent: 2650000,
    projectedFinalCost: 4720000,
    costOverrun: 220000,
    isOverrunRisk: true,
    progressPercentage: 56,
    daysElapsed: 110,
    daysRemaining: 75,
    projectedDelayDays: 12,
    status: "In Progress",
    sites: [
      {
        id: "site-b1",
        name: "Katraj Site B1 - Foundation & Structure",
        phase: "RCC Slab Casting",
        supervisor: "Padmakar",
        labourCount: 8,
        progress: 56
      }
    ]
  }
];

export const EARLY_WARNING_ALERTS = [
  {
    id: "alert-1",
    type: "critical",
    category: "Material Shortage",
    title: "Critical Cement Shortage at Kothrud",
    date: "Today",
    description: "UltraTech Cement stock at Kothrud Site A1 is down to 60 bags. Will run out in 2 days at current usage rate (20 bags/day). Supervisor Rushi raised request #req-1 for 150 bags.",
    actionLabel: "Review & Dispatch",
    actionTarget: "materials"
  },
  {
    id: "alert-2",
    type: "warning",
    category: "Cost Overrun",
    title: "Potential Cost Overrun: Katraj Commercial",
    date: "Today",
    description: "Projected cost is ₹2.2L (4.8%) above budget due to steel price increase (+₹3,500/ton) and 12-day timeline delay on column formwork.",
    actionLabel: "Analyze Overrun",
    actionTarget: "cost_overruns"
  }
];

export const MATERIAL_STOCK_ITEMS = [
  {
    id: "mat-1",
    name: "UltraTech 53 Grade Cement",
    category: "Cement",
    dealer: "Maharashtra Cement & Steel Suppliers",
    siteLocation: "Kothrud Site A1 - Main Structure & Brickwork",
    planned: 500,
    unit: "bags",
    received: 350,
    used: 285,
    wastage: 5,
    remainingStock: 60,
    reorderLevel: 80,
    marketRate: 420,
    stockStatus: "Low Stock",
    statusBadgeColor: "#ef4444",
    lastUpdated: "Today 08:45 AM by Rushi"
  },
  {
    id: "mat-2",
    name: "Red Clay Bricks (Standard)",
    category: "Bricks",
    dealer: "Pune Bricks & Hardware Depot",
    siteLocation: "Kothrud Site A1 - Main Structure & Brickwork",
    planned: 15000,
    unit: "pieces",
    received: 12000,
    used: 9800,
    wastage: 400,
    remainingStock: 1800,
    reorderLevel: 1000,
    marketRate: 9,
    stockStatus: "Sufficient",
    statusBadgeColor: "#10b981",
    lastUpdated: "Today 09:15 AM by Rushi"
  },
  {
    id: "mat-3",
    name: "Supreme CPVC Pipes 1-inch (3m)",
    category: "Plumbing",
    dealer: "Kajaria Tiles & Sanitary World",
    siteLocation: "Kothrud Site A2 - Interior & Plumbing",
    planned: 80,
    unit: "pieces",
    received: 60,
    used: 48,
    wastage: 2,
    remainingStock: 10,
    reorderLevel: 8,
    marketRate: 340,
    stockStatus: "Sufficient",
    statusBadgeColor: "#10b981",
    lastUpdated: "Yesterday 06:30 PM by Padmakar"
  },
  {
    id: "mat-4",
    name: "JSW TMT Steel Fe 550D (16mm)",
    category: "Steel",
    dealer: "Maharashtra Cement & Steel Suppliers",
    siteLocation: "Katraj Commercial Site B1 - Structure",
    planned: 45,
    unit: "tons",
    received: 25,
    used: 22,
    wastage: 0.5,
    remainingStock: 2.5,
    reorderLevel: 4,
    marketRate: 64500,
    stockStatus: "Low Stock",
    statusBadgeColor: "#ef4444",
    lastUpdated: "Today 10:00 AM by Padmakar"
  }
];

export const PENDING_MATERIAL_REQUESTS = [
  {
    id: "req-1",
    materialName: "UltraTech 53 Grade Cement",
    priority: "High Priority",
    reqDate: "2026-10-18",
    requestedBy: "Rushi Khalate (Site Supervisor)",
    siteProject: "Kothrud Site A1 - Main Structure",
    currentSiteStock: "60 bags",
    requestedQty: "150 bags",
    estCostImpact: 63000,
    reason: "Upcoming slab concrete pour on Tuesday morning requires 120 bags minimum. Stock will deplete tomorrow.",
    status: "Awaiting Approval"
  }
];

export const LABOUR_ATTENDANCE_DATA = [
  {
    id: "w-1",
    name: "Subhash More",
    role: "Mason",
    baseWage: 850,
    siteLocation: "Kothrud Site A1 - Main Structure",
    status: "Present",
    checkIn: "08:30 AM",
    checkOut: "07:30 PM",
    regularHours: 8,
    overtimeHours: 2.5,
    overtimePay: 400,
    bonus: 100,
    totalWage: 1350,
    recordedBy: "Rushi Khalate"
  },
  {
    id: "w-2",
    name: "Ganesh Shinde",
    role: "Mason",
    baseWage: 850,
    siteLocation: "Kothrud Site A1 - Main Structure",
    status: "Present",
    checkIn: "08:30 AM",
    checkOut: "07:30 PM",
    regularHours: 8,
    overtimeHours: 2.5,
    overtimePay: 400,
    bonus: 100,
    totalWage: 1350,
    recordedBy: "Rushi Khalate"
  },
  {
    id: "w-3",
    name: "Raju Salunke",
    role: "General Labour",
    baseWage: 550,
    siteLocation: "Kothrud Site A1 - Main Structure",
    status: "Present",
    checkIn: "08:30 AM",
    checkOut: "05:30 PM",
    regularHours: 8,
    overtimeHours: 0,
    overtimePay: 0,
    bonus: 0,
    totalWage: 550,
    recordedBy: "Rushi Khalate"
  },
  {
    id: "w-4",
    name: "Babu Jadhav",
    role: "General Labour",
    baseWage: 550,
    siteLocation: "Kothrud Site A1 - Main Structure",
    status: "Absent",
    checkIn: "-",
    checkOut: "-",
    regularHours: 0,
    overtimeHours: 0,
    overtimePay: 0,
    bonus: 0,
    totalWage: 0,
    recordedBy: "Rushi Khalate"
  },
  {
    id: "w-5",
    name: "Deepak Lohar",
    role: "Steel Fixer",
    baseWage: 900,
    siteLocation: "Katraj Commercial Site B1",
    status: "Present",
    checkIn: "08:00 AM",
    checkOut: "06:00 PM",
    regularHours: 8,
    overtimeHours: 1,
    overtimePay: 170,
    bonus: 0,
    totalWage: 1070,
    recordedBy: "Padmakar Supervisor"
  },
  {
    id: "w-6",
    name: "Pandurang Bhosale",
    role: "Steel Fixer",
    baseWage: 900,
    siteLocation: "Katraj Commercial Site B1",
    status: "Present",
    checkIn: "08:00 AM",
    checkOut: "06:00 PM",
    regularHours: 8,
    overtimeHours: 1,
    overtimePay: 170,
    bonus: 0,
    totalWage: 1070,
    recordedBy: "Padmakar Supervisor"
  }
];

export const CONTRACT_STAGE_PAYMENTS = {
  contractRef: "KS-CTR-PROJ-1",
  grossContractValue: 1475000,
  baseValue: 1250000,
  gst18: 225000,
  paymentsReceived: 600000,
  outstandingReceivable: 875000,
  version: "1.0 (Acknowledged)",
  signedDate: "2026-08-03",
  retentionPercent: 5,
  retentionAmount: 62500,
  defectLiabilityMonths: 12,
  milestones: [
    {
      stage: 1,
      title: "Advance / Mobilization",
      percentage: 15,
      amount: 221250,
      status: "Paid",
      paymentDate: "2026-08-05",
      reference: "NEFT: HDFC0001928371",
      notes: "Received on contract signing"
    },
    {
      stage: 2,
      title: "Plinth & Foundation Completion",
      percentage: 25,
      amount: 368750,
      status: "Paid",
      paymentDate: "2026-09-12",
      reference: "NEFT: HDFC000291048201",
      notes: "Inspection certified by client"
    },
    {
      stage: 3,
      title: "Ground + 1 Slab Casting",
      percentage: 25,
      amount: 368750,
      status: "In Progress (Receivable)",
      paymentDate: "Due 2026-10-22",
      reference: "Pending Verification",
      notes: "Slab formwork complete, invoice generated"
    },
    {
      stage: 4,
      title: "Brickwork & Internal Plastering",
      percentage: 20,
      amount: 295000,
      status: "Upcoming",
      paymentDate: "Est. 2026-11-20",
      reference: "Stage 4 Trigger",
      notes: "Dependent on mason productivity"
    },
    {
      stage: 5,
      title: "Final Finishing, Painting & Handover",
      percentage: 15,
      amount: 221250,
      status: "Upcoming (Includes 5% Retention)",
      paymentDate: "Est. 2026-12-30",
      reference: "Stage 5 Final Clearance",
      notes: "5% retention held for 12 months defect liability"
    }
  ]
};

export const CASHFLOW_RUNWAY_METRICS = {
  openingCashReserve: 380000,
  min12WeekBalance: 90200,
  safeToWithdraw: 36080,
  inflows12Week: 4600000,
  outflows12Week: 1780600,
  netChange: 2819400,
  firstShortfallDate: "None Detected (84 Days Safe Runway)",
  weeklyWithdrawalCap: 72050
};

export const CLIENT_ROOM_STREAM = [
  {
    id: "msg-1",
    sender: "client",
    senderName: "Ramesh Chavan (Client)",
    time: "21:50",
    text: "Thank you Omkar. I have transferred ₹2,50,000 via NEFT (UTR: HDFC000291048201). Also, can we add the cove lighting false ceiling in the living hall?",
    isChangeOrder: false
  },
  {
    id: "msg-2",
    sender: "contractor",
    senderName: "Omkar (Contractor)",
    time: "15:30",
    text: "Change Order Proposed: Gypsum False Ceiling with LED Profile Channels in Main Living Area. Cost: +₹35,000. Timeline: +3 Days.",
    isChangeOrder: true,
    changeOrderDetails: {
      title: "Gypsum False Ceiling with LED Profile Channels in Main Living Area",
      cost: "₹35,000",
      timelineImpact: "+3 Days"
    }
  },
  {
    id: "msg-3",
    sender: "client",
    senderName: "Ramesh Chavan (Client)",
    time: "16:15",
    text: "Change order approved. Happy with +₹35,000 and 3 days extension.",
    isSignedApproval: true,
    badgeText: "Client Signed Scope & Terms"
  }
];

