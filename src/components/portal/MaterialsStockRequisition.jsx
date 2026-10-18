import React, { useState } from 'react';
import { 
  Package, AlertTriangle, CheckCircle2, Plus, Search, 
  Filter, ArrowUpDown, Truck, RefreshCw, X 
} from 'lucide-react';
import { MATERIAL_STOCK_ITEMS, PENDING_MATERIAL_REQUESTS } from '../../data/mockData';

export function MaterialsStockRequisition({ onOpenAgent }) {
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory', 'requests', 'rates'
  const [selectedSite, setSelectedSite] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [stockList, setStockList] = useState(MATERIAL_STOCK_ITEMS);
  const [requestsList, setRequestsList] = useState(PENDING_MATERIAL_REQUESTS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    name: '',
    category: 'Cement',
    siteLocation: 'Kothrud Site A1 - Main Structure & Brickwork',
    planned: '',
    unit: 'bags',
    marketRate: ''
  });

  const filteredStock = stockList.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSite = selectedSite === 'all' || item.siteLocation.includes(selectedSite);
    return matchesSearch && matchesSite;
  });

  const handleAddStock = (e) => {
    e.preventDefault();
    if (!newMaterial.name) return;
    const item = {
      id: `mat-${Date.now()}`,
      name: newMaterial.name,
      category: newMaterial.category,
      dealer: "Local Pune Supply Depot",
      siteLocation: newMaterial.siteLocation,
      planned: Number(newMaterial.planned) || 100,
      unit: newMaterial.unit,
      received: 0,
      used: 0,
      wastage: 0,
      remainingStock: 0,
      reorderLevel: 20,
      marketRate: Number(newMaterial.marketRate) || 400,
      stockStatus: "Low Stock",
      statusBadgeColor: "#ef4444",
      lastUpdated: "Just now by Contractor"
    };
    setStockList(prev => [item, ...prev]);
    setShowAddModal(false);
  };

  return (
    <div className="agent-container">
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 11, background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', padding: '2px 8px', borderRadius: 12, fontWeight: 700 }}>
              SITE INVENTORY & SHORTAGES
            </span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a' }}>
            Material Stock & Requisition Hub
          </h1>
          <p style={{ color: '#64748b', fontSize: 14, maxWidth: 750, marginTop: 4 }}>
            Site Supervisors check site stock & raise requirements. Contractors review, modify & approve requests. Stock increases only when physical delivery is confirmed on site.
          </p>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          style={{ 
            background: '#0f766e', 
            color: '#ffffff', 
            border: 'none', 
            padding: '10px 18px', 
            borderRadius: 6, 
            fontSize: 13, 
            fontWeight: 700, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 6,
            cursor: 'pointer' 
          }}
        >
          <Plus size={16} />
          <span>+ Add Material Stock Item</span>
        </button>
      </div>

      {/* Tabs & Filters Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', background: '#f1f5f9', padding: 4, borderRadius: 8, gap: 4 }}>
          <button 
            onClick={() => setActiveTab('inventory')}
            style={{ 
              background: activeTab === 'inventory' ? '#ffffff' : 'transparent', 
              color: activeTab === 'inventory' ? '#0f766e' : '#64748b', 
              border: 'none', 
              padding: '8px 16px', 
              borderRadius: 6, 
              fontSize: 13, 
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: activeTab === 'inventory' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            Stock Inventory ({stockList.length})
          </button>
          <button 
            onClick={() => setActiveTab('requests')}
            style={{ 
              background: activeTab === 'requests' ? '#ffffff' : 'transparent', 
              color: activeTab === 'requests' ? '#0f766e' : '#64748b', 
              border: 'none', 
              padding: '8px 16px', 
              borderRadius: 6, 
              fontSize: 13, 
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: activeTab === 'requests' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <span>Material Requests</span>
            <span style={{ fontSize: 10, background: '#f59e0b', color: '#fff', padding: '1px 6px', borderRadius: 10, fontWeight: 800 }}>
              {requestsList.length}
            </span>
          </button>
          <button 
            onClick={() => setActiveTab('rates')}
            style={{ 
              background: activeTab === 'rates' ? '#ffffff' : 'transparent', 
              color: activeTab === 'rates' ? '#0f766e' : '#64748b', 
              border: 'none', 
              padding: '8px 16px', 
              borderRadius: 6, 
              fontSize: 13, 
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: activeTab === 'rates' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            Market Rate Tracker
          </button>
        </div>

        {/* Search & Site Filter */}
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ position: 'relative' }}>
            <Search size={15} style={{ position: 'absolute', left: 10, top: 11, color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Search material..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ 
                padding: '8px 12px 8px 32px', 
                borderRadius: 6, 
                border: '1px solid #cbd5e1', 
                fontSize: 13, 
                width: 200 
              }}
            />
          </div>

          <select 
            value={selectedSite}
            onChange={e => setSelectedSite(e.target.value)}
            style={{ 
              padding: '8px 12px', 
              borderRadius: 6, 
              border: '1px solid #cbd5e1', 
              fontSize: 13, 
              fontWeight: 600,
              color: '#334155' 
            }}
          >
            <option value="all">All Assigned Sites</option>
            <option value="Kothrud Site A1">Kothrud Site A1</option>
            <option value="Kothrud Site A2">Kothrud Site A2</option>
            <option value="Katraj Commercial">Katraj Commercial</option>
          </select>
        </div>
      </div>

      {activeTab === 'inventory' && (
        <div className="agent-workspace-card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>MATERIAL & CATEGORY</th>
                <th style={{ padding: '12px 14px', textAlign: 'left' }}>SITE LOCATION</th>
                <th style={{ padding: '12px 12px', textAlign: 'right' }}>PLANNED</th>
                <th style={{ padding: '12px 12px', textAlign: 'right' }}>RECEIVED</th>
                <th style={{ padding: '12px 12px', textAlign: 'right' }}>USED</th>
                <th style={{ padding: '12px 12px', textAlign: 'right' }}>WASTAGE</th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>REMAINING STOCK</th>
                <th style={{ padding: '12px 12px', textAlign: 'right' }}>MARKET RATE</th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>STOCK STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredStock.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <strong style={{ fontSize: 13.5, color: '#0f172a', display: 'block' }}>{item.name}</strong>
                    <span style={{ fontSize: 11, color: '#64748b' }}>{item.category} • Dealer: {item.dealer}</span>
                  </td>
                  <td style={{ padding: '14px 14px', fontSize: 12.5, color: '#334155' }}>
                    {item.siteLocation}
                  </td>
                  <td style={{ padding: '14px 12px', textAlign: 'right', fontSize: 13, color: '#64748b' }}>
                    {item.planned.toLocaleString()} {item.unit}
                  </td>
                  <td style={{ padding: '14px 12px', textAlign: 'right', fontSize: 13, fontWeight: 600, color: '#0f172a' }}>
                    {item.received.toLocaleString()} {item.unit}
                  </td>
                  <td style={{ padding: '14px 12px', textAlign: 'right', fontSize: 13, fontWeight: 700, color: '#0f766e' }}>
                    {item.used.toLocaleString()} {item.unit}
                  </td>
                  <td style={{ padding: '14px 12px', textAlign: 'right', fontSize: 13, color: '#e11d48' }}>
                    {item.wastage} {item.unit}
                  </td>
                  <td style={{ padding: '14px 14px', textAlign: 'right' }}>
                    <strong style={{ 
                      fontSize: 14, 
                      color: item.stockStatus === 'Low Stock' ? '#e11d48' : '#059669' 
                    }}>
                      {item.remainingStock.toLocaleString()} {item.unit}
                    </strong>
                  </td>
                  <td style={{ padding: '14px 12px', textAlign: 'right', fontSize: 13, fontWeight: 700, color: '#0f172a' }}>
                    ₹{item.marketRate.toLocaleString()}/{item.unit === 'bags' ? 'bag' : item.unit === 'tons' ? 'ton' : 'pc'}
                  </td>
                  <td style={{ padding: '14px 14px', textAlign: 'center' }}>
                    <span style={{ 
                      fontSize: 11, 
                      fontWeight: 700, 
                      padding: '3px 10px', 
                      borderRadius: 4, 
                      background: item.stockStatus === 'Low Stock' ? '#fee2e2' : '#dcfce7',
                      color: item.stockStatus === 'Low Stock' ? '#991b1b' : '#166534'
                    }}>
                      {item.stockStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'requests' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {requestsList.map((req) => (
            <div 
              key={req.id}
              style={{ 
                background: '#ffffff', 
                border: '1px solid #cbd5e1', 
                borderRadius: 10, 
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 11, background: '#fee2e2', color: '#b91c1c', padding: '2px 8px', borderRadius: 4, fontWeight: 800 }}>
                    {req.priority}
                  </span>
                  <strong style={{ fontSize: 16, color: '#0f172a' }}>{req.materialName} ({req.requestedQty})</strong>
                  <span style={{ fontSize: 12, color: '#64748b' }}>• {req.siteProject}</span>
                </div>
                <div style={{ fontSize: 13, color: '#475569', maxWidth: 700, lineHeight: 1.5 }}>
                  "{req.reason}"
                </div>
                <div style={{ fontSize: 12, color: '#64748b', marginTop: 8 }}>
                  Requested by: <strong>{req.requestedBy}</strong> on {req.reqDate} • Current Site Stock: <strong style={{ color: '#e11d48' }}>{req.currentSiteStock}</strong>
                </div>
              </div>

              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#0f766e' }}>
                  ₹{req.estCostImpact.toLocaleString()} Est. Cost
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button 
                    onClick={() => {
                      setRequestsList(prev => prev.filter(r => r.id !== req.id));
                      alert(`Dispatched order for ${req.requestedQty} ${req.materialName}`);
                    }}
                    style={{ 
                      background: '#0f766e', 
                      color: '#ffffff', 
                      border: 'none', 
                      padding: '8px 14px', 
                      borderRadius: 6, 
                      fontSize: 12.5, 
                      fontWeight: 700,
                      cursor: 'pointer' 
                    }}
                  >
                    Direct PO Dispatch
                  </button>
                  <button 
                    onClick={() => onOpenAgent('procurement')}
                    style={{ 
                      background: '#eff6ff', 
                      color: '#1d4ed8', 
                      border: '1px solid #bfdbfe', 
                      padding: '8px 14px', 
                      borderRadius: 6, 
                      fontSize: 12.5, 
                      fontWeight: 700,
                      cursor: 'pointer' 
                    }}
                  >
                    Compare 3 Vendors
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'rates' && (
        <div className="agent-workspace-card">
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>
            Local Pune Market Price Indices (Updated Daily)
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            <div style={{ background: '#f8fafc', padding: 14, borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: 11, color: '#64748b' }}>OPC 53 CEMENT</span>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', margin: '4px 0' }}>₹420 / bag</div>
              <span style={{ fontSize: 11, color: '#059669' }}>-₹10 vs last week</span>
            </div>
            <div style={{ background: '#f8fafc', padding: 14, borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: 11, color: '#64748b' }}>Fe 550D TMT STEEL</span>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', margin: '4px 0' }}>₹64,500 / ton</div>
              <span style={{ fontSize: 11, color: '#e11d48' }}>+₹3,500 surge (Inflation Risk)</span>
            </div>
            <div style={{ background: '#f8fafc', padding: 14, borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: 11, color: '#64748b' }}>RED CLAY BRICKS</span>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', margin: '4px 0' }}>₹9.00 / piece</div>
              <span style={{ fontSize: 11, color: '#64748b' }}>Stable</span>
            </div>
            <div style={{ background: '#f8fafc', padding: 14, borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: 11, color: '#64748b' }}>RIVER SAND (WASHED)</span>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', margin: '4px 0' }}>₹4,800 / brass</div>
              <span style={{ fontSize: 11, color: '#059669' }}>-₹200 discount</span>
            </div>
          </div>
        </div>
      )}

      {/* Add Stock Item Modal */}
      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: 480 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>Add New Material Stock Item</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'transparent', border: 'none', fontSize: 20, cursor: 'pointer' }}>×</button>
            </div>
            <form onSubmit={handleAddStock} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>Material Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Tata Tiscon 12mm Rebar"
                  value={newMaterial.name}
                  onChange={e => setNewMaterial({...newMaterial, name: e.target.value})}
                  required
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13 }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>Category</label>
                  <select 
                    value={newMaterial.category}
                    onChange={e => setNewMaterial({...newMaterial, category: e.target.value})}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13 }}
                  >
                    <option value="Cement">Cement</option>
                    <option value="Steel">Steel</option>
                    <option value="Bricks">Bricks</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Tiles">Tiles</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>Site Location</label>
                  <select 
                    value={newMaterial.siteLocation}
                    onChange={e => setNewMaterial({...newMaterial, siteLocation: e.target.value})}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13 }}
                  >
                    <option value="Kothrud Site A1 - Main Structure & Brickwork">Kothrud Site A1</option>
                    <option value="Kothrud Site A2 - Interior & Plumbing Work">Kothrud Site A2</option>
                    <option value="Katraj Commercial Site B1 - Structure">Katraj Commercial</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>Planned Quantity</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 200"
                    value={newMaterial.planned}
                    onChange={e => setNewMaterial({...newMaterial, planned: e.target.value})}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13 }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>Unit</label>
                  <input 
                    type="text" 
                    placeholder="bags / tons / pcs"
                    value={newMaterial.unit}
                    onChange={e => setNewMaterial({...newMaterial, unit: e.target.value})}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13 }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>Estimated Market Rate (₹)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 450"
                  value={newMaterial.marketRate}
                  onChange={e => setNewMaterial({...newMaterial, marketRate: e.target.value})}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13 }}
                />
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                <button 
                  type="submit"
                  style={{ flex: 1, background: '#0f766e', color: '#fff', border: 'none', padding: '10px', borderRadius: 6, fontWeight: 700, cursor: 'pointer' }}
                >
                  Save Stock Item
                </button>
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', padding: '10px 16px', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
