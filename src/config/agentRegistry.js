/**
 * Central Agent Registry
 * Defines all 5 agents with their live/building status, data inputs, and scope boundaries.
 */

export const AGENT_REGISTRY = [
  {
    id: 'cash',
    name: 'Cash & Bills AI',
    status: 'live',
    tag: '12-Week Runway & 3-Way Audit',
    purpose: 'Simulates 12-week forward cashflow, protects Saturday worker wages, and conducts 3-way matching between POs, challans, and invoices.',
    dataItUses: [
      'Client payments received & milestone schedules',
      'Daily attendance logs & wage run-rate',
      'Approved/pending dealer invoices & credit days',
      'Weekly firm overhead settings',
      'Upcoming procurement PO commitments'
    ],
    whatItDoes: [
      'Runs day-by-day cash simulation in Expected & Pessimistic scenarios',
      'Never defers wages; flags deferrable dealer dues within grace periods',
      'Conducts strict 3-way invoice audit (Quantity, Rate variance, Line math, GST HSN check)',
      'Calculates undisputed recommended payable and held amounts',
      'Provides Credit Readiness checklist (records captured, no loan offers)'
    ],
    whatItDoesNot: [
      'Never executes bank transfers or payments on its own',
      'Never defers or cuts worker wages',
      'Never offers unverified loans or fake revolving credit lines'
    ]
  },
  {
    id: 'procurement',
    name: 'Procurement & RFQ AI',
    status: 'live',
    tag: 'Shortage Radar & Quote Ranking',
    purpose: 'Forecasts material runouts, generates multi-dealer WhatsApp RFQs, and ranks typed dealer quotes by true landed cost.',
    dataItUses: [
      'Current on-site inventory counts',
      'Average daily outward consumption rate (or task material needs)',
      'Task schedule need-by dates',
      'Dealer lead times & delivery history',
      'Contractor-entered dealer quotes'
    ],
    whatItDoes: [
      'Calculates days of cover and triggers alerts before order-by deadlines',
      'Generates multilingual WhatsApp RFQ drafts (English, Hindi, Marathi)',
      'Ranks typed dealer quotes by landed cost (Rate + GST + Transport - Credit benefit)',
      'Penalizes or excludes quotes arriving after critical task need-by dates',
      'Calculates real supplier scorecards from actual delivery challans'
    ],
    whatItDoesNot: [
      'Never invents fake suppliers or artificial discounts',
      'Never auto-dispatches orders without contractor confirmation'
    ]
  },
  {
    id: 'scheduler',
    name: 'Site Scheduler & PM AI',
    status: 'live',
    tag: 'Critical Path & Roadblock Radar',
    purpose: 'Computes Critical Path Method (CPM) floats, tracks S-curve progress, flags crew deficits, and drafts client-safe DPRs.',
    dataItUses: [
      'Task durations, weights, and finish-to-start dependencies',
      'Daily worker attendance logs from site supervisors',
      'Material readiness alerts from Procurement AI',
      'Open high-priority site issues & snags',
      'Weather forecasts (rain risk detection)'
    ],
    whatItDoes: [
      'Computes early/late starts, total float, and critical path',
      'Calculates planned vs. actual S-curve and Schedule Performance Index (SPI)',
      'Flags tasks with low crew attendance below required threshold',
      'Generates recovery plans as Version N+1 while preserving Version 1 baseline',
      'Synthesizes client-safe Daily Progress Reports for WhatsApp export'
    ],
    whatItDoesNot: [
      'Never mutates or overwrites the baseline Version 1 schedule',
      'Never makes unconfirmed changes to task milestones'
    ]
  },
  {
    id: 'estimator',
    name: 'Estimator & Takeoff AI',
    status: 'building',
    tag: 'Drawing Geometry Takeoff',
    purpose: 'Automated quantity takeoff from 2D/3D architectural CAD drawings.',
    dataItUses: [
      'Architectural drawings (DWG/PDF)',
      'Standard Schedule of Rates (DSR/CSR)',
      'Structural member specifications'
    ],
    whatItDoes: [
      'Currently supports manual item entry and rates library',
      'Automated vector CAD layer scanning is under active development'
    ],
    whatItDoesNot: [
      'Does not invent confidence scores or produce unverified bids without human review'
    ]
  },
  {
    id: 'quality',
    name: 'Quality & Snags AI',
    status: 'building',
    tag: 'Checklists & Photographic Snags',
    purpose: 'Structured pre-pour quality checklists and photo-verified snag rectification.',
    dataItUses: [
      'Site inspection photographs',
      'IS Code compliance standards (IS 456, IS 1200)',
      'Supervisor daily snag entries'
    ],
    whatItDoes: [
      'Currently supports manual issue logging and priority assignment',
      'Computer-vision defect recognition is under active development'
    ],
    whatItDoesNot: [
      'Does not claim automated computer-vision defect accuracy without verification'
    ]
  }
];
