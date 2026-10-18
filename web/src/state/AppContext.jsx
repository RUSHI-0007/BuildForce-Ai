import React, { useState, useEffect } from 'react';
import { createEventLedger } from '@buildforce/core';
import api from '../services/httpClient';
import storageService from '../services/storage';
import { AppContext, STORAGE_KEYS, MAX_LEDGER_STORAGE_ENTRIES } from './appContextInstance';

// Clean, realistic minimal starter project for small contractor
const INITIAL_PROJECT = {
  id: 'site_101',
  name: 'Shivaji Nagar Villa (G+2)',
  location: 'Shivaji Nagar, Pune',
  client_name: 'Dr. Rahul Kulkarni',
  budget: 4500000, // 45 Lakhs
  status: 'In Progress',
  progress: 42,
  start_date: '2026-08-01',
  end_date: '2026-12-15',
  type: 'Residential Bungalow'
};

const INITIAL_TASKS = [
  { id: 'tsk_1', project_id: 'site_101', name: 'First Floor Slab Casting', stage: 'RCC Work', status: 'In Progress', due_date: '2026-10-25', assigned_to: 'Ramesh Mistri' },
  { id: 'tsk_2', project_id: 'site_101', name: 'Ground Floor Brick Masonry', stage: 'Masonry', status: 'Completed', due_date: '2026-10-15', assigned_to: 'Santosh' },
  { id: 'tsk_3', project_id: 'site_101', name: 'Plumbing Concealed Piping', stage: 'Services', status: 'Pending', due_date: '2026-11-02', assigned_to: 'Irfan Plumber' },
  { id: 'tsk_4', project_id: 'site_101', name: 'Electrical Conduit Laying', stage: 'Electrical', status: 'Pending', due_date: '2026-11-08', assigned_to: 'Mahesh Electrician' }
];

const INITIAL_ISSUES = [
  { id: 'iss_1', project_id: 'site_101', title: 'Cement delivery delayed by 2 days', priority: 'High', status: 'Open', reported_date: '2026-10-16', assigned_to: 'Omkar (Owner)' },
  { id: 'iss_2', project_id: 'site_101', title: 'Honeycomb visible near Column C4', priority: 'Medium', status: 'Resolved', reported_date: '2026-10-12', assigned_to: 'Site Engineer' }
];

const INITIAL_MATERIALS = [
  { id: 'mat_1', name: 'UltraTech Cement (50kg)', unit: 'Bags', in_stock: 140, unit_price: 385, min_threshold: 50 },
  { id: 'mat_2', name: 'Fe550 TMT Steel (12mm)', unit: 'Tons', in_stock: 3.8, unit_price: 54000, min_threshold: 1.5 },
  { id: 'mat_3', name: 'Crushed River Sand', unit: 'Brass', in_stock: 6, unit_price: 7200, min_threshold: 2 },
  { id: 'mat_4', name: 'Red Clay Bricks', unit: 'Pieces', in_stock: 4500, unit_price: 9.5, min_threshold: 1000 }
];

const INITIAL_LABOUR = [
  { id: 'lab_1', name: 'Ramesh Mistri', phone: '9822104512', trade: 'Mason Mistri', daily_wage: 1100, status: 'Active' },
  { id: 'lab_2', name: 'Santosh Kumar', phone: '9822304891', trade: 'Mason', daily_wage: 850, status: 'Active' },
  { id: 'lab_3', name: 'Bablu Yadav', phone: '9734120988', trade: 'Helper', daily_wage: 550, status: 'Active' },
  { id: 'lab_4', name: 'Gopal Mondal', phone: '9655123409', trade: 'Helper', daily_wage: 550, status: 'Active' },
  { id: 'lab_5', name: 'Irfan Khan', phone: '9422091823', trade: 'Plumber', daily_wage: 950, status: 'Active' }
];

const INITIAL_ATTENDANCE = [
  { id: 'att_1', project_id: 'site_101', labour_id: 'lab_1', date: '2026-10-18', status: 'PRESENT', advance_paid: 0 },
  { id: 'att_2', project_id: 'site_101', labour_id: 'lab_2', date: '2026-10-18', status: 'PRESENT', advance_paid: 200 },
  { id: 'att_3', project_id: 'site_101', labour_id: 'lab_3', date: '2026-10-18', status: 'PRESENT', advance_paid: 0 },
  { id: 'att_4', project_id: 'site_101', labour_id: 'lab_4', date: '2026-10-18', status: 'HALF_DAY', advance_paid: 0 },
  { id: 'att_5', project_id: 'site_101', labour_id: 'lab_5', date: '2026-10-18', status: 'PRESENT', advance_paid: 500 }
];

const INITIAL_PAYMENTS = [
  { id: 'pay_1', project_id: 'site_101', milestone: 'Plinth Completion Stage', amount: 900000, type: 'INCOME', date: '2026-08-28', status: 'Received', mode: 'NEFT' },
  { id: 'pay_2', project_id: 'site_101', milestone: 'Ground Floor Slab Cast', amount: 850000, type: 'INCOME', date: '2026-09-30', status: 'Received', mode: 'Cheque' },
  { id: 'pay_3', project_id: 'site_101', milestone: 'First Floor Slab Stage (Upcoming)', amount: 800000, type: 'INCOME', date: '2026-10-30', status: 'Due Soon', mode: 'Pending' },
  { id: 'pay_4', project_id: 'site_101', milestone: 'Steel & Cement Bulk Purchase', amount: 320000, type: 'EXPENSE', date: '2026-10-05', status: 'Paid', mode: 'RTGS' },
  { id: 'pay_5', project_id: 'site_101', milestone: 'Weekly Labour Wages', amount: 48500, type: 'EXPENSE', date: '2026-10-12', status: 'Paid', mode: 'Cash/UPI' }
];

const INITIAL_DEALERS = [
  { id: 'dlr_1', name: 'Shinde Traders & Hardware', phone: '9822001122', city: 'Pune', rating: 4.8 }
];

const INITIAL_INVOICES = [
  { id: 'inv_1', invoice_no: 'INV-2026-001', dealer_id: 'dlr_1', total: 45000, status: 'CLEAN_MATCH', due_date: '2026-10-30', lines: [] }
];

const INITIAL_PURCHASE_ORDERS = [
  { id: 'po_1', project_id: 'site_101', dealer_id: 'dlr_1', po_number: 'PO-2026-01', total_amount: 45000, status: 'Approved' }
];

const INITIAL_PROPOSALS = [
  { id: 'prop_1', project_id: 'site_101', title: 'Substructure Quote', client_name: 'Dr. Rahul Kulkarni', amount: 1200000, status: 'Draft' }
];

const INITIAL_CASH_SETTINGS = {
  openingBalance: 150000,
  wagePayWeekday: 6,
  overheadPerWeek: 15000,
  wageReserveWeeks: 2
};

export function AppProvider({ children }) {
  // Ensure migration runs on load/initialization
  try {
    storageService.migrate();
  } catch {
    // Non-blocking fallback
  }

  // Load state from storageService (with versioning support)
  const [projects, setProjects] = useState(() => {
    return storageService.get(STORAGE_KEYS.PROJECTS, [INITIAL_PROJECT]);
  });

  const [activeProjectId, setActiveProjectId] = useState(() => {
    return storageService.get(STORAGE_KEYS.ACTIVE_PROJECT_ID, 'site_101');
  });

  const [tasks, setTasks] = useState(() => {
    return storageService.get(STORAGE_KEYS.TASKS, INITIAL_TASKS);
  });

  const [issues, setIssues] = useState(() => {
    return storageService.get(STORAGE_KEYS.ISSUES, INITIAL_ISSUES);
  });

  const [materials, setMaterials] = useState(() => {
    return storageService.get(STORAGE_KEYS.MATERIALS, INITIAL_MATERIALS);
  });

  const [materialTransactions, setMaterialTransactions] = useState(() => {
    return storageService.get(STORAGE_KEYS.MATERIAL_TX, [
      { id: 'tx_1', project_id: 'site_101', item_id: 'mat_1', item_name: 'UltraTech Cement (50kg)', type: 'INWARD', quantity: 200, date: '2026-10-10', receiver: 'Santosh' },
      { id: 'tx_2', project_id: 'site_101', item_id: 'mat_1', item_name: 'UltraTech Cement (50kg)', type: 'OUTWARD', quantity: 60, date: '2026-10-15', receiver: 'Ramesh Mistri' }
    ]);
  });

  const [labour, setLabour] = useState(() => {
    return storageService.get(STORAGE_KEYS.LABOUR, INITIAL_LABOUR);
  });

  const [attendance, setAttendance] = useState(() => {
    return storageService.get(STORAGE_KEYS.ATTENDANCE, INITIAL_ATTENDANCE);
  });

  const [payments, setPayments] = useState(() => {
    return storageService.get(STORAGE_KEYS.PAYMENTS, INITIAL_PAYMENTS);
  });

  // New Phase 2 entities
  const [dealers, setDealers] = useState(() => {
    return storageService.get(STORAGE_KEYS.DEALERS, INITIAL_DEALERS);
  });

  const [invoices, setInvoices] = useState(() => {
    return storageService.get(STORAGE_KEYS.INVOICES, INITIAL_INVOICES);
  });

  const [purchaseOrders, setPurchaseOrders] = useState(() => {
    return storageService.get(STORAGE_KEYS.PURCHASE_ORDERS, INITIAL_PURCHASE_ORDERS);
  });

  const [proposals, setProposals] = useState(() => {
    return storageService.get(STORAGE_KEYS.PROPOSALS, INITIAL_PROPOSALS);
  });

  const [cashSettings, setCashSettings] = useState(() => {
    return storageService.get(STORAGE_KEYS.CASH_SETTINGS, INITIAL_CASH_SETTINGS);
  });

  // Phase 3 entities
  const [deliveries, setDeliveries] = useState(() => {
    return storageService.get(STORAGE_KEYS.DELIVERIES, []);
  });

  const [quotes, setQuotes] = useState(() => {
    return storageService.get(STORAGE_KEYS.QUOTES, []);
  });

  const [rfqs, setRfqs] = useState(() => {
    return storageService.get(STORAGE_KEYS.RFQS, []);
  });

  const [planVersions, setPlanVersions] = useState(() => {
    return storageService.get(STORAGE_KEYS.PLAN_VERSIONS, []);
  });

  // Append-only Event Ledger instance
  const [eventLedger] = useState(() => {
    const savedLog = storageService.get(STORAGE_KEYS.EVENT_LOG, []);
    return createEventLedger(Array.isArray(savedLog) ? savedLog : []);
  });

  // Current view navigation
  const [currentView, setCurrentView] = useState('sites');
  const [activeAgentId, setActiveAgentId] = useState('estimator');

  // Persistence effects
  useEffect(() => { storageService.set(STORAGE_KEYS.PROJECTS, projects); }, [projects]);
  useEffect(() => { storageService.set(STORAGE_KEYS.ACTIVE_PROJECT_ID, activeProjectId || ''); }, [activeProjectId]);
  useEffect(() => { storageService.set(STORAGE_KEYS.TASKS, tasks); }, [tasks]);
  useEffect(() => { storageService.set(STORAGE_KEYS.ISSUES, issues); }, [issues]);
  useEffect(() => { storageService.set(STORAGE_KEYS.MATERIALS, materials); }, [materials]);
  useEffect(() => { storageService.set(STORAGE_KEYS.MATERIAL_TX, materialTransactions); }, [materialTransactions]);
  useEffect(() => { storageService.set(STORAGE_KEYS.LABOUR, labour); }, [labour]);
  useEffect(() => { storageService.set(STORAGE_KEYS.ATTENDANCE, attendance); }, [attendance]);
  useEffect(() => { storageService.set(STORAGE_KEYS.PAYMENTS, payments); }, [payments]);
  useEffect(() => { storageService.set(STORAGE_KEYS.DEALERS, dealers); }, [dealers]);
  useEffect(() => { storageService.set(STORAGE_KEYS.INVOICES, invoices); }, [invoices]);
  useEffect(() => { storageService.set(STORAGE_KEYS.PURCHASE_ORDERS, purchaseOrders); }, [purchaseOrders]);
  useEffect(() => { storageService.set(STORAGE_KEYS.PROPOSALS, proposals); }, [proposals]);
  useEffect(() => { storageService.set(STORAGE_KEYS.CASH_SETTINGS, cashSettings); }, [cashSettings]);
  useEffect(() => { storageService.set(STORAGE_KEYS.DELIVERIES, deliveries); }, [deliveries]);
  useEffect(() => { storageService.set(STORAGE_KEYS.QUOTES, quotes); }, [quotes]);
  useEffect(() => { storageService.set(STORAGE_KEYS.RFQS, rfqs); }, [rfqs]);
  useEffect(() => { storageService.set(STORAGE_KEYS.PLAN_VERSIONS, planVersions); }, [planVersions]);

  // Size guard helper for persisting the event ledger to localStorage
  const persistLedger = (events) => {
    try {
      const boundedEvents = Array.isArray(events)
        ? events.slice(-MAX_LEDGER_STORAGE_ENTRIES)
        : [];
      storageService.set(STORAGE_KEYS.EVENT_LOG, boundedEvents);
    } catch (err) {
      console.warn('[EventLedger] Size guard triggered, pruning older events:', err);
      try {
        const emergencyEvents = Array.isArray(events) ? events.slice(-50) : [];
        storageService.set(STORAGE_KEYS.EVENT_LOG, emergencyEvents);
      } catch {
        // Unrecoverable storage error
      }
    }
  };

  // Log event helper for state mutations
  const logEvent = (type, payload = {}) => {
    try {
      const evt = eventLedger.append({
        type,
        payload,
        project_id: activeProjectId
      });
      persistLedger(eventLedger.read());
      return evt;
    } catch {
      return null;
    }
  };

  // Backend sync
  useEffect(() => {
    if (!api.defaults.baseURL) return;
    let isMounted = true;
    api.get('/projects')
      .then(res => {
        if (isMounted && Array.isArray(res.data) && res.data.length > 0) {
          setProjects(res.data);
        }
      })
      .catch(() => {
        // Backend offline fallback
      });
    return () => { isMounted = false; };
  }, []);

  const activeProject = projects.find(p => p.id === activeProjectId) || projects[0] || null;

  // Project Actions
  const addProject = async (projectData) => {
    const newProj = {
      id: 'site_' + Date.now(),
      name: projectData.name,
      location: projectData.location || 'Site Location',
      client_name: projectData.client_name || 'Client Name',
      budget: Number(projectData.budget) || 2500000,
      status: 'In Progress',
      progress: 0,
      start_date: projectData.start_date || new Date().toISOString().split('T')[0],
      end_date: projectData.end_date || '',
      type: projectData.type || 'Residential'
    };

    setProjects(prev => [newProj, ...prev]);
    setActiveProjectId(newProj.id);
    logEvent('PROJECT_CREATED', newProj);

    if (api.defaults.baseURL) {
      try {
        await api.post('/projects', newProj);
      } catch {
        // offline fallback
      }
    }

    return newProj;
  };

  const updateProject = (id, updates) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    logEvent('PROJECT_UPDATED', { id, ...updates });
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    logEvent('PROJECT_DELETED', { id });
    if (activeProjectId === id) {
      const remaining = projects.filter(p => p.id !== id);
      setActiveProjectId(remaining[0]?.id || null);
    }
  };

  const selectProject = (id) => {
    setActiveProjectId(id);
    setCurrentView('site_dashboard');
  };

  // Tasks Actions
  const addTask = (taskData) => {
    const newTask = {
      id: taskData.id || 'tsk_' + Date.now(),
      project_id: taskData.project_id || activeProjectId,
      name: taskData.name,
      stage: taskData.stage || 'General',
      status: taskData.status || 'Pending',
      start_date: taskData.start_date || new Date().toISOString().split('T')[0],
      due_date: taskData.due_date || new Date().toISOString().split('T')[0],
      duration_days: Number(taskData.duration_days ?? taskData.duration ?? 1),
      depends_on: Array.isArray(taskData.depends_on) ? taskData.depends_on : (taskData.depends_on ? [String(taskData.depends_on)] : []),
      weight: Number(taskData.weight ?? 1),
      progress_pct: Number(taskData.progress_pct ?? taskData.progress ?? 0),
      material_needs: Array.isArray(taskData.material_needs) ? taskData.material_needs : [],
      assigned_to: taskData.assigned_to || 'Mistri'
    };
    setTasks(prev => [newTask, ...prev]);
    logEvent('TASK_CREATED', newTask);
    return newTask;
  };

  const updateTask = (id, updates) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    logEvent('TASK_UPDATED', { id, ...updates });
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    logEvent('TASK_DELETED', { id });
  };

  // Issues Actions
  const addIssue = (issueData) => {
    const newIssue = {
      id: 'iss_' + Date.now(),
      project_id: issueData.project_id || activeProjectId,
      title: issueData.title,
      priority: issueData.priority || 'Medium',
      status: 'Open',
      reported_date: new Date().toISOString().split('T')[0],
      assigned_to: issueData.assigned_to || 'Site Incharge'
    };
    setIssues(prev => [newIssue, ...prev]);
    logEvent('ISSUE_CREATED', newIssue);
    return newIssue;
  };

  const updateIssue = (id, updates) => {
    setIssues(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
    logEvent('ISSUE_UPDATED', { id, ...updates });
  };

  // Materials Actions
  const addMaterial = (matData) => {
    const newMat = {
      id: 'mat_' + Date.now(),
      name: matData.name,
      unit: matData.unit || 'Units',
      in_stock: Number(matData.in_stock) || 0,
      unit_price: Number(matData.unit_price) || 0,
      min_threshold: Number(matData.min_threshold) || 10
    };
    setMaterials(prev => [...prev, newMat]);
    logEvent('MATERIAL_CREATED', newMat);
    return newMat;
  };

  const recordMaterialTransaction = (txData) => {
    const item = materials.find(m => m.id === txData.item_id);
    const newTx = {
      id: 'tx_' + Date.now(),
      project_id: txData.project_id || activeProjectId,
      item_id: txData.item_id,
      item_name: item?.name || 'Material Item',
      type: txData.type,
      quantity: Number(txData.quantity),
      date: txData.date || new Date().toISOString().split('T')[0],
      receiver: txData.receiver || 'Site Mistri'
    };
    setMaterialTransactions(prev => [newTx, ...prev]);

    setMaterials(prev => prev.map(m => {
      if (m.id === txData.item_id) {
        const change = txData.type === 'INWARD' ? Number(txData.quantity) : -Number(txData.quantity);
        return { ...m, in_stock: Math.max(0, m.in_stock + change) };
      }
      return m;
    }));
    logEvent('MATERIAL_TRANSACTION_RECORDED', newTx);
  };

  // Labour & Attendance Actions
  const addLabour = (workerData) => {
    const newWorker = {
      id: 'lab_' + Date.now(),
      name: workerData.name,
      phone: workerData.phone || '',
      trade: workerData.trade || 'Helper',
      daily_wage: Number(workerData.daily_wage) || 600,
      status: 'Active'
    };
    setLabour(prev => [...prev, newWorker]);
    logEvent('LABOUR_CREATED', newWorker);
    return newWorker;
  };

  const markAttendance = (labourId, status, advancePaid = 0, date = new Date().toISOString().split('T')[0]) => {
    setAttendance(prev => {
      const existingIdx = prev.findIndex(a => a.labour_id === labourId && a.date === date);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = { ...updated[existingIdx], status, advance_paid: Number(advancePaid) };
        return updated;
      } else {
        return [...prev, {
          id: 'att_' + Date.now() + '_' + labourId,
          project_id: activeProjectId,
          labour_id: labourId,
          date,
          status,
          advance_paid: Number(advancePaid)
        }];
      }
    });
    logEvent('ATTENDANCE_RECORDED', { labourId, status, advancePaid, date });
  };

  // Payment Actions
  const addPayment = (payData) => {
    const newPay = {
      id: 'pay_' + Date.now(),
      project_id: payData.project_id || activeProjectId,
      milestone: payData.milestone || 'Stage Payment',
      amount: Number(payData.amount) || 0,
      type: payData.type || 'INCOME',
      date: payData.date || new Date().toISOString().split('T')[0],
      status: payData.status || 'Received',
      mode: payData.mode || 'UPI/Bank'
    };
    setPayments(prev => [newPay, ...prev]);
    logEvent('PAYMENT_CREATED', newPay);
    return newPay;
  };

  // Dealer Actions
  const addDealer = (dealerData) => {
    const newDealer = {
      id: dealerData.id || 'dlr_' + Date.now(),
      name: dealerData.name,
      phone: dealerData.phone || '',
      city: dealerData.city || 'Pune',
      rating: Number(dealerData.rating) || 5.0
    };
    setDealers(prev => [...prev, newDealer]);
    logEvent('DEALER_CREATED', newDealer);
    return newDealer;
  };

  // Invoice Actions
  const addInvoice = (invData) => {
    const newInvoice = {
      id: invData.id || 'inv_' + Date.now(),
      invoice_no: invData.invoice_no || `INV-${Date.now()}`,
      dealer_id: invData.dealer_id || null,
      po_id: invData.po_id || null,
      total: Number(invData.total ?? invData.amount ?? 0),
      status: invData.status || 'CLEAN_MATCH',
      due_date: invData.due_date || new Date().toISOString().split('T')[0],
      lines: Array.isArray(invData.lines) ? invData.lines : []
    };
    setInvoices(prev => [newInvoice, ...prev]);
    logEvent('INVOICE_CREATED', newInvoice);
    return newInvoice;
  };

  const updateInvoice = (id, updates) => {
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, ...updates } : inv));
    logEvent('INVOICE_UPDATED', { id, ...updates });
  };

  // Purchase Order Actions
  const addPurchaseOrder = (poData) => {
    const newPO = {
      id: poData.id || 'po_' + Date.now(),
      project_id: poData.project_id || activeProjectId,
      dealer_id: poData.dealer_id || null,
      po_number: poData.po_number || `PO-${Date.now()}`,
      total_amount: Number(poData.total_amount) || 0,
      status: poData.status || 'Approved'
    };
    setPurchaseOrders(prev => [newPO, ...prev]);
    logEvent('PURCHASE_ORDER_CREATED', newPO);
    return newPO;
  };

  // Proposal Actions
  const addProposal = (propData) => {
    const newProp = {
      id: propData.id || 'prop_' + Date.now(),
      project_id: propData.project_id || activeProjectId,
      title: propData.title || 'Client Proposal',
      client_name: propData.client_name || '',
      amount: Number(propData.amount) || 0,
      status: propData.status || 'Draft'
    };
    setProposals(prev => [newProp, ...prev]);
    logEvent('PROPOSAL_CREATED', newProp);
    return newProp;
  };

  // Cash Settings Actions
  const updateCashSettings = (updates) => {
    setCashSettings(prev => ({ ...prev, ...updates }));
    logEvent('CASH_SETTINGS_UPDATED', updates);
  };

  // Delivery Actions
  const addDelivery = (deliveryData) => {
    const newDelivery = {
      id: deliveryData.id || 'del_' + Date.now(),
      project_id: deliveryData.project_id || activeProjectId,
      po_id: deliveryData.po_id || null,
      dealer_id: deliveryData.dealer_id || null,
      challan_no: deliveryData.challan_no || `CH-${Date.now()}`,
      delivery_date: deliveryData.delivery_date || deliveryData.date || new Date().toISOString().split('T')[0],
      status: deliveryData.status || 'Received',
      items: Array.isArray(deliveryData.items) ? deliveryData.items : [],
      received_by: deliveryData.received_by || 'Site Incharge',
      notes: deliveryData.notes || ''
    };
    setDeliveries(prev => [newDelivery, ...prev]);
    logEvent('DELIVERY_RECORDED', newDelivery);
    return newDelivery;
  };

  // Quote Actions
  const addQuote = (quoteData) => {
    const newQuote = {
      id: quoteData.id || 'qte_' + Date.now(),
      rfq_id: quoteData.rfq_id || null,
      dealer_id: quoteData.dealer_id || null,
      dealer_name: quoteData.dealer_name || '',
      project_id: quoteData.project_id || activeProjectId,
      total_amount: Number(quoteData.total_amount ?? quoteData.amount ?? 0),
      status: quoteData.status || 'Pending',
      items: Array.isArray(quoteData.items) ? quoteData.items : [],
      valid_until: quoteData.valid_until || null
    };
    setQuotes(prev => [newQuote, ...prev]);
    logEvent('QUOTE_RECEIVED', newQuote);
    return newQuote;
  };

  // RFQ Actions
  const addRFQ = (rfqData) => {
    const newRFQ = {
      id: rfqData.id || 'rfq_' + Date.now(),
      project_id: rfqData.project_id || activeProjectId,
      rfq_number: rfqData.rfq_number || `RFQ-${Date.now()}`,
      title: rfqData.title || 'Material Request',
      status: rfqData.status || 'Open',
      items: Array.isArray(rfqData.items) ? rfqData.items : [],
      due_date: rfqData.due_date || null
    };
    setRfqs(prev => [newRFQ, ...prev]);
    logEvent('RFQ_CREATED', newRFQ);
    return newRFQ;
  };

  // Plan Version Actions
  const addPlanVersion = (planData) => {
    const newPlanVersion = {
      id: planData.id || 'pln_' + Date.now(),
      project_id: planData.project_id || activeProjectId,
      version: Number(planData.version ?? (planVersions.length + 1)),
      name: planData.name || `Plan v${planData.version ?? (planVersions.length + 1)}`,
      tasks: Array.isArray(planData.tasks) ? planData.tasks : [],
      critical_path: Array.isArray(planData.critical_path) ? planData.critical_path : [],
      total_duration_days: Number(planData.total_duration_days ?? 0),
      created_by: planData.created_by || 'scheduler_agent',
      created_at: new Date().toISOString()
    };
    setPlanVersions(prev => [newPlanVersion, ...prev]);
    logEvent('PLAN_VERSION_COMMITTED', newPlanVersion);
    return newPlanVersion;
  };

  // Reset or clear demo data to start fresh
  const resetToCleanWorkspace = () => {
    setProjects([]);
    setActiveProjectId(null);
    setTasks([]);
    setIssues([]);
    setMaterials([]);
    setMaterialTransactions([]);
    setLabour([]);
    setAttendance([]);
    setPayments([]);
    setDealers([]);
    setInvoices([]);
    setPurchaseOrders([]);
    setProposals([]);
    setDeliveries([]);
    setQuotes([]);
    setRfqs([]);
    setPlanVersions([]);
    setCashSettings(INITIAL_CASH_SETTINGS);
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  };

  return (
    <AppContext.Provider value={{
      STORAGE_KEYS,
      MAX_LEDGER_STORAGE_ENTRIES,
      projects,
      activeProjectId,
      activeProject,
      setActiveProjectId,
      selectProject,
      addProject,
      updateProject,
      deleteProject,
      currentView,
      setCurrentView,
      activeAgentId,
      setActiveAgentId,
      tasks,
      addTask,
      updateTask,
      deleteTask,
      issues,
      addIssue,
      updateIssue,
      materials,
      materialTransactions,
      addMaterial,
      recordMaterialTransaction,
      labour,
      attendance,
      addLabour,
      markAttendance,
      payments,
      addPayment,
      dealers,
      addDealer,
      invoices,
      addInvoice,
      updateInvoice,
      purchaseOrders,
      addPurchaseOrder,
      proposals,
      addProposal,
      deliveries,
      addDelivery,
      quotes,
      addQuote,
      rfqs,
      addRFQ,
      planVersions,
      plan_versions: planVersions,
      addPlanVersion,
      cashSettings,
      updateCashSettings,
      eventLedger,
      logEvent,
      resetToCleanWorkspace
    }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
