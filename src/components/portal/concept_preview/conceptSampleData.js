// Concept preview sample data for building agents (Estimator & Quality)
// Note: These are explicitly isolated sample blueprints for preview purposes only.

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
