import React, { useState } from 'react';
import { 
  Truck, Plus, ArrowDownLeft, ArrowUpRight, AlertTriangle, 
  Package
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { StatsCard } from '../../components/ui/StatsCard';
import { Modal } from '../../components/ui/Modal';

export function MaterialsPage() {
  const { materials, materialTransactions, addMaterial, recordMaterialTransaction, activeProject } = useApp();
  const [activeTab, setActiveTab] = useState('STOCK');
  const [isAddMatModalOpen, setIsAddMatModalOpen] = useState(false);
  const [isTxModalOpen, setIsTxModalOpen] = useState(false);
  const [txType, setTxType] = useState('INWARD'); // INWARD or OUTWARD

  const [newMatForm, setNewMatForm] = useState({
    name: '',
    unit: 'Bags',
    in_stock: '',
    unit_price: '',
    min_threshold: '20'
  });

  const [txForm, setTxForm] = useState(() => ({
    item_id: materials[0]?.id || '',
    quantity: '',
    receiver: 'Ramesh Mistri',
    date: new Date().toISOString().split('T')[0]
  }));

  const lowStockCount = materials.filter(m => m.in_stock <= m.min_threshold).length;
  const totalStockWorth = materials.reduce((acc, m) => acc + (m.in_stock * m.unit_price), 0);

  const handleCreateMaterial = (e) => {
    e.preventDefault();
    if (!newMatForm.name.trim()) return;
    addMaterial(newMatForm);
    setIsAddMatModalOpen(false);
    setNewMatForm({ name: '', unit: 'Bags', in_stock: '', unit_price: '', min_threshold: '20' });
  };

  const handleRecordTx = (e) => {
    e.preventDefault();
    if (!txForm.quantity || !txForm.item_id) return;
    recordMaterialTransaction({
      ...txForm,
      type: txType,
      project_id: activeProject?.id
    });
    setIsTxModalOpen(false);
    setTxForm({ item_id: materials[0]?.id || '', quantity: '', receiver: 'Ramesh Mistri', date: new Date().toISOString().split('T')[0] });
  };

  const openTxModal = (type, itemId = null) => {
    setTxType(type);
    if (itemId) {
      setTxForm(prev => ({ ...prev, item_id: itemId }));
    } else if (materials.length > 0) {
      setTxForm(prev => ({ ...prev, item_id: materials[0].id }));
    }
    setIsTxModalOpen(true);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>
            Material Inventory & Stock Register
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            Track site stock levels, inward delivery challans, and consumption to prevent theft and wastage.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => openTxModal('INWARD')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 16px',
              background: '#16a34a',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: '600',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <ArrowDownLeft size={16} />
            <span>+ Inward Stock</span>
          </button>

          <button
            onClick={() => openTxModal('OUTWARD')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 16px',
              background: '#ea580c',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: '600',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <ArrowUpRight size={16} />
            <span>Issue to Site</span>
          </button>

          <button
            onClick={() => setIsAddMatModalOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 16px',
              background: '#2563eb',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: '600',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Plus size={16} />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <StatsCard 
          title="Tracked Items" 
          value={materials.length} 
          subtitle="Catalog materials" 
          icon={Package} 
          color="#2563eb" 
        />
        <StatsCard 
          title="Stock Value on Site" 
          value={`₹${(totalStockWorth / 100000).toFixed(2)} L`} 
          subtitle="Estimated on-site material worth" 
          icon={Truck} 
          color="#16a34a" 
        />
        <StatsCard 
          title="Low Stock Alerts" 
          value={lowStockCount} 
          subtitle="Needs reorder soon" 
          icon={AlertTriangle} 
          color={lowStockCount > 0 ? '#dc2626' : '#64748b'} 
        />
      </div>

      {/* Tabs */}
      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{
          padding: '10px 20px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          gap: '8px',
          background: '#f8fafc'
        }}>
          <button
            onClick={() => setActiveTab('STOCK')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: activeTab === 'STOCK' ? '600' : '500',
              border: '1px solid',
              borderColor: activeTab === 'STOCK' ? '#2563eb' : '#cbd5e1',
              background: activeTab === 'STOCK' ? '#eff6ff' : '#ffffff',
              color: activeTab === 'STOCK' ? '#2563eb' : '#475569',
              cursor: 'pointer'
            }}
          >
            Stock Register ({materials.length})
          </button>
          <button
            onClick={() => setActiveTab('HISTORY')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: activeTab === 'HISTORY' ? '600' : '500',
              border: '1px solid',
              borderColor: activeTab === 'HISTORY' ? '#2563eb' : '#cbd5e1',
              background: activeTab === 'HISTORY' ? '#eff6ff' : '#ffffff',
              color: activeTab === 'HISTORY' ? '#2563eb' : '#475569',
              cursor: 'pointer'
            }}
          >
            Transaction History ({materialTransactions.length})
          </button>
        </div>

        {activeTab === 'STOCK' ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc', color: '#64748b' }}>
                  <th style={{ padding: '12px 20px', fontWeight: '600' }}>Material Item</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Unit</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Available Stock</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Unit Price (₹)</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Status</th>
                  <th style={{ padding: '12px 20px', fontWeight: '600', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((m) => (
                  <tr key={m.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 20px', fontWeight: '600', color: '#0f172a' }}>
                      {m.name}
                    </td>
                    <td style={{ padding: '14px 16px', color: '#64748b' }}>
                      {m.unit}
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: '700', color: m.in_stock <= m.min_threshold ? '#dc2626' : '#0f172a' }}>
                      {m.in_stock} {m.unit}
                    </td>
                    <td style={{ padding: '14px 16px', color: '#334155' }}>
                      ₹{Number(m.unit_price).toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      {m.in_stock <= m.min_threshold ? (
                        <span style={{ fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '4px', background: '#fee2e2', color: '#dc2626' }}>
                          Low Stock
                        </span>
                      ) : (
                        <span style={{ fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '4px', background: '#dcfce7', color: '#15803d' }}>
                          Adequate
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <button
                          onClick={() => openTxModal('INWARD', m.id)}
                          style={{
                            padding: '4px 8px',
                            background: '#f0fdf4',
                            color: '#16a34a',
                            border: '1px solid #bbf7d0',
                            borderRadius: '4px',
                            fontSize: '11.5px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          + Inward
                        </button>
                        <button
                          onClick={() => openTxModal('OUTWARD', m.id)}
                          style={{
                            padding: '4px 8px',
                            background: '#fff7ed',
                            color: '#ea580c',
                            border: '1px solid #fed7aa',
                            borderRadius: '4px',
                            fontSize: '11.5px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          - Issue
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc', color: '#64748b' }}>
                  <th style={{ padding: '12px 20px', fontWeight: '600' }}>Date</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Item</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Type</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Quantity</th>
                  <th style={{ padding: '12px 20px', fontWeight: '600' }}>Handed Over To / Receiver</th>
                </tr>
              </thead>
              <tbody>
                {materialTransactions.map((tx) => (
                  <tr key={tx.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 20px', color: '#64748b' }}>
                      {tx.date}
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: '600', color: '#0f172a' }}>
                      {tx.item_name}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: tx.type === 'INWARD' ? '#dcfce7' : '#fff7ed',
                        color: tx.type === 'INWARD' ? '#15803d' : '#c2410c'
                      }}>
                        {tx.type}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: '700', color: tx.type === 'INWARD' ? '#16a34a' : '#ea580c' }}>
                      {tx.type === 'INWARD' ? '+' : '-'} {tx.quantity}
                    </td>
                    <td style={{ padding: '14px 20px', color: '#334155' }}>
                      {tx.receiver}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal: Add New Material */}
      <Modal
        isOpen={isAddMatModalOpen}
        onClose={() => setIsAddMatModalOpen(false)}
        title="Add Material to Catalog"
      >
        <form onSubmit={handleCreateMaterial} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
              Material Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Birla A1 Cement (50kg)"
              value={newMatForm.name}
              onChange={(e) => setNewMatForm({ ...newMatForm, name: e.target.value })}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                Unit of Measurement
              </label>
              <select
                value={newMatForm.unit}
                onChange={(e) => setNewMatForm({ ...newMatForm, unit: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px', background: '#fff' }}
              >
                <option value="Bags">Bags</option>
                <option value="Tons">Tons</option>
                <option value="Brass">Brass (Sand/Aggregate)</option>
                <option value="Pieces">Pieces (Bricks/Blocks)</option>
                <option value="Sq.Ft">Sq.Ft (Tiles/Granite)</option>
                <option value="Litres">Litres (Paint/Chemicals)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                Initial Stock Qty
              </label>
              <input
                type="number"
                placeholder="e.g. 50"
                value={newMatForm.in_stock}
                onChange={(e) => setNewMatForm({ ...newMatForm, in_stock: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                Approx Unit Price (₹)
              </label>
              <input
                type="number"
                placeholder="e.g. 390"
                value={newMatForm.unit_price}
                onChange={(e) => setNewMatForm({ ...newMatForm, unit_price: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                Low Alert Threshold
              </label>
              <input
                type="number"
                placeholder="e.g. 20"
                value={newMatForm.min_threshold}
                onChange={(e) => setNewMatForm({ ...newMatForm, min_threshold: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={() => setIsAddMatModalOpen(false)}
              style={{ padding: '9px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#475569', fontSize: '13px', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ padding: '9px 18px', borderRadius: '6px', border: 'none', background: '#2563eb', color: '#ffffff', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
            >
              Add to Catalog
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal: Record Transaction (Inward or Issue) */}
      <Modal
        isOpen={isTxModalOpen}
        onClose={() => setIsTxModalOpen(false)}
        title={txType === 'INWARD' ? 'Receive Inward Material Challan' : 'Issue Material to Site Execution'}
      >
        <form onSubmit={handleRecordTx} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
              Select Material *
            </label>
            <select
              value={txForm.item_id}
              onChange={(e) => setTxForm({ ...txForm, item_id: e.target.value })}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px', background: '#fff' }}
            >
              {materials.map(m => (
                <option key={m.id} value={m.id}>{m.name} (Current: {m.in_stock} {m.unit})</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                Quantity *
              </label>
              <input
                type="number"
                step="any"
                required
                placeholder="e.g. 50"
                value={txForm.quantity}
                onChange={(e) => setTxForm({ ...txForm, quantity: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                Date
              </label>
              <input
                type="date"
                value={txForm.date}
                onChange={(e) => setTxForm({ ...txForm, date: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
              {txType === 'INWARD' ? 'Supplier / Vehicle No.' : 'Handed to Mistri / Purpose'}
            </label>
            <input
              type="text"
              placeholder={txType === 'INWARD' ? 'e.g. Shree Cement Supplier / MH-12-AB-1234' : 'e.g. Ramesh Mistri for Slab casting'}
              value={txForm.receiver}
              onChange={(e) => setTxForm({ ...txForm, receiver: e.target.value })}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={() => setIsTxModalOpen(false)}
              style={{ padding: '9px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#475569', fontSize: '13px', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '9px 18px',
                borderRadius: '6px',
                border: 'none',
                background: txType === 'INWARD' ? '#16a34a' : '#ea580c',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {txType === 'INWARD' ? 'Record Inward' : 'Record Site Issue'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
