/**
 * Central Agent Registry
 * Defines the 6-agent team: Capture, Scheduler & PM, Procurement & RFQ, Cash & Bills, Client Updates, and Coordinator.
 * Each agent is marked 'preview' until its real logic, data models, and tests exist.
 */

export const AGENT_REGISTRY = [
  {
    id: 'capture',
    name: 'Capture AI',
    status: 'preview',
    tag: 'Daily Voice/Photo Ingestion & Extraction',
    purpose: 'Ingests raw supervisor WhatsApp voice notes, photos, and delivery challans into structured site records.',
    dataItUses: [
      'Supervisor audio notes and transcriptions',
      'Material delivery challan photos',
      'Work progress site photos',
      'Labour muster roll snapshots'
    ],
    whatItDoes: [
      'Extracts attendance counts and material quantities from field reports',
      'Flags quantity discrepancies before records enter the site ledger',
      'Drafts site log entries for contractor confirmation'
    ],
    whatItDoesNot: [
      'Never commits unreviewed records without human verification',
      'Never invents site logs or attendance records'
    ]
  },
  {
    id: 'scheduler',
    name: 'Scheduler & PM AI',
    status: 'preview',
    tag: 'Critical Path, Delay Forecast & PM Radar',
    purpose: 'Computes Critical Path Method (CPM) floats, tracks S-curve progress, flags crew deficits, and drafts recovery milestones.',
    dataItUses: [
      'Task durations, weights, and finish-to-start dependencies',
      'Daily worker attendance logs from site supervisors',
      'Material readiness alerts from Procurement AI',
      'Open high-priority site issues & snags'
    ],
    whatItDoes: [
      'Computes early/late starts, total float, and critical path',
      'Calculates planned vs. actual S-curve progress',
      'Flags tasks with crew attendance below required threshold',
      'Generates recovery plans as Version N+1 while preserving baseline'
    ],
    whatItDoesNot: [
      'Never mutates or overwrites the baseline Version 1 schedule',
      'Never invents fake progress or hardcoded recovery dates'
    ]
  },
  {
    id: 'procurement',
    name: 'Procurement & RFQ AI',
    status: 'preview',
    tag: 'Shortage Radar & Landed Cost RFQ',
    purpose: 'Forecasts material runouts, generates multi-dealer WhatsApp RFQs, and ranks typed dealer quotes by true landed cost.',
    dataItUses: [
      'Current on-site inventory counts',
      'Average daily outward consumption rate',
      'Task schedule need-by dates',
      'Contractor-entered dealer quotes'
    ],
    whatItDoes: [
      'Calculates days of cover and triggers alerts before order-by deadlines',
      'Generates multilingual WhatsApp RFQ drafts (English, Hindi, Marathi)',
      'Ranks dealer quotes by landed cost including credit terms',
      'Flags quotes arriving after critical need-by dates'
    ],
    whatItDoesNot: [
      'Never invents fake suppliers or artificial discounts',
      'Never auto-dispatches orders without contractor confirmation'
    ]
  },
  {
    id: 'cash',
    name: 'Cash & Bills AI',
    status: 'preview',
    tag: '12-Week Runway & 3-Way Audit',
    purpose: 'Simulates 12-week forward cashflow, protects worker wages, and conducts 3-way matching between POs, challans, and invoices.',
    dataItUses: [
      'Client payments received & milestone schedules',
      'Daily attendance logs & wage run-rate',
      'Approved/pending dealer invoices & credit days',
      'Weekly firm overhead settings'
    ],
    whatItDoes: [
      'Runs day-by-day cash simulation in Expected & Pessimistic scenarios',
      'Prioritizes worker wage reserves above vendor disbursements',
      'Conducts 3-way invoice audit (Quantity, Rate variance, Line math)',
      'Calculates undisputed recommended payable and held amounts'
    ],
    whatItDoesNot: [
      'Never executes bank transfers or payments on its own',
      'Never defers or cuts worker wages',
      'Never offers unverified loans or fake credit lines'
    ]
  },
  {
    id: 'client',
    name: 'Client Updates AI',
    status: 'preview',
    tag: 'Transmittals & Client-Safe DPRs',
    purpose: 'Synthesizes sanitized, client-safe progress updates and transmittal records from site events.',
    dataItUses: [
      'Completed task milestones',
      'Verified progress photographs',
      'Material pour and casting events',
      'Approved schedule updates'
    ],
    whatItDoes: [
      'Drafts polite, professional WhatsApp updates for clients',
      'Filters out internal contractor margin, wage, and dispute details',
      'Formats weekly executive progress bulletins with milestone proofs'
    ],
    whatItDoesNot: [
      'Never leaks internal wage rates or contractor cost margins to clients',
      'Never sends unreviewed client messages or invented progress reports'
    ]
  },
  {
    id: 'coordinator',
    name: 'Coordinator AI',
    status: 'preview',
    tag: 'Multi-Agent Consensus & Proposals',
    purpose: 'Coordinates cross-agent findings, resolves schedule-cash shortages, deduplicates cross-agent alerts, and presents unified contractor proposals.',
    dataItUses: [
      'Material shortages from Procurement AI',
      'CPM delay forecasts from Scheduler AI',
      'Cash balances and runway from Cash & Bills AI',
      'Supervisor updates from Capture AI'
    ],
    whatItDoes: [
      'Correlates delays to material shortages and cash shortfalls',
      'Deduplicates cross-agent notifications into single unified proposals',
      'Produces prioritized multi-agent action items with trade-off analysis'
    ],
    whatItDoesNot: [
      'Never invents unilateral actions or overrides individual agent domains',
      'Never bypasses contractor confirmation on proposals'
    ]
  }
];
