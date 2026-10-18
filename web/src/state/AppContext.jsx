import React, { useState, useEffect } from 'react';
import api from '../services/httpClient';
import { AppContext } from './appContextInstance';

const STORAGE_KEYS = {
  PROJECTS: 'buildsite_projects',
  TASKS: 'buildsite_tasks',
  ISSUES: 'buildsite_issues',
  MATERIALS: 'buildsite_materials',
  MATERIAL_TX: 'buildsite_material_tx',
  LABOUR: 'buildsite_labour',
  ATTENDANCE: 'buildsite_attendance',
  PAYMENTS: 'buildsite_payments',
  ACTIVE_PROJECT_ID: 'buildsite_active_project_id'
};

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

export function AppProvider({ children }) {
  // Load state from localStorage or use initial clean data
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return saved ? JSON.parse(saved) : [INITIAL_PROJECT];
  });

  const [activeProjectId, setActiveProjectId] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_PROJECT_ID);
    return saved || 'site_101';
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TASKS);
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [issues, setIssues] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ISSUES);
    return saved ? JSON.parse(saved) : INITIAL_ISSUES;
  });

  const [materials, setMaterials] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MATERIALS);
    return saved ? JSON.parse(saved) : INITIAL_MATERIALS;
  });

  const [materialTransactions, setMaterialTransactions] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MATERIAL_TX);
    return saved ? JSON.parse(saved) : [
      { id: 'tx_1', project_id: 'site_101', item_id: 'mat_1', item_name: 'UltraTech Cement (50kg)', type: 'INWARD', quantity: 200, date: '2026-10-10', receiver: 'Santosh' },
      { id: 'tx_2', project_id: 'site_101', item_id: 'mat_1', item_name: 'UltraTech Cement (50kg)', type: 'OUTWARD', quantity: 60, date: '2026-10-15', receiver: 'Ramesh Mistri' }
    ];
  });

  const [labour, setLabour] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LABOUR);
    return saved ? JSON.parse(saved) : INITIAL_LABOUR;
  });

  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });

  const [payments, setPayments] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PAYMENTS);
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  // Current view navigation: 'sites', 'site_dashboard', 'tasks', 'issues', 'payments', 'drive', 'materials', 'labour', 'cashflow', 'library', 'reports', 'settings', 'agents'
  const [currentView, setCurrentView] = useState('sites');
  const [activeAgentId, setActiveAgentId] = useState('estimator');

  // Sync to localStorage
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects)); }, [projects]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.ACTIVE_PROJECT_ID, activeProjectId || ''); }, [activeProjectId]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.ISSUES, JSON.stringify(issues)); }, [issues]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify(materials)); }, [materials]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.MATERIAL_TX, JSON.stringify(materialTransactions)); }, [materialTransactions]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.LABOUR, JSON.stringify(labour)); }, [labour]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendance)); }, [attendance]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments)); }, [payments]);

  // Try sync with real backend if backend server is configured & running
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
        // Backend not configured or offline - fallback to local storage
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

    // Also send to backend if backend URL configured
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
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    if (activeProjectId === id) {
      const remaining = projects.filter(p => p.id !== id);
      setActiveProjectId(remaining[0]?.id || null);
    }
  };

  // Select project and navigate inside it
  const selectProject = (id) => {
    setActiveProjectId(id);
    setCurrentView('site_dashboard');
  };

  // Tasks Actions
  const addTask = (taskData) => {
    const newTask = {
      id: 'tsk_' + Date.now(),
      project_id: taskData.project_id || activeProjectId,
      name: taskData.name,
      stage: taskData.stage || 'General',
      status: taskData.status || 'Pending',
      due_date: taskData.due_date || new Date().toISOString().split('T')[0],
      assigned_to: taskData.assigned_to || 'Mistri'
    };
    setTasks(prev => [newTask, ...prev]);
    return newTask;
  };

  const updateTask = (id, updates) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
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
    return newIssue;
  };

  const updateIssue = (id, updates) => {
    setIssues(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
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
    return newMat;
  };

  const recordMaterialTransaction = (txData) => {
    const item = materials.find(m => m.id === txData.item_id);
    const newTx = {
      id: 'tx_' + Date.now(),
      project_id: txData.project_id || activeProjectId,
      item_id: txData.item_id,
      item_name: item?.name || 'Material Item',
      type: txData.type, // 'INWARD' or 'OUTWARD'
      quantity: Number(txData.quantity),
      date: txData.date || new Date().toISOString().split('T')[0],
      receiver: txData.receiver || 'Site Mistri'
    };
    setMaterialTransactions(prev => [newTx, ...prev]);

    // Update stock quantity
    setMaterials(prev => prev.map(m => {
      if (m.id === txData.item_id) {
        const change = txData.type === 'INWARD' ? Number(txData.quantity) : -Number(txData.quantity);
        return { ...m, in_stock: Math.max(0, m.in_stock + change) };
      }
      return m;
    }));
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
  };

  // Payment Actions
  const addPayment = (payData) => {
    const newPay = {
      id: 'pay_' + Date.now(),
      project_id: payData.project_id || activeProjectId,
      milestone: payData.milestone || 'Stage Payment',
      amount: Number(payData.amount) || 0,
      type: payData.type || 'INCOME', // INCOME or EXPENSE
      date: payData.date || new Date().toISOString().split('T')[0],
      status: payData.status || 'Received',
      mode: payData.mode || 'UPI/Bank'
    };
    setPayments(prev => [newPay, ...prev]);
    return newPay;
  };

  // Reset or clear demo data to start fresh (as requested by user)
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
    localStorage.clear();
  };

  return (
    <AppContext.Provider value={{
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
      resetToCleanWorkspace
    }}>
      {children}
    </AppContext.Provider>
  );
}

